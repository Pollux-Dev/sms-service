import React, { ChangeEvent, useState } from 'react';
import s from './send.module.scss';
import { Alert, AlertTitle, Input, Stack } from '@mui/material';
import { FileCopy } from '@mui/icons-material';
import { TabPanel } from '@mui/lab';
import { read, utils } from 'xlsx';
import TableView from '@/scenes/Send/TableView';

const BulkSms = () => {
  const [userData, setUserData] = useState<any[]>();
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('handle file upload ------------ ');

    if (!event.target?.files) {
      return;
    }

    const file = event.target?.files[0]; // get the uploaded file object
    const reader = new FileReader(); // create a new FileReader object
    reader.onload = (event) => {
      // if (!event.target?.result) return;

      const data = new Uint8Array(event.target?.result as any);

      // return;
      const workbook = read(data, { type: 'array' });

      console.log('workbook: ', workbook);

      // new File().slice()

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
        <Stack className={s.single} spacing={4}>
          <Alert severity="info" className={s.alert}>
            <AlertTitle>Note</AlertTitle>
            (File format : Spread sheet or .CSV, First column Should be
            numbers.)
          </Alert>

          <Input
            inputProps={{
              accept:
                '.csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              multiple: false,
              onChange: handleFileUpload,
            }}
            startAdornment={<FileCopy />}
            id="contact-file"
            type="file"
            placeholder="Upload Contact File"
            // value={null}
            // onChange={handleFileUpload}
          />
        </Stack>
      )}

      {activeStep === 1 && userData && (
        <TableView userData={userData} onBack={() => setActiveStep(0)} />
      )}
    </TabPanel>
  );
};

export default BulkSms;
