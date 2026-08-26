import React from 'react';
import { RowFlexContainer } from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';

type ProfileTextButtonProps = React.PropsWithChildren<{
  disabled?: boolean;
  onClick: () => void;
}>;

export const ProfileTextButton: React.FC<ProfileTextButtonProps> = ({
  children,
  disabled = false,
  onClick,
}) => (
  <RowFlexContainer
    alignItems="center"
    justifyContent="center"
    padding={[1, 2]}
    cursor={disabled ? 'notAllowed' : 'pointer'}
    onClick={disabled ? undefined : onClick}
    style={{
      borderRadius: '4px',
      backgroundColor: disabled
        ? 'var(--background-dark-transparent)'
        : 'var(--player-accent)',
      opacity: disabled ? 0.54 : 1,
    }}
  >
    <Typography
      variant="caption"
      weight="semiBold"
      color={
        disabled ? 'var(--player-text-secondary)' : 'var(--player-background)'
      }
    >
      {children}
    </Typography>
  </RowFlexContainer>
);
