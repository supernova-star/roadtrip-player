import { useTheme } from 'styled-components';
import useMediaQuery from '@mui/material/useMediaQuery';

export const useResponsive = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(
    `(max-width: ${theme.breakpoints.mobile - 1}px)`
  );

  const isTablet = useMediaQuery(
    `(min-width: ${theme.breakpoints.mobile}px) and (max-width: ${
      theme.breakpoints.tablet - 1
    }px)`
  );

  const isSmallDesktop = useMediaQuery(
    `(min-width: ${theme.breakpoints.tablet}px) and (max-width: ${
      theme.breakpoints.smallDesktop - 1
    }px)`
  );

  const isLargeDesktop = useMediaQuery(
    `(min-width: ${theme.breakpoints.smallDesktop}px)`
  );

  return {
    isMobile,
    isTablet,
    isSmallDesktop,
    isLargeDesktop,
  };
};