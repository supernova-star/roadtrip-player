import React, { useState } from 'react';
import { ChevronRight, Clock3, Image, PlaySquare } from 'lucide-react';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { useTimeStore } from '@/store/timeStore';
import { useWallpaperStore } from '@/store/wallpaperStore';
import { wallpapers } from '@/constants/wallpapers';
import { percentToHex } from '@/utils/formatter';
import { useWallpaper } from '@/hooks/useWallpaper';
import { MobileWallpaperPage } from './MobileWallpaperPage';
import { MobileTimeSettingsPage } from './MobileTimeSettingsPage';
import { MobilePlayerSettingsPage } from './MobilePlayerSettingsPage';

export const MobileSettingsPage: React.FC = () => {
  const [isWallpaperViewOpen, setIsWallpaperViewOpen] = useState(false);
  const [isTimeViewOpen, setIsTimeViewOpen] = useState(false);
  const [isPlayerViewOpen, setIsPlayerViewOpen] = useState(false);
  const wallpaperId = useWallpaperStore((state) => state.wallpaperId);
  const timeFormat = useTimeStore((state) => state.timeFormat);
  const showAmPm = useTimeStore((state) => state.showAmPm);
  const activeWallpaper = wallpapers.find((wallpaper) => wallpaper.id === wallpaperId);
  const clockFormat = timeFormat === '12-hour' ? `12h${showAmPm ? ' • AM/PM' : ''}` : '24h';
  const { isLightMode } = useWallpaper();

  if (isWallpaperViewOpen) {
    return <MobileWallpaperPage onBack={() => setIsWallpaperViewOpen(false)} />;
  }

  if (isTimeViewOpen) {
    return <MobileTimeSettingsPage onBack={() => setIsTimeViewOpen(false)} />;
  }

  if (isPlayerViewOpen) {
    return <MobilePlayerSettingsPage onBack={() => setIsPlayerViewOpen(false)} />;
  }

  return (
    <ColumnFlexContainer
      gap={[6]}
      padding={[8, 5, 24]}
      width="100%"
      height="100vh"
      style={{
        backgroundColor: 'var(--surface-panel-strong)',
        backdropFilter: 'blur(24px)',
      }}
    >
      <Typography variant="h5" weight="bold" color="var(--player-text-primary)">
        Settings
      </Typography>

      <ColumnFlexContainer gap={[3]}>
        <Typography variant="body1" weight="semiBold" color="var(--player-text-secondary)">
          Appearance
        </Typography>

        <ColumnFlexContainer
          style={{
            overflow: 'hidden',
            borderRadius: '12px',
            backgroundColor: isLightMode ? 'var(--background-transparent)' : 'var(--surface-panel)',
            border: '1px solid var(--player-border)',
          }}
        >
          <SettingsRow
            icon={<Image size="25px" color="var(--player-accent)" />}
            title="Wallpaper"
            subtitle={activeWallpaper?.name ?? 'Road Trip'}
            onClick={() => setIsWallpaperViewOpen(true)}
          />
          <div style={{ height: '1px', backgroundColor: 'var(--player-border)', opacity: 0.65 }} />
          <SettingsRow
            icon={<Clock3 size="25px" color="var(--player-accent)" />}
            title="Clock & Time"
            subtitle={clockFormat}
            onClick={() => setIsTimeViewOpen(true)}
          />
        </ColumnFlexContainer>
      </ColumnFlexContainer>

      <ColumnFlexContainer gap={[3]}>
        <Typography variant="body1" weight="semiBold" color="var(--player-text-secondary)">
          Preferences
        </Typography>

        <ColumnFlexContainer
          style={{
            overflow: 'hidden',
            borderRadius: '12px',
            backgroundColor: isLightMode ? 'var(--background-transparent)' : 'var(--surface-panel)',
            border: '1px solid var(--player-border)',
          }}
        >
          <SettingsRow
            icon={<PlaySquare size="25px" color="var(--player-accent)" />}
            title="Player"
            subtitle="Player display and controls"
            onClick={() => setIsPlayerViewOpen(true)}
          />
        </ColumnFlexContainer>
      </ColumnFlexContainer>
    </ColumnFlexContainer>
  );
};

type SettingsRowProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick?: () => void;
};

const SettingsRow: React.FC<SettingsRowProps> = ({ icon, title, subtitle, onClick }) => {
  const { wallpaper: currentWallpaper } = useWallpaper();
  return (
    <RowFlexContainer
      alignItems="center"
      gap={[4]}
      padding={[4]}
      minHeight="74px"
      cursor={onClick ? 'pointer' : undefined}
      onClick={onClick}
    >
      <RowFlexContainer
        alignItems="center"
        justifyContent="center"
        width={[14]}
        height={[14]}
        borderRadius={[3]}
        style={{
          backgroundColor: percentToHex(currentWallpaper.theme.accent, 10),
          flexShrink: 0,
        }}
      >
        {icon}
      </RowFlexContainer>
      <ColumnFlexContainer gap={[1]} flex={1} minWidth={[0]}>
        <Typography variant="body1" weight="semiBold" color="var(--player-text-primary)">
          {title}
        </Typography>
        <Typography variant="body2" color="var(--player-text-secondary)">
          {subtitle}
        </Typography>
      </ColumnFlexContainer>
      <ChevronRight size="20px" color="var(--player-text-primary)" />
    </RowFlexContainer>
  );
};
