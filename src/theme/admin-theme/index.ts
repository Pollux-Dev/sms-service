import { createTheme as createMuiTheme } from '@mui/material/styles';
/*
 */
import { createPalette } from './create-palette';
import { createComponents } from './create-components';
import { createShadows } from './create-shadows';
import { createTypography } from './create-typography';

export function createTheme() {
  const shadows = createShadows();
  const typography = createTypography();
  const palette = createPalette();
  const components = createComponents({
    palette,
  });

  return createMuiTheme({
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
    components,
    palette: {
      ...palette,
      primary: {
        main: '#0287B1',
      },
      mode: 'light',
    },
    shadows,
    typography,
    shape: {
      borderRadius: 8,
    },
  });
}

export default createTheme();
