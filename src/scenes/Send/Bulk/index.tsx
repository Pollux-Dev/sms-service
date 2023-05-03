import React, { ChangeEvent, useState } from 'react';
import {
  Alert,
  AlertTitle,
  Button,
  Input,
  Stack,
  Typography,
} from '@mui/material';
import { FileCopy, TextSnippet } from '@mui/icons-material';
import { TabPanel } from '@mui/lab';
import { read, utils } from 'xlsx';
import ImportedTableView from './ImportedTableView';
import s from './bulk.module.scss';

const BulkSms = () => {
  const [userData, setUserData] = useState<any[]>();
  const [activeStep, setActiveStep] = useState<number>(0);

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
        setActiveStep(1);
      }
    };
    reader.readAsArrayBuffer(file); // read the uploaded file as array buffer
  };

  return (
    <TabPanel value="bulk">
      {/*<Button variant="contained">Upload</Button>*/}

      {activeStep === 0 && (
        <Stack className={s.bulk} spacing={4}>
          <Alert severity="info" className={s.alert}>
            <AlertTitle>Note</AlertTitle>
            File format : Spread sheet or .CSV, First column Should be numbers.
          </Alert>

          <Stack spacing={4} alignItems="center" className={s.drag_drop}>
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
              startAdornment={<FileCopy />}
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
        </Stack>
      )}

      {activeStep === 1 && userData && (
        <ImportedTableView
          userData={userData}
          onBack={() => setActiveStep(0)}
        />
      )}
    </TabPanel>
  );
};

export default BulkSms;
