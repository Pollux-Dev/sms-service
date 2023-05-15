import React, { useEffect, useState } from 'react';
import s from './send.module.scss';
import { Autocomplete, Stack, TextField } from '@mui/material';
import { LoadingButton, TabPanel } from '@mui/lab';
import { useContactsQueries } from '@/queries/contacts';
import toast from 'react-hot-toast';
import { matchIsValidTel } from 'mui-tel-input';
import { AsYouType } from 'libphonenumber-js';
import axios from 'axios';
import { getUrl } from '@/lib/API';

type MappedContact = {
  label: string; // id: string;
  phone: string;
  category: string;
};

const SingleSms = () => {
  const { data: contacts, isLoading } = useContactsQueries();
  const [loading, setLoading] = useState<boolean>(false);
  const [contactList, setContactList] = React.useState<MappedContact[]>([]);
  const [selectedContact, setSelectedContact] = React.useState<MappedContact>();
  const [inputValue, setInputValue] = useState<string>();
  const [message, setMessage] = React.useState<string>('');
  const [category, setCategory] = React.useState<string>('');
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
        contacts.map((contact) => ({
          label: contact.phone,
          phone: contact.phone,
          category: contact.category,
        })),
      );
    }
  }, [contacts]);

  return (
    <TabPanel value="single">
      <Stack
        className={s.single}
        spacing={4}
        // component={'form'}
        // onSubmit={(e) => e.preventDefault()}
      >
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
            if (newValue && typeof newValue === 'object') {
              setInputValue(undefined);
              setSelectedContact(newValue);
              setCategory(newValue.category);
            }
          }}
          onInputChange={(event, newInputValue) => {
            console.log('onInputCHange : ', newInputValue);
            setInputValue(new AsYouType('ET').input(newInputValue));
            setSelectedContact(undefined);

            if (selectedContact) setCategory('');
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

        <TextField
          type="text"
          variant="outlined"
          placeholder="Category"
          required
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={Boolean(selectedContact)}
        />

        <LoadingButton
          size="large"
          variant="contained"
          type="submit"
          disabled={formError || isLoading || loading || !Boolean(message)}
          onClick={() => {
            // send sms for non-contact client

            const phone = (inputValue || selectedContact?.phone) as string;

            console.log('phone: ', phone);

            setLoading(true);

            axios
              .get(getUrl(message, phone))
              .then((res) => {
                axios
                  .post('/create-outbox', {
                    message,
                    phone,
                    category,
                  })
                  .then((res) => {
                    console.log('send sms response: ', res.data);

                    toast('sms sent successfully');
                    setLoading(false);
                  })
                  .catch((err) => {
                    toast.error('failed to send sms');
                    setLoading(false);
                  });

                // create the outbox
              })
              .catch((res) => {
                toast.error('failed to send sms');
                setLoading(false);
              });
          }}
        >
          Send Message
        </LoadingButton>
      </Stack>
    </TabPanel>
  );
};

export default SingleSms;
