import { useRouter } from 'next/navigation';
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
import { signOut, useSession } from 'next-auth/react';
import { useAppContext } from '@/context/app';
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
  const router = useRouter();
  const session: any = useSession();
  const { me } = useAppContext();

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
        <Typography color="text.secondary" variant="body2">
          {me?.username}
        </Typography>
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
        <Link href="/dashboard/talent/orders" onClick={() => onClose()}>
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

        <MenuItem
          onClick={() => {
            signOut({
              redirect: true,
              callbackUrl: '/auth/login',
            })
              .then(() => onClose())
              .catch(() => onClose());
          }}
        >
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};
