import React, { ChangeEvent, useState } from 'react';
import {
  Alert,
  AlertTitle,
  Autocomplete,
  Button,
  Input,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { FileCopy } from '@mui/icons-material';
import { TabPanel } from '@mui/lab';
import { read, utils } from 'xlsx';
import ImportedTableView from './ImportedTableView';
import s from './bulk.module.scss';
import { useCategoriesQueries, useContactsQueries } from '@/queries/contacts';
import toast from 'react-hot-toast';

const BulkSms = () => {
  const [userData, setUserData] = useState<any[]>();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedCategories, setSelectCategories] = useState<string[]>([]);
  const { data: categories } = useCategoriesQueries();
  const { data: contacts } = useContactsQueries();

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

      if (
        jsonData.length <= 0 ||
        typeof jsonData[0] === 'undefined' ||
        typeof jsonData[0] !== 'object'
      ) {
        toast.error('Invalid or Empty file imported', { duration: 4000 });
        return;
      }

      // check the shape of the data to mach this : {category: string, phone: string, telecom: string}

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

      console.log('jsonData : ', jsonData);

      setUserData(jsonData.map((item: any, idx) => ({ id: idx, ...item })));
      setActiveStep(1);
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
            <Typography variant="h6">
              Import Contacts From Contact-List
            </Typography>

            <Stack
              spacing={3}
              direction="row"
              alignItems="flex-start"
              sx={{ my: '2rem', width: '100%', maxWidth: '20rem' }}
            >
              <Autocomplete
                disablePortal
                options={categories || []}
                sx={{ maxWidth: '15rem', width: '100%' }}
                multiple
                fullWidth
                value={selectedCategories}
                onChange={(event, newValue) => {
                  setSelectCategories(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Filter By Categories"
                    helperText={
                      selectedCategories.length > 0
                        ? ''
                        : 'Select categories to filter contacts'
                    }
                  />
                )}
              />

              <Button
                variant="contained"
                size="large"
                disabled={selectedCategories.length === 0}
                onClick={() => {
                  if (selectedCategories.length > 0) {
                    const filteredContacts = contacts?.filter((contact) =>
                      selectedCategories.includes(contact.category),
                    );
                    setUserData(filteredContacts);
                    setActiveStep(1);
                  }
                }}
              >
                Import
              </Button>
            </Stack>

            <div className={s.or}>
              <hr />
              <Typography> Or </Typography>
            </div>

            <Typography variant="h6">Import Contacts From File</Typography>

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
