import React from 'react';
import { LayoutDashboard, Search, ShoppingCart } from 'lucide-react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { colorPalette } from '@/theme/colors';

export type AdminView = 'dashboard' | 'search' | 'cart';

type AdminBottomNavigationProps = {
  activeView: AdminView;
  onChange: (view: AdminView) => void;
};

export const AdminBottomNavigation = ({
  activeView,
  onChange,
}: AdminBottomNavigationProps) => (
  <Paper
    elevation={0}
    sx={{
      position: 'fixed',
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 10,
      borderTop: `1px solid ${colorPalette.adminBorder}`,
      borderRadius: 0,
      bgcolor: colorPalette.adminSurface,
    }}
  >
    <BottomNavigation
      showLabels
      value={activeView}
      onChange={(_, value: AdminView) => onChange(value)}
      sx={{ height: 68, bgcolor: 'transparent' }}
    >
      <BottomNavigationAction
        label="Dashboard"
        value="dashboard"
        icon={<LayoutDashboard size={20} />}
        sx={{ '&.Mui-selected': { color: colorPalette.adminYellow } }}
      />
      <BottomNavigationAction
        label="Search Songs"
        value="search"
        icon={<Search size={20} />}
        sx={{ '&.Mui-selected': { color: colorPalette.adminYellow } }}
      />
      <BottomNavigationAction
        label="Cart"
        value="cart"
        icon={<ShoppingCart size={20} />}
        sx={{ '&.Mui-selected': { color: colorPalette.adminYellow } }}
      />
    </BottomNavigation>
  </Paper>
);
