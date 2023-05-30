import {
  Avatar,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Theme,
  useMediaQuery,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { usePopover } from '@/util/hooks/use-popover';
import { AccountPopover } from './account-popover';
import s from './layoutdashboard.module.scss';
import { HorizontalSplit } from '@mui/icons-material';

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

/*TopNav.propTypes = {
  onNavOpen: PropTypes.func
};*/

type PropsType = {
  onNavOpen: () => void;
};

export const TopNav = (props: PropsType) => {
  const { onNavOpen } = props;
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const accountPopover = usePopover();

  return (
    <>
      <Box
        component="header"
        className={s.top_nav}
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: (theme) =>
            alpha(theme.palette.background.default, 0.8),
          position: 'sticky',
          left: {
            lg: `${SIDE_NAV_WIDTH}px`,
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
          },
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
          }}
        >
          <Stack alignItems="center" direction="row">
            {!lgUp && (
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize="large">
                  <HorizontalSplit />
                </SvgIcon>
              </IconButton>
            )}
            {/* <Tooltip title="Search">
              <IconButton>
                <SvgIcon fontSize="small">
                  <MagnifyingGlassIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip>*/}
          </Stack>
          <Stack alignItems="center" direction="row" spacing={2}>
            <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: 'pointer',
                height: 40,
                width: 40,
              }}
            />
          </Stack>
        </Stack>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
    </>
  );
};
