import React from 'react';
import { Info } from 'lucide-react';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { AdminAccessCard } from './AdminAccessCard';
import { percentToHex } from '@/utils/formatter';

type AppInfoCardProps = {
  accent: string;
  isLightMode: boolean;
  isAdmin: boolean;
  showAdminPasswordInput: boolean;
  adminPassword: string;
  onToggleAdmin: () => void;
  onPasswordChange: (value: string) => void;
};

export const AppInfoCard: React.FC<AppInfoCardProps> = ({
  accent,
  isLightMode,
  isAdmin,
  showAdminPasswordInput,
  adminPassword,
  onToggleAdmin,
  onPasswordChange,
}) => (
  <ColumnFlexContainer gap={[3]}>
    <Typography variant="body1" weight="semiBold" color="var(--player-text-secondary)">
      App
    </Typography>

    <ColumnFlexContainer
      gap={[3]}
      padding={[4]}
      style={{
        borderRadius: '12px',
        backgroundColor: isLightMode ? 'var(--background-transparent)' : 'var(--surface-panel)',
        border: '1px solid var(--player-border)',
      }}
    >
      <RowFlexContainer alignItems="center" gap={[3]}>
        <RowFlexContainer
          alignItems="center"
          justifyContent="center"
          width={[9]}
          height={[9]}
          borderRadius={[2]}
          style={{
            backgroundColor: percentToHex(accent, 12),
            flexShrink: 0,
          }}
        >
          <Info size="18px" color="var(--player-accent)" />
        </RowFlexContainer>
        <Typography variant="body1" weight="semiBold" color="var(--player-text-primary)}">
          About Casette
        </Typography>
      </RowFlexContainer>

      <Typography variant="body2" color="var(--player-text-secondary)" sx={{ lineHeight: 1.55 }}>
        A minimal player for roadtrip music, favorite songs, and the playlists you keep coming back
        to.
      </Typography>

      {isAdmin && (
        <AdminAccessCard
          accent={accent}
          isOpen={showAdminPasswordInput}
          password={adminPassword}
          onToggle={onToggleAdmin}
          onPasswordChange={onPasswordChange}
        />
      )}
    </ColumnFlexContainer>
  </ColumnFlexContainer>
);
