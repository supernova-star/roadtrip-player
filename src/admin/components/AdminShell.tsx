import React, { useState } from 'react';
import { ColumnFlexContainer } from '@/components/uiComponents/container/Container';
import { AdminBottomNavigation, AdminView } from './AdminBottomNavigation';
import { AdminCart } from './AdminCart';
import { AdminDashboard } from './AdminDashboard';
import { AdminHeader } from './AdminHeader';
import { AdminSongSearch } from './AdminSongSearch';

type AdminShellProps = {
  onGoHome: () => void;
};

export const AdminShell = ({ onGoHome }: AdminShellProps) => {
  const [activeView, setActiveView] = useState<AdminView>('dashboard');

  return (
    <ColumnFlexContainer
      height="100dvh"
      flex={1}
      backgroundColor="adminBackground"
      sx={{ color: 'adminDarkBrown', overflow: 'hidden' }}
    >
      <ColumnFlexContainer
        maxWidth="760px"
        height="100dvh"
        flex={1}
        backgroundColor="adminSurface"
        sx={{ mx: 'auto', minHeight: 0 }}
      >
        <AdminHeader onGoHome={onGoHome} />
        <ColumnFlexContainer
          padding={[0, 5, 22]}
          flex={1}
          data-testid="admin-shell-content"
          sx={{
            minHeight: 0,
            overflow: 'hidden',
            pb: 12,
            '@media (min-width: 600px)': { px: 4 },
          }}
        >
          {activeView === 'dashboard' ? (
            <AdminDashboard onSearchSongs={() => setActiveView('search')} />
          ) : activeView === 'search' ? (
            <AdminSongSearch />
          ) : (
            <AdminCart />
          )}
        </ColumnFlexContainer>
      </ColumnFlexContainer>
      <AdminBottomNavigation activeView={activeView} onChange={setActiveView} />
    </ColumnFlexContainer>
  );
};
