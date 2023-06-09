import React, { ChangeEvent, useEffect, useState } from 'react';
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
  TextField,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import ContactTableView from '@/scenes/ContactManager/ContactTableView';
import { TextSnippet } from '@mui/icons-material';
import { useContactsQueries } from '@/queries/contacts';
import { read, utils } from 'xlsx';
import { useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import API from '@/lib/API';
import toast from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';
import { matchIsValidTel, MuiTelInput } from 'mui-tel-input';

function ImportBulkModal(props: { open: boolean; onClose: () => void }) {
  const [importedContacts, setImportedContacts] = useState<any[]>([]);
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target?.files) {
      return;
    }

    const file = event.target?.files[0]; // get the uploaded file object
    const reader = new FileReader(); // create a new FileReader object
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target?.result as any);
      const workbook = read(data, { type: 'array' });
      // console.log('workbook: ', workbook);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = utils.sheet_to_json(worksheet);
      console.log('jsonData : ', jsonData);

      if (
        jsonData.length <= 0 ||
        typeof jsonData[0] === 'undefined' ||
        typeof jsonData[0] !== 'object'
      ) {
        toast.error('Invalid or Empty file imported', { duration: 4000 });
        return;
      }

      const shape = [
        'category',
        ['phone_number', 'phone'],
        ['telecom', 'serviceProvider'],
      ];
      const keys = Object.keys(jsonData[0] as any);
      const isShapeValid = shape.every((key) => {
        if (Array.isArray(key)) {
          return key.some((k) => keys.includes(k));
        }
        return keys.includes(key);
      });

      if (!isShapeValid) {
        toast.error(
          'Invalid file format, make sure the file content contain category, phone and telecom columns',
          { duration: 4000 },
        );
        return;
      }

      setIsLoading(true);

      setImportedContacts(
        jsonData.map((item: any, idx) => ({ id: idx, ...item })),
      );

      API.post('/create-many', {
        contacts: jsonData,
      })
        .then((response) => {
          console.log('response :', response);

          queryClient.refetchQueries(['contacts']).then(() => {
            toast.success('creating bulk contact success');
            setIsLoading(false);
            props.onClose();
          });
        })
        .catch((err) => {
          toast.error('adding contact error: ', err.message);
          setIsLoading(false);
        });

      // props.onClose();
    };
    reader.readAsArrayBuffer(file); // read the uploaded file as array buffer
  };

  return (
    <Modal
      open={props.open}
      onClose={isLoading ? () => null : props.onClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box className={s.modal_import}>
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
            <LoadingButton
              loading={isLoading}
              size="large"
              variant="outlined"
              component="span"
            >
              Choose File
            </LoadingButton>
          </label>

          <Typography>.XLS or .CSV</Typography>
        </Stack>
      </Box>
    </Modal>
  );
}

function AddSingleContactModal(props: { open: boolean; onClose: () => void }) {
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      phone: '',
      category: '',
      serviceProvider: '',
    },
    validateOnChange: false,
    async onSubmit(values) {
      if (!matchIsValidTel(values.phone)) {
        toast.error('invalid phone number');
        return;
      }

      setIsLoading(true);

      // todo -> use react-query
      API.post('/create-one', {
        phone: values.phone,
        category: values.category,
        serviceProvider: values.serviceProvider,
      })
        .then((response) => {
          console.log('response :', response);

          if (response.status === 200) {
            queryClient.refetchQueries(['contacts']).then(() => {
              toast.success('creating new contact success');
              props.onClose();
              setIsLoading(false);
              formik.resetForm();
            });
          }
        })
        .catch((err) => {
          toast.error('adding contact error: ', err.message);
          setIsLoading(false);
        });
    },
  });

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Box className={s.modal_add}>
        <Stack spacing={4} onSubmit={formik.handleSubmit} component={'form'}>
          <Typography variant="h6" align="center" color="gray">
            Add Contact
          </Typography>
          <hr />
          <br />

          <div className={s.content}>
            <TextField
              name="category"
              type="text"
              variant="outlined"
              // placeholder="category"
              label="category"
              value={formik.values.category}
              onChange={formik.handleChange}
            />
            <TextField
              name="serviceProvider"
              type="text"
              variant="outlined"
              // placeholder="service provider"
              label="service provider"
              value={formik.values.serviceProvider}
              onChange={formik.handleChange}
            />

            <MuiTelInput
              label="phone no"
              name="phone"
              // placeholder={Array(15).fill('_').join(' ')}
              value={formik.values.phone}
              onlyCountries={['ET']}
              defaultCountry="ET"
              required
              fullWidth
              forceCallingCode
              focusOnSelectCountry
              onChange={(value, info) => {
                console.log('value: ', info);

                formik.setFieldValue('phone', value);
              }}
              error={Boolean(
                formik.values.phone && !matchIsValidTel(formik.values.phone),
              )}
              helperText={
                Boolean(
                  formik.values.phone && !matchIsValidTel(formik.values.phone),
                )
                  ? 'phone number is invalid'
                  : ''
              }
            />
          </div>

          <LoadingButton
            variant="contained"
            disabled={!formik.dirty}
            sx={{ alignSelf: 'flex-end' }}
            type="submit"
            loading={isLoading}
          >
            Create Contact
          </LoadingButton>
        </Stack>
      </Box>
    </Modal>
  );
}

const ContactManager = () => {
  const [open, setOpen] = React.useState(false);
  const [singleContactModalOpen, setSingleContactModalOpen] =
    React.useState(false);
  const [userData, setUserData] = useState<any[]>([]);

  const contactsQuery = useContactsQueries();

  // console.log('contactsQuery: ', userData);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (contactsQuery.data) {
      setUserData(contactsQuery.data);
    }
  }, [contactsQuery]);

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
              <Button
                variant="contained"
                onClick={() => setSingleContactModalOpen(true)}
              >
                Add Contact
              </Button>
            </Stack>
          </Stack>
        </Alert>

        <ContactTableView userData={userData} onBack={() => null} />

        {/* app modals */}
        <ImportBulkModal open={open} onClose={handleClose} />

        <AddSingleContactModal
          open={singleContactModalOpen}
          onClose={() => setSingleContactModalOpen(false)}
        />
      </Stack>
    </Container>
  );
};

export default ContactManager;
