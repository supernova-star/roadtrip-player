import React, { FC, useCallback } from 'react';
import { useResponsive } from '@/hooks/useResponsive';
import { ColumnFlexContainer, RowFlexContainer } from '../uiComponents/container/Container';
import { Typography } from '../uiComponents/typography/Typography';
import { playlists } from '@/constants/playlists';
import { songs } from '@/constants/songs';
import { formatTime, percentToHex } from '@/utils/formatter';
import { ListMusic, Pause, Play, X } from 'lucide-react';
import { useWallpaper } from '@/hooks/useWallpaper';
import { usePlayerStore } from '@/store/playerStore';
import { useFavoritesStore } from '@/store/favoritesStore';
import { getSongsByIds } from '@/utils/music';
import { ChevronLeft } from 'lucide-react';

type PlaylistDrawerProps = {
  currentPlaylistId: string;
  onBack?: () => void;
  onClose?: () => void;
  showBackToNowPlaying?: boolean;
};

export const PlaylistDrawer: FC<PlaylistDrawerProps> = ({
  currentPlaylistId,
  onBack,
  onClose,
  showBackToNowPlaying = false,
}) => {
  const { isMobile } = useResponsive();

  const { isLightMode, wallpaper: currentWallpaper } = useWallpaper();
  const currentSong = usePlayerStore((state) => state.currentSong);
  const setQueue = usePlayerStore((state) => state.setQueue);
  const playSong = usePlayerStore((state) => state.playSong);
  const togglePlay = usePlayerStore((state) => state.togglePlay);
  const favoriteSongIds = useFavoritesStore((state) => state.favoriteSongIds);

  const playListDetails = playlists.find((playlist) => playlist.id === currentPlaylistId);

  const songIds =
    currentPlaylistId === 'favorites' ? favoriteSongIds : (playListDetails?.songIds ?? []);
  const songDetails = getSongsByIds(songIds, songs);

  const playlistTitle = currentPlaylistId === 'favorites' ? 'Favorites' : playListDetails?.title;

  const panelBackground = isLightMode
    ? percentToHex(currentWallpaper.theme.playerBackground, 80)
    : percentToHex(currentWallpaper.theme.playerBackground, 30);

  const selectedSongBackground = isLightMode
    ? 'var(--surface-panel-strong)'
    : 'var(--background-selected)';

  const handleSelectSong = (songId: string) => {
    const selectedSong = songDetails?.find((song) => song.id === songId);
    if (!selectedSong) return;

    if (currentSong?.id === selectedSong.id) {
      togglePlay();
      return;
    }

    setQueue(songDetails ?? []);
    playSong(selectedSong);
  };

  const isSongPlaying = useCallback(
    (songId: string) => {
      return currentSong?.id === songId && usePlayerStore.getState().isPlaying;
    },
    [currentSong]
  );

  return (
    <ColumnFlexContainer
      gap={[3]}
      position="relative"
      borderRadius={isMobile ? [3, 3, 0, 0] : [3, 0, 0, 3]}
      padding={isMobile ? [7, 5, 10] : [5, 4]}
      backgroundColor={panelBackground}
      height="100%"
      sx={{
        backgroundImage: isLightMode
          ? 'linear-gradient(145deg, rgba(255,255,255,0.18), transparent 42%)'
          : 'linear-gradient(145deg, rgba(255,255,255,0.08), transparent 42%)',
      }}
    >
      {!showBackToNowPlaying && (
        <RowFlexContainer
          width={[10]}
          height={[10]}
          alignItems="center"
          position="absolute"
          top="30px"
          right="20px"
          borderRadius={[10]}
          justifyContent="center"
          cursor="pointer"
          onClick={onClose}
          gap={[3]}
          backgroundColor={
            isLightMode ? 'var(--background-dark-transparent)' : 'var(--surface-panel)'
          }
        >
          <X size="24px" color="var(--player-text-primary)" cursor="pointer" />
        </RowFlexContainer>
      )}
      {showBackToNowPlaying && onBack && (
        <RowFlexContainer
          alignItems="center"
          gap={[2]}
          cursor="pointer"
          onClick={onBack}
          padding={[3]}
          borderRadius={[3]}
          style={{ alignSelf: 'flex-start' }}
          backgroundColor={
            isLightMode ? 'var(--background-dark-transparent)' : 'var(--surface-panel)'
          }
        >
          <ChevronLeft size="20px" color="var(--player-text-primary)" />
          <Typography variant="body2" weight="semiBold" color="var(--player-text-primary)">
            Now playing
          </Typography>
        </RowFlexContainer>
      )}
      <RowFlexContainer alignItems="center" gap={[3]}>
        <RowFlexContainer
          alignItems="center"
          justifyContent="center"
          width={[11]}
          height={[11]}
          borderRadius={[3]}
          style={{
            flexShrink: 0,
            backgroundColor: isLightMode
              ? 'rgba(255,255,255,0.56)'
              : 'var(--background-dark-transparent)',
            border: '1px solid var(--player-border)',
          }}
        >
          <ListMusic size="20px" color="var(--player-accent)" />
        </RowFlexContainer>
        <ColumnFlexContainer gap={[1]} flex={1} minWidth={[0]}>
          <Typography
            textStyle="uppercase"
            weight="bold"
            variant="caption"
            color="var(--player-accent)"
          >
            Now playing from
          </Typography>
          <Typography
            variant="h6"
            weight="semiBold"
            color="var(--player-text-primary)"
            sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {playlistTitle || 'Unknown Playlist'}
          </Typography>
          <Typography variant="caption" color="var(--player-text-secondary)">
            {songDetails.length} {songDetails.length === 1 ? 'song' : 'songs'}
          </Typography>
        </ColumnFlexContainer>
      </RowFlexContainer>

      <ColumnFlexContainer
        gap={[2]}
        flex={1}
        minHeight="0px"
        overflow="auto"
        padding={[1, 0, 3]}
        hideScrollbar
      >
        {songDetails.length > 0 ? (
          songDetails.map((song) => (
            <RowFlexContainer
              key={song.id}
              padding={isMobile ? [3, 3] : [3, 3]}
              borderRadius={[4]}
              justifyContent="between"
              alignItems="center"
              width="100%"
              minWidth={[0]}
              backgroundColor={currentSong?.id === song.id ? selectedSongBackground : 'transparent'}
              onClick={() => handleSelectSong(song.id)}
              cursor="pointer"
              sx={{
                minHeight: isMobile ? '72px' : '68px',
                transition: 'background-color 160ms ease, transform 160ms ease',
                '&:hover': {
                  backgroundColor:
                    currentSong?.id === song.id
                      ? selectedSongBackground
                      : 'var(--background-dark-transparent)',
                },
                '&:active': { transform: 'scale(0.99)' },
              }}
            >
              <RowFlexContainer gap={[3]} alignItems="center" flex={1} minWidth={[0]}>
                <div
                  style={{
                    width: isMobile ? '52px' : '48px',
                    minWidth: isMobile ? '52px' : '48px',
                    height: isMobile ? '52px' : '48px',
                    borderRadius: '8px',
                    backgroundImage: `url(${song?.coverUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.18)',
                  }}
                />
                <ColumnFlexContainer minWidth={[0]} flex={1} width="100%">
                  <Typography
                    variant="body1"
                    weight="semiBold"
                    color="var(--player-text-primary)"
                    sx={{
                      display: 'block',
                      width: '100%',
                      maxWidth: '100%',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {song.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    weight="semiBold"
                    color="var(--player-text-secondary)"
                    sx={{
                      display: 'block',
                      width: '100%',
                      maxWidth: '100%',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {song.artist}
                  </Typography>
                </ColumnFlexContainer>
              </RowFlexContainer>
              <RowFlexContainer
                gap={[3]}
                justifyContent="center"
                alignItems="center"
                style={{ flexShrink: 0 }}
              >
                <Typography
                  variant="caption"
                  weight="bold"
                  color="var(--player-text-secondary)"
                  sx={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  {formatTime(song.duration || 0)}
                </Typography>
                <RowFlexContainer
                  alignItems="center"
                  justifyContent="center"
                  width={[8]}
                  height={[8]}
                  borderRadius={[20]}
                  style={{
                    backgroundColor:
                      currentSong?.id === song.id
                        ? 'var(--player-accent)'
                        : 'var(--background-dark-transparent)',
                  }}
                >
                  {isSongPlaying(song.id) ? (
                    <Pause size="14px" color="var(--player-background)" />
                  ) : (
                    <Play size="14px" color="var(--player-accent)" />
                  )}
                </RowFlexContainer>
              </RowFlexContainer>
            </RowFlexContainer>
          ))
        ) : (
          <ColumnFlexContainer alignItems="center" justifyContent="center" padding={[8]} gap={[2]}>
            <ListMusic size="28px" color="var(--player-text-disabled)" />
            <Typography variant="body2" color="var(--player-text-secondary)">
              No songs in this playlist yet
            </Typography>
          </ColumnFlexContainer>
        )}
      </ColumnFlexContainer>
    </ColumnFlexContainer>
  );
};
