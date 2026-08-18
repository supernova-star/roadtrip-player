import createSpacing from '@mui/system/createTheme/createSpacing';
import { colorPalette } from './colors';

const theme = {
  colors: colorPalette,
  typography: {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: 16,
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
  },
  spacing: createSpacing((value: string | number) =>
    typeof value === 'number' ? `${value * 4}px` : value
  ),
  radii: {
    sm: '4px',
    md: '8px',
    lg: '16px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 12px rgba(0,0,0,0.08)',
  },
  transitions: {
    default: '200ms ease',
  },
  breakpoints: {
    mobile: 640,
    tablet: 768,
    smallDesktop: 1024,
  },
} as const;

export type Theme = typeof theme;
export default theme;
