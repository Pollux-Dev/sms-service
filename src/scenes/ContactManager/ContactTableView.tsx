import React, { useCallback, useMemo, useState } from 'react';

import { Box, Container, Stack } from '@mui/material';
import { applyPagination } from '@/util/helpers/apply-pagination';
import { useSelection } from '@/util/hooks';
import { TableHead } from './table-head';
import { CustomersTable } from './customers-table';
import s from './contactmanager.module.scss';

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

const ContactTableView = ({ userData, onBack }: PropsType) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage, userData);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

  const handlePageChange = useCallback((event: any, value: any) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback(
    (event: any) => {
      setRowsPerPage(event.target.value);
    },
    [userData],
  );

  return (
    <Stack spacing={2} className={s.tabel}>
      <Box component="main">
        <Stack spacing={3}>
          <TableHead />
          <CustomersTable
            count={userData.length}
            items={customers}
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
    </Stack>
  );
};

export default ContactTableView;
