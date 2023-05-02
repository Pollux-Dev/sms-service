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
import { adminPaths, talentPaths } from './config';
import { SideNavItem } from './side-nav-item';
import s from './layoutdashboard.module.scss';
import LogoImg from '@/public/vercel.svg';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export const SideNav = (props: any) => {
  const { data: session } = useSession() as any;

  const { open, onClose } = props;
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  const paths = session?.user?.isAdmin
    ? adminPaths
    : session?.user?.isTalent
    ? talentPaths
    : [];

  const content = (
    <Scrollbar
      className={s.side_nav}
      sx={{
        height: '100%', // border: 'thin solid red',
        '& .simplebar-content': {
          height: '100%',
        },
        '& .simplebar-scrollbar:before': {
          background: 'neutral.400',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%', // border: 'thin solid yellow',
        }}
      >
        <Box className={s.logo}>
          <Box component={NextLink} href="/">
            <Image src={LogoImg} alt="app logo" />

            {/*<Logo />*/}
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
            {paths.map((item: any) => {
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
      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.800',
            color: 'common.white',
            width: 280,
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
          backgroundColor: 'neutral.800',
          color: 'common.white',
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
