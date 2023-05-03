import {
  Autocomplete,
  Card,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
  TextField,
} from '@mui/material';
import { Search } from '@mui/icons-material';

const top100Films = [
  { label: 'category', year: 1994 },
  {
    label: 'category',
    year: 1972,
  },
  { label: 'category', year: 1974 },
  { label: 'category', year: 2008 },
  {
    label: 'category',
    year: 1957,
  },
  { label: 'category', year: 1993 },
];

export const TableHead = () => (
  <Card sx={{ p: 2 }}>
    <Stack spacing={2}>
      {/*<Typography variant="h">Contact List</Typography>*/}

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <OutlinedInput
          defaultValue=""
          fullWidth
          placeholder="Search customer"
          startAdornment={
            <InputAdornment position="start">
              <SvgIcon color="action" fontSize="small">
                <Search />
              </SvgIcon>
            </InputAdornment>
          }
          sx={{ maxWidth: '20rem' }}
        />

        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={top100Films}
          sx={{ width: 300 }}
          // multiple
          renderInput={(params) => (
            <TextField {...params} label="Filter By Category" />
          )}
        />
      </Stack>
    </Stack>
  </Card>
);
