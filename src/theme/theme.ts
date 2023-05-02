import {
  createTheme as createMuiTheme,
  responsiveFontSizes,
} from '@mui/material/styles';
import { red } from '@mui/material/colors';

//#ededed

// Create a theme instance.

export default function createTheme(light: boolean) {
  return responsiveFontSizes(
    createMuiTheme({
      breakpoints: {
        values: {
          xs: 0,
          sm: 576,
          md: 768,
          lg: 992,
          xl: 1200,
          xxl: 1600,
          xxxl: 1900,
        } as any,
      },

      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'capitalize',
              borderRadius: '5000px', // lineHeight: '100%'
            },
          },
        },
        MuiAlert: {
          styleOverrides: {
            standardWarning: {
              // backgroundColor: 'red',
              border: '1px solid #ffb74d;',
            },
            standardInfo: {
              border: '1px solid #29b6f6;',
            },
          },
        },
      },

      typography: {
        fontFamily: 'SofiaPro',
        h1: {
          fontFamily: 'Gramatika',
        },
      },

      palette: {
        mode: 'light',

        background: {
          // default: '#0D0D0D',
        },
        primary: {
          main: '#8b8cf8', // main: '#8b8cf8',
          // main: '#eb5355',
        },
        secondary: {
          main: '#8d8d8d',
        },
        error: {
          main: red.A400,
        },
      },
    }),
    {},
  );
}
