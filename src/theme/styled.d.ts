import 'styled-components'
import { Theme as AppTheme } from './theme'

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends AppTheme {}
}

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    mobile: true;
    tablet: true;
    smallDesktop: true;
  }
}