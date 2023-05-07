import {
  Box,
  Card,
  Checkbox,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { useEffect, useState } from 'react';
import { Delete, Edit } from '@mui/icons-material';
import { Account } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';

type PropsType = {
  onActions: {
    onEdit: {
      setEditModalOpen: (account: Account) => void;
    };
    onDelete: {
      setDeleteModalOpen: (selected: string) => void;
    };
  };
} & Record<string, any>;

export const CustomersTable = (props: PropsType) => {
  const [tHeads, setTHeads] = useState<any[]>([]);

  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => null,
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  useEffect(() => {
    if (items.length > 0) {
      setTHeads([...Object.keys(items[0]), 'Actions']);
    }
  }, [props.items]);

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;
  const queryClient = useQueryClient();

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>

                {tHeads.map((head: any) => (
                  <TableCell key={head}>{head}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item: any, index: number) => {
                const isSelected = selected.includes(item.id);
                // const createdAt = format(new Date(), 'dd/MM/yyyy');

                // console.log('items: ', item);

                return (
                  <TableRow hover key={item.id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(item.id);
                          } else {
                            onDeselectOne?.(item.id);
                          }
                        }}
                      />
                    </TableCell>
                    {/*<TableCell>{index}</TableCell>*/}
                    {Object.values(item).map((value: any, idx) => (
                      <TableCell key={idx}>{value}</TableCell>
                    ))}
                    <TableCell>
                      <Stack direction="row" spacing={2}>
                        <Tooltip title="Edit" placement="top">
                          <IconButton
                            onClick={() => {
                              props.onActions.onEdit.setEditModalOpen({
                                ...item,
                              } as any);
                            }}
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete" placement="top">
                          <IconButton
                            onClick={async () => {
                              props.onActions.onDelete.setDeleteModalOpen(
                                item.id,
                              );
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

/*
CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
  tempItems: PropTypes.array,
  onActions: PropTypes.any,
};
*/
