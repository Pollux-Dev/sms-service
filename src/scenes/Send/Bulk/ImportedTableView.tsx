import React, { useCallback, useMemo, useState } from 'react';

import s from './bulk.module.scss';
import { Box, Button, Container, Stack, TextField } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import { applyPagination } from '@/util/helpers/apply-pagination';
import { useSelection } from '@/util/hooks';
import { CustomersSearch } from './customers-search';
import { CustomersTable } from './customers-table';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import API, { getUrl } from '@/lib/API';
import toast from 'react-hot-toast';

type PropsType = {
  userData: any[];
  onBack: () => void;
};

const useCustomers = (page: number, rowsPerPage: number, data: any[] = []) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [page, rowsPerPage, data]);
};

const useCustomerIds = (
  customers: ({ id: string } & Record<string, any>)[],
) => {
  return useMemo(() => {
    return customers.map((customer) => customer.id);
  }, [customers]);
};

const ImportedTableView = ({ userData, onBack }: PropsType) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const customers = useCustomers(page, rowsPerPage, userData);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>();

  // console.log('customerSelection: ', customersSelection);

  const handlePageChange = useCallback((event: any, value: any) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event: any) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <Stack spacing={2} className={s.tabel}>
      <Button
        startIcon={<ChevronLeft />}
        variant="contained"
        onClick={onBack}
        className={s.back}
      >
        back
      </Button>

      <Box component="main">
        <Stack spacing={3}>
          <CustomersSearch />
          <CustomersTable
            count={userData.length}
            items={customers}
            tempItems={userData}
            onDeselectAll={customersSelection.handleDeselectAll}
            onDeselectOne={customersSelection.handleDeselectOne}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            onSelectAll={customersSelection.handleSelectAll}
            onSelectOne={customersSelection.handleSelectOne}
            page={page}
            rowsPerPage={rowsPerPage}
            selected={customersSelection.selected}
          />
        </Stack>

        <Container maxWidth={'xxl' as any}></Container>
      </Box>

      <Stack sx={{ maxWidth: '30rem' }} spacing={4} component={Container}>
        <TextField
          multiline
          type="number"
          variant="outlined"
          placeholder="Your message"
          helperText="characters count: 0"
          rows={5}
          label="Message"
          onChange={(e) => setMessage(e.target.value)}
        />

        <LoadingButton
          size="large"
          variant="contained"
          sx={{ maxWidth: '15rem', margin: '0 auto' }}
          loading={isLoading}
          disabled={!Boolean(message)}
          onClick={async () => {
            setIsLoading(true);
            let sentNo = 0;

            for (const customer of userData) {
              const cu = {
                phone: customer.phone_number || customer.phone,
                message,
                category: customer.category,
              };

              await axios
                .get(getUrl(message as string, cu.phone.replaceAll(' ', '')))
                .then((res) => {
                  sentNo = sentNo++;
                  console.log('sent data: ', res.data);
                  return res.data;
                })
                .catch((err) => {
                  console.log('send bulk err: ', err);
                  // toast.error(`failed to send sms to ${cu.phone}`);
                  setIsLoading(false);
                });

              console.log('customer: ', customer);
            }

            if (sentNo > 0) {
              toast.success(
                `messages successfully sent to ${sentNo} customers`,
              );

              const outBox = await API.post('/create-outbox', {
                message,
                status: 'success',
                noContacts: sentNo,
                category: userData[0].category,
              })
                .then((res) => {
                  console.log('create outbox response: ', res.data);
                  toast('outbox created successfully');
                  setIsLoading(false);
                })
                .catch((err) => {
                  console.log('outbox err: ', err);
                  toast.error('failed to create outbox');
                  setIsLoading(false);
                });
            } else if (sentNo === 0 && userData.length > 0) {
              toast.error('failed to send sms');

              // setIsLoading(false);
            }

            console.log('all finished');
            setIsLoading(false);
          }}
        >
          Send Message
        </LoadingButton>
      </Stack>
    </Stack>
  );
};

export default ImportedTableView;
