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
      minHeight="100%"
      flex={1}
      backgroundColor="adminBackground"
      sx={{ color: 'adminDarkBrown' }}
    >
      <ColumnFlexContainer
        maxWidth="760px"
        minHeight="100vh"
        flex={1}
        backgroundColor="adminSurface"
        sx={{ mx: 'auto' }}
      >
        <AdminHeader onGoHome={onGoHome} />
        <ColumnFlexContainer
          padding={[5, 5, 22]}
          flex={1}
          data-testid="admin-shell-content"
          sx={{ pb: 12, '@media (min-width: 600px)': { px: 4 } }}
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
