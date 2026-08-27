import React from 'react';
import {
  ChevronRight,
  Clock3,
  Image,
  Layers,
  PanelTop,
  PlaySquare,
  SlidersHorizontal,
} from 'lucide-react';
import {
  ColumnFlexContainer,
  Container,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { useTimeStore } from '@/store/timeStore';
import { useWallpaperStore } from '@/store/wallpaperStore';
import { wallpapers } from '@/constants/wallpapers';
import { percentToHex } from '@/utils/formatter';
import { useMobileHistoryView } from '@/hooks/useMobileHistoryView';
import { useMobilePageSurface } from '@/hooks/useMobilePageSurface';
import { useWallpaper } from '@/hooks/useWallpaper';
import { MobileWallpaperPage } from './mobileWallpaper/MobileWallpaperPage';
import { MobileTimeSettingsPage } from './mobileTime/MobileTimeSettingsPage';
import { MobilePlayerSettingsPage } from './MobilePlayerSettingsPage';
import { MobileDisplaySettingsPage } from './MobileDisplaySettingsPage';
import { MobileHeaderSettingsPage } from './MobileHeaderSettingsPage';
import { MobileOtherScreenSettingsPage } from './MobileOtherScreenSettingsPage';

type MobileSettingsView =
  'wallpaper' | 'time' | 'player' | 'display' | 'header' | 'otherScreen';

export const MobileSettingsPage: React.FC = () => {
  const { activeView, openView, closeView } =
    useMobileHistoryView<MobileSettingsView>('mobileSettingsView');
  const wallpaperId = useWallpaperStore((state) => state.wallpaperId);
  const timeFormat = useTimeStore((state) => state.timeFormat);
  const showAmPm = useTimeStore((state) => state.showAmPm);
  const activeWallpaper = wallpapers.find(
    (wallpaper) => wallpaper.id === wallpaperId,
  );
  const clockFormat =
    timeFormat === '12-hour' ? `12h${showAmPm ? ' • AM/PM' : ''}` : '24h';
  const { isLightMode } = useWallpaper();
  const mobilePageSurface = useMobilePageSurface();

  if (activeView === 'wallpaper') {
    return <MobileWallpaperPage onBack={closeView} />;
  }

  if (activeView === 'time') {
    return <MobileTimeSettingsPage onBack={closeView} />;
  }

  if (activeView === 'player') {
    return <MobilePlayerSettingsPage onBack={closeView} />;
  }

  if (activeView === 'display') {
    return <MobileDisplaySettingsPage onBack={closeView} />;
  }

  if (activeView === 'header') {
    return <MobileHeaderSettingsPage onBack={closeView} />;
  }

  if (activeView === 'otherScreen') {
    return <MobileOtherScreenSettingsPage onBack={closeView} />;
  }

  return (
    <ColumnFlexContainer
      gap={[6]}
      width="100%"
      height="100vh"
      style={mobilePageSurface}
      sx={{
        padding: '32px 20px 72px',
      }}
    >
      <Typography variant="h5" weight="bold" color="var(--player-text-primary)">
        Settings
      </Typography>
      <ColumnFlexContainer
        gap={[6]}
        flex={1}
        overflow="auto"
        hideScrollbar
        padding={[0, 0, 4]}
      >
        <ColumnFlexContainer gap={[3]}>
          <Typography
            variant="body1"
            weight="semiBold"
            color="var(--player-text-secondary)"
          >
            Appearance
          </Typography>

          <ColumnFlexContainer
            style={{
              overflow: 'hidden',
              borderRadius: '12px',
              backgroundColor: isLightMode
                ? 'var(--background-transparent)'
                : 'var(--surface-panel)',
              border: '1px solid var(--player-border)',
            }}
          >
            <SettingsRow
              icon={<Image size="25px" color="var(--player-accent)" />}
              title="Wallpaper"
              subtitle={activeWallpaper?.name ?? 'Road Trip'}
              onClick={() => openView('wallpaper')}
            />
            <Container
              height="1px"
              backgroundColor="var(--player-border)"
              opacity={0.65}
            />
            <SettingsRow
              icon={<Clock3 size="25px" color="var(--player-accent)" />}
              title="Clock & Time"
              subtitle={clockFormat}
              onClick={() => openView('time')}
            />
            <Container
              height="1px"
              backgroundColor="var(--player-border)"
              opacity={0.65}
            />
            <SettingsRow
              icon={
                <SlidersHorizontal size="25px" color="var(--player-accent)" />
              }
              title="Display"
              subtitle="Home background, blur and overlay"
              onClick={() => openView('display')}
            />
            <Container
              height="1px"
              backgroundColor="var(--player-border)"
              opacity={0.65}
            />
            <SettingsRow
              icon={<Layers size="25px" color="var(--player-accent)" />}
              title="Other Screen Settings"
              subtitle="Overlay for every screen except Home"
              onClick={() => openView('otherScreen')}
            />
          </ColumnFlexContainer>
        </ColumnFlexContainer>

        <ColumnFlexContainer gap={[3]}>
          <Typography
            variant="body1"
            weight="semiBold"
            color="var(--player-text-secondary)"
          >
            Preferences
          </Typography>

          <ColumnFlexContainer
            style={{
              overflow: 'hidden',
              borderRadius: '12px',
              backgroundColor: isLightMode
                ? 'var(--background-transparent)'
                : 'var(--surface-panel)',
              border: '1px solid var(--player-border)',
            }}
          >
            <SettingsRow
              icon={<PlaySquare size="25px" color="var(--player-accent)" />}
              title="Player"
              subtitle="Player display and controls"
              onClick={() => openView('player')}
            />
            <Container
              height="1px"
              backgroundColor="var(--player-border)"
              opacity={0.65}
            />
            <SettingsRow
              icon={<PanelTop size="25px" color="var(--player-accent)" />}
              title="Header"
              subtitle="Header visibility and content"
              onClick={() => openView('header')}
            />
          </ColumnFlexContainer>
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

const SettingsRow: React.FC<SettingsRowProps> = ({
  icon,
  title,
  subtitle,
  onClick,
}) => {
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
        <Typography
          variant="body1"
          weight="semiBold"
          color="var(--player-text-primary)"
        >
          {title}
        </Typography>
        <Typography variant="body2" color="var(--player-text-secondary)">
          {subtitle}
        </Typography>
      </ColumnFlexContainer>
      {onClick && (
        <ChevronRight size="20px" color="var(--player-text-primary)" />
      )}
    </RowFlexContainer>
  );
};
