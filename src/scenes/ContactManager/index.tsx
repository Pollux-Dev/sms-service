import React, { ChangeEvent, useState } from 'react';
import s from './contactmanager.module.scss';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Container,
  Input,
  Modal,
  Stack,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import ContactTableView from '@/scenes/ContactManager/ContactTableView';
import { TextSnippet } from '@mui/icons-material';
import { read, utils } from 'xlsx';

const userData = [
  {
    id: 0,
    phone_number: 251922630485,
    category: 'MahibereKidusan',
    telecom: 'ethio-telecom',
  },
  {
    id: 1,
    phone_number: 912782649,
    category: 'MahibereKidusan',
    telecom: 'ethio-telecom',
  },
  {
    id: 2,
    phone_number: 911993975,
    category: 'MahibereKidusan',
    telecom: 'ethio-telecom',
  },
  {
    id: 3,
    phone_number: 911614581,
    category: 'MahibereKidusan',
    telecom: 'ethio-telecom',
  },
  {
    id: 4,
    phone_number: 910421839,
    category: 'MahibereKidusan',
    telecom: 'ethio-telecom',
  },
];

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const ContactManager = () => {
  const [open, setOpen] = React.useState(false);

  const [userData, setUserData] = useState<any[]>([]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target?.files) {
      return;
    }

    const file = event.target?.files[0]; // get the uploaded file object
    const reader = new FileReader(); // create a new FileReader object
    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as any);
      const workbook = read(data, { type: 'array' });
      // console.log('workbook: ', workbook);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = utils.sheet_to_json(worksheet);
      console.log('jsonData : ', jsonData);
      if (jsonData.length > 0) {
        setUserData(jsonData.map((item: any, idx) => ({ id: idx, ...item })));
        handleClose();
      }
    };
    reader.readAsArrayBuffer(file); // read the uploaded file as array buffer
  };

  return (
    <Container maxWidth={'xxl' as any} className={s.container}>
      <Head>
        <title>sms | contact-manager</title>
      </Head>

      <Stack spacing={3}>
        <header>
          <Typography variant="h3">Contact Manager</Typography>
        </header>

        <Alert severity="info">
          <AlertTitle>
            <Typography variant="h6">List of Contacts</Typography>
          </AlertTitle>

          <Stack
            direction="row"
            justifyContent="space-between"
            width="100%"
            alignItems="center"
          >
            Add or Edit your contact list.
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={handleOpen}>
                Import Contact
              </Button>
              <Button variant="contained" onClick={handleOpen}>
                Add Contact
              </Button>
            </Stack>
          </Stack>
        </Alert>

        <ContactTableView userData={userData} onBack={() => null} />

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box className={s.modal}>
            <Stack spacing={4} alignItems="center">
              <TextSnippet fontSize="large" />

              <Typography variant="h5"> Drag & Drop</Typography>

              <div className={s.or}>
                <hr />
                <Typography> Or </Typography>
              </div>

              <Input
                inputProps={{
                  accept:
                    '.csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                  multiple: false,
                  onChange: handleFileUpload,
                  id: 'contact-file',
                }}
                id="contact-file"
                type="file"
                placeholder="Upload Contact File"
                // value={null}
                // onChange={handleFileUpload}
                hidden
              />

              <label htmlFor="contact-file">
                <Button size="large" variant="outlined" component="span">
                  Choose File
                </Button>
              </label>

              <Typography>.XLS or .CSV</Typography>
            </Stack>
          </Box>
        </Modal>
      </Stack>
    </Container>
  );
};

export default ContactManager;
