import React, { useCallback, useMemo, useState } from 'react';

import {
  Alert,
  Box,
  InputAdornment,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { applyPagination } from '@/util/helpers/apply-pagination';
import { useSelection } from '@/util/hooks';
import { TableHead } from './table-head';
import { CustomersTable } from './customers-table';
import s from './contactmanager.module.scss';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { Account } from '@prisma/client';
import { Phone } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import API from '@/lib/API';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CONTACTS_REFRESH_KEY } from '@/queries/contacts';

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

function EditModal(props: {
  open: boolean;
  onClose: () => void;
  selected: Account;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  // console.log('isLoading: ', isLoading);

  const { selected } = props;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      phone: selected?.phone,
      category: selected?.category,
      serviceProvider: selected?.serviceProvider,
    },
    validateOnChange: false,
    async onSubmit(values) {
      setIsLoading(true);

      // todo -> use react-query
      API.post('/update', {
        id: selected?.id,
        phone: values.phone,
        category: values.category,
        serviceProvider: values.serviceProvider,
      })
        .then((response) => {
          console.log('response :', response);

          if (response.status === 200) {
            queryClient.refetchQueries(['contacts']).then(() => {
              toast.success('update success');
              props.onClose();
              setIsLoading(false);
            });
          }
        })
        .catch((err) => {
          toast.error('update error: ', err.message);
          setIsLoading(false);
        });
    },
  });

  if (!selected) return null;

  // console.log('selected: ', selected);

  return (
    <Modal open={props.open} onClose={props.onClose} keepMounted={false}>
      <Box className={clsx([s.modal_edit, s.modal_common])}>
        <Stack spacing={4} onSubmit={formik.handleSubmit} component={'form'}>
          <Typography variant="h6" align="center" color="gray">
            Edit Contact
          </Typography>
          <hr />
          <br />

          <div className={s.content}>
            <TextField
              name="phone"
              type="text"
              variant="outlined"
              placeholder="Phone Number"
              label="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              name="category"
              type="text"
              variant="outlined"
              // placeholder="category"
              label="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              name="serviceProvider"
              type="text"
              variant="outlined"
              // placeholder="Phone Number"
              label="service provider"
              value={formik.values.serviceProvider}
              onChange={formik.handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <LoadingButton
            variant="contained"
            disabled={!formik.dirty}
            sx={{ alignSelf: 'flex-end' }}
            type="submit"
            loading={isLoading}
          >
            Save
          </LoadingButton>
        </Stack>
      </Box>
    </Modal>
  );
}

const mutationFn = (id: string) => {
  return API.delete(`/delete?id=${id}`);
};

function DeleteConfirmationModal(props: {
  open: boolean;
  onClose: () => void;
  selected: Account['id'];
}) {
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn,
    onSuccess() {
      queryClient.refetchQueries([CONTACTS_REFRESH_KEY]).then(() => {
        setIsLoading(false);
        toast.success('Success on deleting contact');
        props.onClose();
      });
    },
    onError() {
      toast.error('Error deleting contact');
      props.onClose();
    },
  });

  const { selected } = props;

  if (!selected) return null;

  // console.log('selected: ', selected);

  return (
    <Modal open={props.open} onClose={props.onClose} keepMounted={false}>
      <Box className={clsx([s.modal_delete, s.modal_common])}>
        <Stack spacing={4} alignItems="center">
          <Typography variant="h6" align="center" color="gray">
            Confirm Your Action !
          </Typography>

          <Alert severity="warning">
            Are you sure you want to delete this contact?
          </Alert>

          <br />

          <Stack direction="row" spacing={4}>
            <LoadingButton
              variant="contained"
              loading={isLoading}
              onClick={() => {
                setIsLoading(true);
                deleteMutation.mutate(props.selected);
              }}
            >
              Continue
            </LoadingButton>

            <LoadingButton
              color="error"
              variant="outlined"
              loading={isLoading}
              onClick={() => props.onClose()}
            >
              Cancel
            </LoadingButton>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}

type EditModalArg = Account;

const ContactTableView = ({ userData, onBack }: PropsType) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage, userData);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

  const [editModalOpen, setEditModalOpen] = React.useState<EditModalArg>();
  const [deleteModalOpen, setDeleteModalOpen] =
    React.useState<EditModalArg['id']>();

  // console.log('editModalOpen: ', editModalOpen);

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
            onActions={{
              onEdit: {
                setEditModalOpen,
              },
              onDelete: {
                setDeleteModalOpen,
              },
            }}
          />
        </Stack>

        <EditModal
          open={Boolean(editModalOpen)}
          onClose={() => setEditModalOpen(undefined)}
          selected={editModalOpen as Account} // not happening
        />

        <DeleteConfirmationModal
          open={Boolean(deleteModalOpen)}
          onClose={() => setDeleteModalOpen(undefined)}
          selected={deleteModalOpen as string}
        />
      </Box>
    </Stack>
  );
};

export default ContactTableView;
