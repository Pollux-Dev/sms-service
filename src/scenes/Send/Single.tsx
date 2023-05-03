import React from 'react';
import s from './send.module.scss';
import { InputAdornment, Stack, TextField } from '@mui/material';
import { Contacts } from '@mui/icons-material';
import { LoadingButton, TabPanel } from '@mui/lab';

const SingleSms = () => {
  return (
    <TabPanel value="single">
      <Stack className={s.single} spacing={4}>
        <TextField
          type="tel"
          variant="outlined"
          placeholder="Enter Phone number"
          label="Send To"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Contacts />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          type="text"
          variant="outlined"
          placeholder="Sender Id"
          label="Sender Id"
          helperText="(Sender ID should be less than 11 character)"
        />

        <TextField
          multiline
          type="number"
          variant="outlined"
          placeholder="Your message"
          helperText="characters count: 0"
          rows={5}
          label="Message"
        />

        <LoadingButton size="large" variant="contained">
          Send Message
        </LoadingButton>
      </Stack>
    </TabPanel>
  );
};

export default SingleSms;
