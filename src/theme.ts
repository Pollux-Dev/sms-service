import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

//#ededed

// Create a theme instance.

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200, // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      xxl: 1900,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
          borderRadius: '5000px',
          // lineHeight: '100%'
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
    background: {
      default: '#0D0D0D',
    },
    text: {
      primary: '#fff',
    },
    primary: {
      main: '#AEAFFF',
    },
    secondary: {
      main: '#8d8d8d',
    },
    error: {
      main: red.A400,
    },
  },
});

// responsiveFontSizes(theme, {})

export default theme;
