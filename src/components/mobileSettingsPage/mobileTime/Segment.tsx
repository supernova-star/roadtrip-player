import React from 'react';
import { RowFlexContainer } from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';

export const Segment: React.FC<{
  label: string;
  active: boolean;
  onClick: () => void;
}> = ({ label, active, onClick }) => (
  <RowFlexContainer
    alignItems="center"
    justifyContent="center"
    flex={1}
    padding={[3]}
    cursor="pointer"
    onClick={onClick}
    style={{
      borderRadius: '8px',
      backgroundColor: active
        ? 'var(--surface-selected)'
        : 'var(--background-dark-transparent)',
      border: `1px solid ${active ? 'var(--player-accent)' : 'var(--player-border)'}`,
    }}
  >
    <Typography
      variant="body2"
      weight="semiBold"
      color={active ? 'var(--player-accent)' : 'var(--player-text-secondary)'}
    >
      {label}
    </Typography>
  </RowFlexContainer>
);
