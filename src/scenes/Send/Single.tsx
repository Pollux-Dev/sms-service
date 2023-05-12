import React, { useEffect, useState } from 'react';
import s from './send.module.scss';
import { Autocomplete, Stack, TextField } from '@mui/material';
import { LoadingButton, TabPanel } from '@mui/lab';
import { useContactsQueries } from '@/queries/contacts';
import API from '@/lib/API';
import toast from 'react-hot-toast';
import { matchIsValidTel } from 'mui-tel-input';
import { AsYouType } from 'libphonenumber-js';

const SingleSms = () => {
  const { data: contacts, isLoading } = useContactsQueries();
  const [contactList, setContactList] = React.useState<
    { label: string; id: string }[]
  >([]);
  const [selectedContact, setSelectedContact] = React.useState<{
    label: string;
    id: string;
  }>();
  const [inputValue, setInputValue] = useState<string>();
  const [message, setMessage] = React.useState<string>('');
  const [formError, setFormError] = useState(false);

  useEffect(() => {
    if (selectedContact && selectedContact.label !== '') {
      setFormError(!matchIsValidTel(String(selectedContact.label), 'ET'));
    }

    if (inputValue) {
      setFormError(!matchIsValidTel(inputValue, 'ET'));
    }
  }, [inputValue, selectedContact]);

  useEffect(() => {
    if (contacts && contacts.length > 0) {
      setContactList(
        contacts.map((contact) => ({ label: contact.phone, id: contact.id })),
      );
    }
  }, [contacts]);

  return (
    <TabPanel value="single">
      <Stack className={s.single} spacing={4}>
        <Autocomplete
          disablePortal
          options={contactList}
          sx={{ width: '100%' }}
          // multiple
          fullWidth
          freeSolo
          value={selectedContact}
          selectOnFocus
          handleHomeEndKeys
          onChange={(event, newValue) => {
            console.log('onChange : ', newValue);
            setInputValue(undefined);
            setSelectedContact(newValue as any);
          }}
          onInputChange={(event, newInputValue) => {
            console.log('onInputCHange : ', newInputValue);
            setInputValue(new AsYouType('ET').input(newInputValue));
            setSelectedContact(undefined);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              fullWidth
              label="Contact List"
              helperText={'Select contact'}
              error={formError}
            />
          )}
        />

        {/* <TextField
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
        />*/}

        {/*  <TextField
          type="text"
          variant="outlined"
          placeholder="Sender Id"
          label="Sender Id"
          helperText="(Sender ID should be less than 11 character)"
        />*/}

        <TextField
          multiline
          type="number"
          variant="outlined"
          placeholder="Your message"
          helperText="characters count: 0"
          rows={5}
          label="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <LoadingButton
          size="large"
          variant="contained"
          disabled={
            formError ||
            isLoading ||
            !Boolean(message) ||
            !Boolean(selectedContact)
          }
          onClick={() => {
            if (selectedContact) {
              API.post('/send-sms-bulk', {
                outbox: [
                  {
                    message: message,
                    contactId: selectedContact.id,
                  },
                ],
              })
                .then((res) => {
                  toast.success(
                    `message sent successfully for ${selectedContact}`,
                  );
                })
                .catch((err) => {
                  console.log('errro : ', err);
                  toast.error('Error sending message');
                });
            }

            // send sms for non-contact client
            if (inputValue) {
              toast('sending sms for non-contact client');
            }
          }}
        >
          Send Message
        </LoadingButton>
      </Stack>
    </TabPanel>
  );
};

export default SingleSms;
