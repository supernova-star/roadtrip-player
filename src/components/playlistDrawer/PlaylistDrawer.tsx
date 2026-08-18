import React, { FC, useCallback } from 'react';
import { useResponsive } from '@/hooks/useResponsive';
import { ColumnFlexContainer, RowFlexContainer } from '../uiComponents/container/Container';
import { Typography } from '../uiComponents/typography/Typography';
import { playlists } from '@/constants/playlists';
import { songs } from '@/constants/songs';
import { formatTime, percentToHex } from '@/utils/formatter';
import { Pause, Play } from 'lucide-react';
import { useWallpaper } from '@/hooks/useWallpaper';
import { usePlayerStore } from '@/store/playerStore';

type PlaylistDrawerProps = {
  currentPlaylistId: string;
};

export const PlaylistDrawer: FC<PlaylistDrawerProps> = ({ currentPlaylistId }) => {
  const { isMobile } = useResponsive();

  const { isLightMode, wallpaper: currentWallpaper } = useWallpaper();
  const currentSong = usePlayerStore((state) => state.currentSong);
  const setQueue = usePlayerStore((state) => state.setQueue);
  const playSong = usePlayerStore((state) => state.playSong);
  const togglePlay = usePlayerStore((state) => state.togglePlay);

  const playListDetails = playlists.find((playlist) => playlist.id === currentPlaylistId);

  const songDetails = playListDetails?.songIds
    .map((songId) => songs.find((song) => song.id === songId))
    .filter((song): song is (typeof songs)[number] => Boolean(song));

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
      gap={[2]}
      borderRadius={isMobile ? [3, 3, 0, 0] : [3, 0, 0, 3]}
      padding={[3]}
      backgroundColor={panelBackground}
      height="100%"
    >
      <ColumnFlexContainer gap={[1]}>
        <Typography
          textStyle="uppercase"
          weight="bold"
          variant="caption"
          color="var(--player-accent)"
        >
          Playlist songs
        </Typography>
        <Typography variant="h6" weight="semiBold" color="var(--player-text-primary)">
          {playListDetails?.title || 'Unknown Playlist'} ({songDetails?.length || 0} songs)
        </Typography>
      </ColumnFlexContainer>

      <ColumnFlexContainer
        gap={[1]}
        maxHeight={isMobile ? '510px' : '90vh'}
        overflow="auto"
        padding={[1, 0, 2]}
        hideScrollbar
      >
        {songDetails &&
          songDetails.map((song) => (
            <RowFlexContainer
              key={song?.id}
              padding={[2, 3]}
              borderRadius={[3]}
              justifyContent="between"
              alignItems="center"
              backgroundColor={currentSong?.id === song.id ? selectedSongBackground : 'transparent'}
              onClick={() => handleSelectSong(song.id)}
            >
              <RowFlexContainer gap={[3]} alignItems="center">
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '5px',
                    backgroundImage: `url(${song?.coverUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <ColumnFlexContainer>
                  <Typography variant="body1" weight="semiBold" color="var(--player-text-primary)">
                    {song.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    weight="semiBold"
                    color="var(--player-text-secondary)"
                  >
                    {song.artist}
                  </Typography>
                </ColumnFlexContainer>
              </RowFlexContainer>
              <RowFlexContainer gap={[3]} justifyContent="center" alignItems="center">
                <Typography variant="caption" weight="bold" color="var(--player-text-secondary)">
                  {formatTime(song.duration || 0)}
                </Typography>
                {isSongPlaying(song.id) && <Pause size="20px" color="var(--player-accent)" />}
                {!isSongPlaying(song.id) && <Play size="20px" color="var(--player-accent)" />}
              </RowFlexContainer>
            </RowFlexContainer>
          ))}
      </ColumnFlexContainer>
    </ColumnFlexContainer>
  );
};
