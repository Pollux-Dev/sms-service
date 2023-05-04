import {
  Autocomplete,
  Card,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DateRangeSharp, FilterAlt } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';

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

const providerOptions = [{ label: 'ethio-telecom' }, { label: 'safari-com' }];

export const TabelHead = () => (
  <Card sx={{ p: 2 }}>
    <Stack spacing={2}>
      <Stack spacing={2} direction="row" alignItems="center">
        <FilterAlt color="disabled" />
        <Typography>Filter By: </Typography>
      </Stack>

      <Stack direction="row" spacing={3} alignItems="center">
        <Autocomplete
          disablePortal
          options={top100Films}
          sx={{ width: '100%', maxWidth: '15rem' }}
          // multiple
          renderInput={(params) => (
            <TextField {...params} label="Filter By Category" />
          )}
        />
        <Autocomplete
          disablePortal
          options={providerOptions}
          sx={{ maxWidth: '15rem', width: '100%' }}
          // multiple
          renderInput={(params) => (
            <TextField {...params} label="Filter By Provider" />
          )}
        />

        <DatePicker
          // disablePast
          value={new Date()}
          // minDate={moment().toDate()}
          // maxDate={moment().add(10, 'days').toDate()}
          label="By Date"
          // inputFormat="dd-m-yyyy"
          /*onChange={date => {
            // console.log( 'date: ', moment( date ).format( 'YYYY-MM-DD' ) );
            formik.setFieldValue(
              'departureDate',
              moment(date).format('YYYY-MM-DD'),
            );
          }}*/
          slotProps={{
            textField: {
              name: 'departureDate',
              required: true,
              InputProps: {
                endAdornment: (
                  <InputAdornment position="start">
                    <DateRangeSharp />
                  </InputAdornment>
                ),
              },
            },
          }}
        />
      </Stack>
    </Stack>
  </Card>
);
