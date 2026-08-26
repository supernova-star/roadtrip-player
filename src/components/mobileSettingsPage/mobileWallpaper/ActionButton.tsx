import React from 'react';
import { RowFlexContainer } from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';

export type ActionButtonProps = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  primary?: boolean;
  fill?: boolean;
};

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  onClick,
  disabled,
  primary,
  fill,
}) => (
  <RowFlexContainer
    alignItems="center"
    justifyContent="center"
    gap={[2]}
    padding={[3]}
    flex={fill ? 1 : undefined}
    cursor={disabled ? 'notAllowed' : 'pointer'}
    onClick={disabled ? undefined : onClick}
    style={{
      borderRadius: '10px',
      backgroundColor: primary
        ? 'var(--player-accent)'
        : 'var(--background-dark-transparent)',
      border: primary
        ? '1px solid var(--player-accent)'
        : '1px solid var(--player-border)',
      opacity: disabled ? 0.55 : 1,
      flexShrink: 0,
    }}
  >
    <span
      style={{
        color: primary ? 'var(--player-background)' : 'var(--player-accent)',
        display: 'flex',
      }}
    >
      {icon}
    </span>
    <Typography
      variant="body2"
      weight="semiBold"
      color={primary ? 'var(--player-background)' : 'var(--player-accent)'}
    >
      {label}
    </Typography>
  </RowFlexContainer>
);
