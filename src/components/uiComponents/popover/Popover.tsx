import * as React from 'react';
import MuiPopover, { type PopoverProps as MuiPopoverProps } from '@mui/material/Popover';

export type PopoverProps = MuiPopoverProps;

export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(function Popover(
  { children, ...props },
  ref
) {
  return (
    <MuiPopover
      ref={ref}
      slotProps={{
        paper: {
          sx: {
            backgroundColor: 'transparent',
            borderRadius: '8px',
          },
        },
      }}
      {...props}
    >
      {children}
    </MuiPopover>
  );
});

export default Popover;
