import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Box,
  Divider,
  Drawer,
  Stack,
  Theme,
  useMediaQuery,
} from '@mui/material';
import { Scrollbar } from '@/components/scrollbar';
import { adminPaths } from './config';
import { SideNavItem } from './side-nav-item';
import s from './layoutdashboard.module.scss';
import LogoImg from '@/public/Logo.png';
import Image from 'next/image';
import { SIDE_NAV_WIDTH } from '@/components/commons/layout/dashboard/layout';

export const SideNav = (props: any) => {
  const { open, onClose } = props;
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  const content = (
    <Scrollbar
      className={s.side_nav}
      sx={{
        height: '100%', // border: 'thin solid red',
        '& .simplebar-content': {
          height: '100%',
        },
      }}
    >
      <Stack
        sx={{
          height: '100%',
        }}
      >
        <Box className={s.logo}>
          <Box component={NextLink} href="/">
            <Image src={LogoImg} alt="app logo" />
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'neutral.700' }} />

        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3,
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0,
            }}
          >
            {adminPaths.map((item: any) => {
              const active = item.path ? pathname === item.path : false;

              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })}
          </Stack>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
      </Stack>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'primary.main',
            // color: 'common.white',
            width: SIDE_NAV_WIDTH,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'primary.main',
          width: SIDE_NAV_WIDTH,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
