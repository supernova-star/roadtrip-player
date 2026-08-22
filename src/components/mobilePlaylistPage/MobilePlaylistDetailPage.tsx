import React, { useMemo } from 'react';
import { ChevronLeft, ListMusic, Play, Pause, Heart, BarChart2 } from 'lucide-react';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { playlists } from '@/constants/playlists';
import { songs } from '@/constants/songs';
import { usePlayerStore } from '@/store/playerStore';
import { useFavoritesStore } from '@/store/favoritesStore';
import { formatTime, formatTotalDuration } from '@/utils/formatter';
import { useMobilePageSurface } from '@/hooks/useMobilePageSurface';
import { useWallpaper } from '@/hooks/useWallpaper';

type MobilePlaylistDetailPageProps = {
  playlistId?: string;
  isFavorites?: boolean;
  onBack: () => void;
};

export const MobilePlaylistDetailPage: React.FC<MobilePlaylistDetailPageProps> = ({
  playlistId,
  isFavorites = false,
  onBack,
}) => {
  const currentSong = usePlayerStore((state) => state.currentSong);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const setQueue = usePlayerStore((state) => state.setQueue);
  const playSong = usePlayerStore((state) => state.playSong);
  const togglePlay = usePlayerStore((state) => state.togglePlay);
  const pause = usePlayerStore((state) => state.pause);
  const setCurrentPlaylistId = usePlayerStore((state) => state.setCurrentPlaylistId);
  const favoriteSongIds = useFavoritesStore((state) => state.favoriteSongIds);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const { isLightMode } = useWallpaper();
  const mobilePageSurface = useMobilePageSurface();
  const selectedRowBackground = isLightMode
    ? 'var(--background-dark-transparent)'
    : 'var(--surface-selected)';

  const playlist = isFavorites ? null : playlists.find((item) => item.id === playlistId);

  const songDetails = useMemo(
    () =>
      (isFavorites ? favoriteSongIds : (playlist?.songIds ?? []))
        .map((songId) => songs.find((song) => song.id === songId))
        .filter((song): song is (typeof songs)[number] => Boolean(song)),
    [isFavorites, favoriteSongIds, playlist?.songIds]
  );

  const totalDuration = useMemo(
    () => formatTotalDuration(songDetails.reduce((acc, song) => acc + (song.duration || 0), 0)),
    [songDetails]
  );

  const handleSelectSong = (songId: string) => {
    const selectedSong = songDetails.find((song) => song.id === songId);
    if (!selectedSong) return;

    if (currentSong?.id === selectedSong.id) {
      togglePlay();
      return;
    }

    setCurrentPlaylistId(isFavorites ? 'favorites' : (playlistId ?? ''));
    setQueue(songDetails);
    playSong(selectedSong);
  };

  const handlePlayAll = () => {
    if (songDetails.length === 0) return;
    setCurrentPlaylistId(isFavorites ? 'favorites' : (playlistId ?? ''));
    setQueue(songDetails);
    playSong(songDetails[0]);
  };

  const isPlaylistPlaying =
    isPlaying && !!currentSong && songDetails.some((song) => song.id === currentSong.id);

  const handlePlayAllClick = () => {
    if (isPlaylistPlaying) {
      pause();
      return;
    }
    handlePlayAll();
  };

  const toggleLike = (event: React.MouseEvent, songId: string) => {
    event.stopPropagation();
    toggleFavorite(songId);
  };

  if (!isFavorites && !playlist) return null;

  const title = isFavorites ? 'Favorites' : playlist?.title;
  const description = isFavorites ? 'Songs you have liked.' : playlist?.description;

  return (
    <ColumnFlexContainer width="100%" height="100vh" padding={[0, 0, 32]} style={mobilePageSurface}>
      <ColumnFlexContainer gap={[4]} padding={[6, 5, 4]} style={{ flexShrink: 0 }}>
        <RowFlexContainer
          alignItems="center"
          justifyContent="center"
          width={[10]}
          height={[10]}
          cursor="pointer"
          style={{
            borderRadius: '999px',
            backgroundColor: 'var(--background-dark-transparent)',
            flexShrink: 0,
          }}
          onClick={onBack}
        >
          <ChevronLeft size="20px" color="var(--player-text-primary)" />
        </RowFlexContainer>

        <RowFlexContainer gap={[4]} alignItems="start">
          <RowFlexContainer
            alignItems="center"
            justifyContent="center"
            style={{
              width: '96px',
              height: '96px',
              borderRadius: '12px',
              flexShrink: 0,
              backgroundColor: 'var(--background-dark-transparent)',
              border: '1px solid var(--player-border)',
            }}
          >
            <ListMusic size="40px" color="var(--player-accent)" />
          </RowFlexContainer>
          <ColumnFlexContainer gap={[1]} minWidth={[0]}>
            <Typography variant="h6" weight="bold" color="var(--player-text-primary)">
              {title}
            </Typography>
            {description && (
              <Typography variant="caption" color="var(--player-text-secondary)">
                {description}
              </Typography>
            )}
            <Typography variant="caption" weight="semiBold" color="var(--player-text-secondary)">
              {songDetails.length} songs • {totalDuration}
            </Typography>
          </ColumnFlexContainer>
        </RowFlexContainer>

        <RowFlexContainer
          alignItems="center"
          justifyContent="center"
          gap={[2]}
          padding={[3]}
          cursor={songDetails.length === 0 ? 'notAllowed' : 'pointer'}
          width="100%"
          style={{
            borderRadius: '10px',
            backgroundColor: 'var(--surface-selected)',
            border: '1px solid var(--player-border)',
            opacity: songDetails.length === 0 ? 0.5 : 1,
          }}
          onClick={songDetails.length === 0 ? undefined : handlePlayAllClick}
        >
          {isPlaylistPlaying ? (
            <Pause size="16px" color="var(--player-accent)" fill="var(--player-accent)" />
          ) : (
            <Play size="16px" color="var(--player-accent)" fill="var(--player-accent)" />
          )}
          <Typography variant="body2" weight="semiBold" color="var(--player-accent)">
            {isPlaylistPlaying ? 'Pause' : 'Play All'}
          </Typography>
        </RowFlexContainer>
      </ColumnFlexContainer>

      <ColumnFlexContainer
        gap={[1]}
        flex={1}
        minHeight="0px"
        overflow="auto"
        hideScrollbar
        padding={[0, 5]}
      >
        {songDetails.length === 0 && (
          <ColumnFlexContainer
            alignItems="center"
            justifyContent="center"
            gap={[3]}
            flex={1}
            padding={[8, 5]}
          >
            <Heart size="40px" color="var(--player-text-secondary)" />
            <Typography variant="body1" weight="semiBold" color="var(--player-text-primary)">
              No favorites yet
            </Typography>
            <Typography variant="caption" color="var(--player-text-secondary)" textAlign="center">
              Tap the heart icon on any song to add it here.
            </Typography>
          </ColumnFlexContainer>
        )}
        {songDetails.map((song, index) => {
          const isCurrentSong = currentSong?.id === song.id;
          const isLiked = favoriteSongIds.includes(song.id);
          const isCurrentlyPlaying = isCurrentSong && isPlaying;

          return (
            <RowFlexContainer
              key={song.id}
              alignItems="center"
              justifyContent="between"
              gap={[3]}
              padding={[2, 2]}
              borderRadius={[3]}
              cursor="pointer"
              backgroundColor={isCurrentSong ? selectedRowBackground : 'transparent'}
              onClick={() => handleSelectSong(song.id)}
            >
              <RowFlexContainer alignItems="center" gap={[2]} flex={1} minWidth={[0]}>
                <RowFlexContainer
                  alignItems="center"
                  justifyContent="center"
                  width={[6]}
                  style={{ flexShrink: 0 }}
                >
                  {isCurrentlyPlaying ? (
                    <BarChart2 size="16px" color="var(--player-accent)" />
                  ) : (
                    <Typography variant="caption" color="var(--player-text-secondary)">
                      {index + 1}
                    </Typography>
                  )}
                </RowFlexContainer>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '6px',
                    flexShrink: 0,
                    backgroundImage: `url(${song.coverUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <ColumnFlexContainer gap={[1]} minWidth={[0]}>
                  <Typography
                    variant="body2"
                    weight="semiBold"
                    color="var(--player-text-primary)"
                    sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                  >
                    {song.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="var(--player-text-secondary)"
                    sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                  >
                    {song.artist}
                  </Typography>
                </ColumnFlexContainer>
              </RowFlexContainer>

              <RowFlexContainer alignItems="center" gap={[3]} style={{ flexShrink: 0 }}>
                <Typography
                  variant="caption"
                  weight="semiBold"
                  color="var(--player-text-secondary)"
                >
                  {formatTime(song.duration || 0)}
                </Typography>
                <Heart
                  size="18px"
                  color={isLiked ? '#ff375f' : 'var(--player-text-secondary)'}
                  fill={isLiked ? '#ff375f' : 'none'}
                  onClick={(event) => toggleLike(event, song.id)}
                />
              </RowFlexContainer>
            </RowFlexContainer>
          );
        })}
      </ColumnFlexContainer>
    </ColumnFlexContainer>
  );
};
