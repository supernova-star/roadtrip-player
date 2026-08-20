import React from 'react';
import MuiSwitch, { type SwitchProps as MuiSwitchProps } from '@mui/material/Switch';
import styled from 'styled-components';

const StyledSwitch = styled(MuiSwitch)(() => ({
  '& .MuiSwitch-switchBase': {
    color: '#888888',
    '&:hover': {
      backgroundColor: 'rgba(136, 136, 136, 0.08)',
    },
    '&.Mui-checked': {
      color: 'var(--player-accent)',
      '&:hover': {
        backgroundColor: 'rgba(var(--player-accent-rgb, 188, 108, 56), 0.08)',
      },
      '& + .MuiSwitch-track': {
        backgroundColor: 'var(--player-accent)',
        opacity: 0.5,
      },
    },
    '&.Mui-disabled': {
      color: '#444444',
      '& + .MuiSwitch-track': {
        backgroundColor: '#dfdede',
        opacity: 0.3,
      },
    },
  },
  '& .MuiSwitch-track': {
    backgroundColor: '#555555',
    opacity: 1,
  },
}));

export type SwitchProps = Pick<MuiSwitchProps, 'checked' | 'onChange' | 'disabled' | 'size'>;

export const Switch: React.FC<SwitchProps> = (props) => {
  return <StyledSwitch {...props} />;
};
