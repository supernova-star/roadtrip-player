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
import { useDisplayPreferencesStore } from '@/store/displayPreferencesStore';
import { usePlayerPreferencesStore } from '@/store/playerPreferencesStore';
import { useFavoritesStore } from '@/store/favoritesStore';
import { NowPlayingPage } from '@/components/nowPlaying/NowPlaying';
import { CLOCK_DATE_FORMATS } from '@/constants';
import { formatClockTime } from '@/utils/formatter';

const ClockDisplay: React.FC = () => {
  const { isMobile } = useResponsive();
  const timeSettings = useTimeStore();
  const showClockCard = useDisplayPreferencesStore((state) => state.showClockCard);
  const showClockDate = useDisplayPreferencesStore((state) => state.showClockDate);
  const clockDateFormat = useDisplayPreferencesStore((state) => state.clockDateFormat);
  const [clockDate, setClockDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setClockDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const digitalTimeText = (() => {
    return formatClockTime(clockDate, timeSettings);
  })();
  const dateText = format(clockDate, CLOCK_DATE_FORMATS[clockDateFormat]);

  const clockSizeVariant = useMemo(() => {
    if (isMobile) {
      return timeSettings.clockSize === 'large'
        ? 'h4'
        : timeSettings.clockSize === 'medium'
          ? 'h5'
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
        ? 0.56
        : timeSettings.clockSize === 'medium'
          ? 0.46
          : 0.36;
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

  if (!showClockCard) {
    return null;
  }

  return (
    <RowFlexContainer
      justifyContent={clockJustify}
      alignItems="center"
      width="100%"
      margin={isMobile ? [4, 0] : [8, 0]}
    >
      <ColumnFlexContainer
        alignItems="center"
        gap={showClockDate ? [2] : [0]}
        padding={isMobile ? [3, 5] : [5, 8]}
        borderRadius={isMobile ? [5] : [8]}
        style={{
          minWidth: isMobile ? 'min(100%, 240px)' : 'min(100%, 360px)',
          border: '1px solid var(--player-border)',
          background: 'var(--header-glass-background)',
          backdropFilter: 'blur(18px) saturate(1.08)',
          boxShadow: 'var(--header-glass-shadow)',
        }}
      >
        {showClockDate && (
          <Typography
            variant="caption"
            weight="semiBold"
            color="var(--player-text-secondary)"
            textAlign="center"
            sx={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}
          >
            {dateText}
          </Typography>
        )}
        {timeSettings.showAnalogClock ? (
          <AnalogClock
            value={clockDate}
            scale={analogClockScale}
            showSeconds={timeSettings.showSeconds}
          />
        ) : (
          <Typography
            variant={clockSizeVariant}
            weight="bold"
            color="var(--player-text-primary)"
            textAlign="center"
            sx={{ fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}
          >
            {digitalTimeText}
          </Typography>
        )}
      </ColumnFlexContainer>
    </RowFlexContainer>
  );
};

export const Home: React.FC = () => {
  useAudioPlayer();
  const { isMobile } = useResponsive();
  const homeOverlayIntensity = useDisplayPreferencesStore((state) => state.homeOverlayIntensity);
  const otherPagesOverlayIntensity = useDisplayPreferencesStore(
    (state) => state.otherPagesOverlayIntensity
  );
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPopoverItem, setSelectedPopoverItem] = useState<ViewType | null>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerView, setDrawerView] = useState<'playlist' | 'nowPlaying'>('playlist');
  const [showBackToNowPlaying, setShowBackToNowPlaying] = useState(false);
  const [activeNavTab, setActiveNavTab] = useState<MobileNavItem>('home');
  const currentPlaylistId = usePlayerStore((state) => state.currentPlaylistId);
  const showMiniPlayer = usePlayerPreferencesStore((state) => state.showMiniPlayer);
  const showQueueShortcut = usePlayerPreferencesStore((state) => state.showQueueShortcut);
  const showProgressBar = usePlayerPreferencesStore((state) => state.showProgressBar);
  const favoriteSongCount = useFavoritesStore((state) => state.favoriteSongIds.length);

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

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--page-overlay',
      `var(--${activeNavTab === 'home' ? 'home-page' : 'other-pages'}-overlay)`
    );
  }, [activeNavTab, homeOverlayIntensity, otherPagesOverlayIntensity]);

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
        <Header
          handleClick={handleClick}
          activePlaylist={activePlaylist}
          isFavorites={currentPlaylistId === 'favorites'}
          favoriteSongCount={favoriteSongCount}
        />
        <ClockDisplay />
      </Container>
      <ColumnFlexContainer
        position="fixed"
        bottom="0px"
        left="0px"
        right="0px"
        width="100%"
        padding={isMobile ? [0, 0, 0] : [0, 0, 6]}
        alignItems="center"
        justifyContent="center"
      >
        {(!isMobile || showMiniPlayer) && (
          <Player
            openPlaylistDrawer={() => {
              setDrawerView('playlist');
              setShowBackToNowPlaying(false);
              setOpenDrawer(true);
            }}
            openNowPlaying={() => {
              setDrawerView('nowPlaying');
              setShowBackToNowPlaying(false);
              setOpenDrawer(true);
            }}
            showQueueShortcut={!isMobile || showQueueShortcut}
            showProgressBar={!isMobile || showProgressBar}
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
        anchor="bottom"
        height="100dvh"
        width="100%"
        showCloseButton={false}
        onClose={() => setOpenDrawer(false)}
      >
        {drawerView === 'playlist' ? (
          <PlaylistDrawer
            currentPlaylistId={currentPlaylistId}
            onBack={() => setDrawerView('nowPlaying')}
            onClose={() => setOpenDrawer(false)}
            showBackToNowPlaying={showBackToNowPlaying}
          />
        ) : (
          <NowPlayingPage
            onBack={() => setOpenDrawer(false)}
            onQueue={() => {
              setShowBackToNowPlaying(true);
              setDrawerView('playlist');
            }}
          />
        )}
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
