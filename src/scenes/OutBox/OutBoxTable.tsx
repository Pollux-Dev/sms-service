import { format } from 'date-fns';
import {
  Box,
  Card,
  Checkbox,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { useEffect, useState } from 'react';
import { Sent } from '@prisma/client';
import s from './outbox.module.scss';

type PropsType = {
  items: Sent[];
} & Record<string, any>;

export const OutBoxTable = (props: PropsType) => {
  const [tHeads, setTHeads] = useState<any[]>([]);

  const {
    count = 0,
    items = [] as Sent[],
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

  // console.log('tmepItems: ', items);

  useEffect(() => {
    if (items.length > 0) {
      setTHeads([...Object.keys(items[0])]);
    }
  }, [props.items]);

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  return (
    <Card className={s.outbox_table}>
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
              {items.map((outbox, index: number) => {
                const isSelected = selected.includes(outbox.id);
                const createdAt = format(
                  outbox?.createdAt ? new Date(outbox.createdAt) : new Date(),
                  'dd/MM/yyyy',
                );

                return (
                  <TableRow hover key={outbox.id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(outbox.id);
                          } else {
                            onDeselectOne?.(outbox.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell className={s.id}>{outbox.id}</TableCell>
                    <TableCell>{outbox.noContacts}</TableCell>
                    <TableCell>{outbox.message}</TableCell>
                    <TableCell>
                      <Chip label={outbox.status} color="success" />
                    </TableCell>
                    <TableCell>{outbox.category}</TableCell>
                    <TableCell>{createdAt}</TableCell>
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
