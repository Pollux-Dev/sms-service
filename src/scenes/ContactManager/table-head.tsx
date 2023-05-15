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
import { useEffect, useState } from 'react';

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

export const TableHead = ({
  selectedCategories,
  setSelectedCategories,
  userData = [] as any[],
}: any) => {
  const [categories, setCategories] = useState<{ label: string }[]>([]);
  // const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  // const contactsQuery = useContactsQueries();

  useEffect(() => {
    // SET categories from contacts, distinct
    if (userData) {
      const categories = userData.map((contact: any) => contact.category);
      const uniqueCategories = [...new Set(categories)];
      setCategories(
        uniqueCategories.map((category) => ({ label: category as string })),
      );
    }
  }, [userData]);

  console.log('selectedCategories: ', selectedCategories);

  return (
    <Card sx={{ p: 2 }}>
      <Stack spacing={2}>
        {/*<Typography variant="h">Contact List</Typography>*/}

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
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
            multiple
            disablePortal
            id="combo-box-demo"
            options={categories}
            sx={{ width: 300 }}
            onChange={(event, newValue) => {
              setSelectedCategories(newValue as any);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Filter By Category" />
            )}
          />
        </Stack>
      </Stack>
    </Card>
  );
};
