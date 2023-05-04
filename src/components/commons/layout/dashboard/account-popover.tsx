import {
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from '@mui/material';
import { Reorder } from '@mui/icons-material';
import Link from 'next/link';

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
        <Link href="/" onClick={() => onClose()}>
          <MenuItem>
            <ListItemIcon>
              <Reorder fontSize="small" />
            </ListItemIcon>
            <ListItemText>Orders</ListItemText>
          </MenuItem>
        </Link>

        {/* <MenuItem >
          <ListItemIcon>
            <FollowTheSigns fontSize="small" />
          </ListItemIcon>
          <ListItemText>Followers</ListItemText>
        </MenuItem>*/}

        <Divider />

        <MenuItem>Sign out</MenuItem>
      </MenuList>
    </Popover>
  );
};
