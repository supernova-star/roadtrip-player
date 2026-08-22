import React from 'react';
import { RowFlexContainer } from '@/components/uiComponents/container/Container';

export const IconTile: React.FC<React.PropsWithChildren> = ({ children }) => (
  <RowFlexContainer
    alignItems="center"
    justifyContent="center"
    width={[10]}
    height={[10]}
    borderRadius={[2]}
    style={{
      backgroundColor: 'var(--background-dark-transparent)',
      border: '1px solid var(--player-border)',
      flexShrink: 0,
    }}
  >
    {children}
  </RowFlexContainer>
);
