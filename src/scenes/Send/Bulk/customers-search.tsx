import {
  Card,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import { Search } from '@mui/icons-material';

export const CustomersSearch = () => (
  <Card sx={{ p: 2 }}>
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="h5">Imported Contacts</Typography>

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
        sx={{ maxWidth: 500 }}
      />
    </Stack>
  </Card>
);
