import React from 'react';
import { ColumnFlexContainer } from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';

export const SettingsSection: React.FC<
  React.PropsWithChildren<{ title: string }>
> = ({ title, children }) => (
  <ColumnFlexContainer gap={[2]}>
    <Typography
      variant="body2"
      weight="semiBold"
      color="var(--player-text-secondary)"
    >
      {title}
    </Typography>
    {children}
  </ColumnFlexContainer>
);
