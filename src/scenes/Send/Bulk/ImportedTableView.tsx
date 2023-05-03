import React, { useCallback, useMemo, useState } from 'react';

import s from './bulk.module.scss';
import { Box, Button, Container, Stack, TextField } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import { applyPagination } from '@/util/helpers/apply-pagination';
import { useSelection } from '@/util/hooks';
import { CustomersSearch } from './customers-search';
import { CustomersTable } from './customers-table';
import { LoadingButton } from '@mui/lab';

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
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage, userData);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

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

        <LoadingButton
          size="large"
          variant="contained"
          sx={{ maxWidth: '15rem', margin: '0 auto' }}
        >
          Send Message
        </LoadingButton>
      </Stack>
    </Stack>
  );
};

export default ImportedTableView;
