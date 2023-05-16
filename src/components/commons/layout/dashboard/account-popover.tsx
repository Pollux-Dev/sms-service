import {
  Box,
  Divider,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from '@mui/material';

/*
AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
*/

type PropsType = {
  anchorEl: any;
  onClose: () => void;
  open: boolean;
};

export const AccountPopover = (props: PropsType) => {
  const { anchorEl, onClose, open } = props;

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">Account</Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1,
          },
        }}
      >
        <MenuItem>Sign out</MenuItem>
      </MenuList>
    </Popover>
  );
};
