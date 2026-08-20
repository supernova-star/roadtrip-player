import React, { useEffect, useMemo, useState } from 'react';
import { songs } from '../../constants/songs';
import { playlists } from '../../constants/playlists';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import { usePlayerStore } from '../../store/playerStore';
import { Player } from '../../components/player/Player';
import {
  ColumnFlexContainer,
  Container,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { useResponsive } from '@/hooks/useResponsive';
import Popover from '@/components/uiComponents/popover/Popover';
import { SettingsPopover } from '@/components/settingsPopover/SettingsPopover';
import { Modal } from '@/components/uiComponents/modal/Modal';
import { WallpaperModal, ViewType } from '@/components/wallpaperModal/WallpaperModal';
import { TimeModal } from '@/components/timeModal/TimeModal';
import { useTimeStore } from '@/store/timeStore';
import { AnalogClock } from '@/components/uiComponents/analogClock/AnalogClock';
import { format } from 'date-fns';
import { PlaylistModal } from '@/components/playlistModal/PlaylistModal';
import { Header } from '@/components/header/Header';
import { Drawer } from '@/components/uiComponents/drawer/Drawer';
import { PlaylistDrawer } from '@/components/playlistDrawer/PlaylistDrawer';
import { MobileNav, MobileNavItem } from '@/components/mobileNav/MobileNav';
import { MobilePlaylistPage } from '@/components/mobilePlaylistPage/MobilePlaylistPage';
import { MobileSettingsPage } from '@/components/mobileSettingsPage/MobileSettingsPage';
import { MobileProfilePage } from '@/components/mobileProfilePage/MobileProfilePage';
import { usePlayerPreferencesStore } from '@/store/playerPreferencesStore';

const ClockDisplay: React.FC = () => {
  const { isMobile } = useResponsive();
  const timeSettings = useTimeStore();
  const [clockDate, setClockDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setClockDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const digitalTimeText = (() => {
    const hourFormat = timeSettings.timeFormat === '12-hour' ? 'hh' : 'HH';
    const seconds = timeSettings.showSeconds ? ':ss' : '';
    const ampm = timeSettings.timeFormat === '12-hour' && timeSettings.showAmPm ? ' aa' : '';
    return format(clockDate, `${hourFormat}:mm${seconds}${ampm}`);
  })();

  const clockSizeVariant = useMemo(() => {
    if (isMobile) {
      return timeSettings.clockSize === 'large'
        ? 'h2'
        : timeSettings.clockSize === 'medium'
          ? 'h4'
          : 'body1';
    }
    return timeSettings.clockSize === 'large'
      ? 'h1'
      : timeSettings.clockSize === 'medium'
        ? 'h3'
        : 'h6';
  }, [isMobile, timeSettings.clockSize]);

  const analogClockScale = useMemo(() => {
    if (isMobile) {
      return timeSettings.clockSize === 'large'
        ? 0.75
        : timeSettings.clockSize === 'medium'
          ? 0.6
          : 0.5;
    }
    return timeSettings.clockSize === 'large'
      ? 1
      : timeSettings.clockSize === 'medium'
        ? 0.75
        : 0.6;
  }, [isMobile, timeSettings.clockSize]);

  const clockJustify =
    timeSettings.clockPosition === 'left'
      ? 'start'
      : timeSettings.clockPosition === 'right'
        ? 'end'
        : 'center';

  return (
    <Container>
      {timeSettings.showAnalogClock ? (
        <RowFlexContainer
          justifyContent={clockJustify}
          alignItems="center"
          width="100%"
          margin={isMobile ? [0] : [4, 0]}
        >
          <AnalogClock
            value={clockDate}
            scale={analogClockScale}
            showSeconds={timeSettings.showSeconds}
          />
        </RowFlexContainer>
      ) : (
        <RowFlexContainer
          justifyContent={clockJustify}
          alignItems="center"
          width="100%"
          margin={isMobile ? [4, 0] : [12, 0]}
        >
          <Typography
            variant={clockSizeVariant}
            color="var(--player-text-primary)"
            sx={{ fontVariantNumeric: 'tabular-nums' }}
          >
            {digitalTimeText}
          </Typography>
        </RowFlexContainer>
      )}
    </Container>
  );
};

export const Home: React.FC = () => {
  useAudioPlayer();
  const { isMobile } = useResponsive();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPopoverItem, setSelectedPopoverItem] = useState<ViewType | null>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [activeNavTab, setActiveNavTab] = useState<MobileNavItem>('home');
  const currentPlaylistId = usePlayerStore((state) => state.currentPlaylistId);
  const showMiniPlayer = usePlayerPreferencesStore((state) => state.showMiniPlayer);
  const showQueueShortcut = usePlayerPreferencesStore((state) => state.showQueueShortcut);

  const activePlaylist = useMemo(
    () => playlists.find((p) => p.id === currentPlaylistId) ?? playlists[0],
    [currentPlaylistId]
  );
  const playlistSongs = useMemo(
    () => songs.filter((song) => activePlaylist.songIds.includes(song.id)),
    [activePlaylist.songIds]
  );

  const setQueue = usePlayerStore((state) => state.setQueue);

  useEffect(() => {
    setQueue(playlistSongs);
  }, [playlistSongs, setQueue]);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelectedMenuItem = (item: ViewType) => {
    setSelectedPopoverItem(item);
    setIsModalOpen(true);
  };

  const handleMobileNavChange = (item: MobileNavItem) => {
    setActiveNavTab(item);
  };

  if (isMobile && activeNavTab !== 'home') {
    const pageComponents: Record<Exclude<MobileNavItem, 'home'>, React.ReactNode> = {
      library: <MobilePlaylistPage />,
      settings: <MobileSettingsPage />,
      profile: <MobileProfilePage />,
    };

    return (
      <Container minHeight="100vh">
        {pageComponents[activeNavTab]}
        <ColumnFlexContainer
          position="fixed"
          bottom="0px"
          left="0px"
          right="0px"
          width="100%"
          alignItems="center"
          justifyContent="center"
        >
          <MobileNav active={activeNavTab} onChange={handleMobileNavChange} />
        </ColumnFlexContainer>
      </Container>
    );
  }

  return (
    <Container minHeight="100vh" padding={isMobile ? [12, 6] : [12, 20]}>
      <Container>
        <Header handleClick={handleClick} activePlaylist={activePlaylist} />
        <ClockDisplay />
      </Container>
      <ColumnFlexContainer
        position="fixed"
        bottom="0px"
        left="0px"
        right="0px"
        width="100%"
        padding={isMobile ? [0, 0, 0] : [0, 0, 6]}
        // gap={[3]}
        alignItems="center"
        justifyContent="center"
      >
        {(!isMobile || showMiniPlayer) && (
          <Player
            openPlaylistDrawer={() => setOpenDrawer(true)}
            showQueueShortcut={!isMobile || showQueueShortcut}
          />
        )}
        {isMobile && <MobileNav active={activeNavTab} onChange={handleMobileNavChange} />}
      </ColumnFlexContainer>

      <Popover
        id="user-menu-popover"
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <SettingsPopover handleSelect={handleSelectedMenuItem} />
      </Popover>

      <Drawer
        open={openDrawer}
        anchor={isMobile ? 'bottom' : 'right'}
        height={isMobile ? '600px' : undefined}
        width={isMobile ? '100%' : '448px'}
        onClose={() => setOpenDrawer(false)}
      >
        <PlaylistDrawer currentPlaylistId={currentPlaylistId} />
      </Drawer>

      {selectedPopoverItem && (
        <Modal
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPopoverItem(null);
          }}
          aria-labelledby="user-menu-title"
          contentStyle={{ borderRadius: 12, background: '#1c1c1a' }}
        >
          {selectedPopoverItem === 'theme' && (
            <WallpaperModal onCancel={() => setIsModalOpen(false)} />
          )}

          {selectedPopoverItem === 'time' && <TimeModal onCancel={() => setIsModalOpen(false)} />}

          {selectedPopoverItem === 'playlist' && (
            <PlaylistModal onCancel={() => setIsModalOpen(false)} />
          )}
        </Modal>
      )}
    </Container>
  );
};
