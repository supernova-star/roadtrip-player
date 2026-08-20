import React, { useState } from 'react';
import { ListMusic, Play, Pause, ChevronRight, Heart } from 'lucide-react';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { playlists } from '@/constants/playlists';
import { songs } from '@/constants/songs';
import { usePlayerStore } from '@/store/playerStore';
import { useFavoritesStore } from '@/store/favoritesStore';
import { MobilePlaylistDetailPage } from './MobilePlaylistDetailPage';
import { useWallpaper } from '@/hooks/useWallpaper';

export const MobilePlaylistPage: React.FC = () => {
  const currentPlaylistId = usePlayerStore((state) => state.currentPlaylistId);
  const setCurrentPlaylistId = usePlayerStore((state) => state.setCurrentPlaylistId);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const setQueue = usePlayerStore((state) => state.setQueue);
  const playSong = usePlayerStore((state) => state.playSong);
  const pause = usePlayerStore((state) => state.pause);
  const favoriteSongCount = useFavoritesStore((state) => state.favoriteSongIds.length);
  const { isLightMode } = useWallpaper();
  const selectedRowBackground = isLightMode
    ? 'var(--background-dark-transparent)'
    : 'var(--surface-selected)';
  const [openPlaylistId, setOpenPlaylistId] = useState<string | null>(null);

  if (openPlaylistId === 'favorites') {
    return <MobilePlaylistDetailPage isFavorites onBack={() => setOpenPlaylistId(null)} />;
  }

  if (openPlaylistId) {
    return (
      <MobilePlaylistDetailPage
        playlistId={openPlaylistId}
        onBack={() => setOpenPlaylistId(null)}
      />
    );
  }

  return (
    <ColumnFlexContainer
      gap={[4]}
      padding={[8, 5, 32]}
      width="100%"
      height="100vh"
      style={{
        backgroundColor: 'var(--surface-panel-strong)',
        backdropFilter: 'blur(24px)',
      }}
    >
      <Typography
        variant="h5"
        weight="bold"
        color="var(--player-text-primary)"
        sx={{ flexShrink: 0 }}
      >
        Playlists
      </Typography>
      <RowFlexContainer
        alignItems="center"
        justifyContent="between"
        gap={[3]}
        padding={[3]}
        borderRadius={[3]}
        cursor="pointer"
      >
        <RowFlexContainer alignItems="center" gap={[3]} flex={1} minWidth={[0]}>
          <RowFlexContainer
            alignItems="center"
            justifyContent="center"
            width={[14]}
            height={[14]}
            borderRadius={[3]}
            style={{
              backgroundColor: 'var(--background-dark-transparent)',
              border: '1px solid var(--player-border)',
              flexShrink: 0,
            }}
          >
            <Heart size="22px" color="var(--player-accent)" fill="var(--player-accent)" />
          </RowFlexContainer>
          <ColumnFlexContainer gap={[1]} minWidth={[0]}>
            <Typography variant="body1" weight="semiBold" color="var(--player-text-primary)">
              Favorites
            </Typography>
            <Typography variant="caption" color="var(--player-text-secondary)">
              {favoriteSongCount} songs
            </Typography>
          </ColumnFlexContainer>
        </RowFlexContainer>

        <RowFlexContainer
          alignItems="center"
          justifyContent="center"
          width={[10]}
          height={[10]}
          cursor="pointer"
          onClick={() => setOpenPlaylistId('favorites')}
        >
          <ChevronRight
            size="18px"
            color="var(--player-text-secondary)"
            onClick={() => setOpenPlaylistId('favorites')}
          />
        </RowFlexContainer>
      </RowFlexContainer>
      <Typography
        variant="body2"
        weight="semiBold"
        color="var(--player-text-primary)"
        sx={{ flexShrink: 0 }}
      >
        All Playlists ({playlists.length})
      </Typography>
      <ColumnFlexContainer gap={[1]} flex={1} minHeight="0px" overflow="auto" hideScrollbar>
        {playlists.map((playlist) => {
          const isActive = playlist.id === currentPlaylistId;
          const isPlaylistPlaying = isActive && isPlaying;

          const handlePlayClick = (event: React.MouseEvent) => {
            event.stopPropagation();
            if (isPlaylistPlaying) {
              pause();
              return;
            }
            const songDetails = playlist.songIds
              .map((songId) => songs.find((song) => song.id === songId))
              .filter((song): song is (typeof songs)[number] => Boolean(song));
            if (songDetails.length === 0) return;
            setCurrentPlaylistId(playlist.id);
            setQueue(songDetails);
            playSong(songDetails[0]);
          };

          return (
            <RowFlexContainer
              key={playlist.id}
              alignItems="center"
              justifyContent="between"
              gap={[3]}
              padding={[3]}
              borderRadius={[3]}
              cursor="pointer"
              backgroundColor={isActive ? selectedRowBackground : 'transparent'}
              onClick={() => setCurrentPlaylistId(playlist.id)}
            >
              <RowFlexContainer alignItems="center" gap={[3]} flex={1} minWidth={[0]}>
                <RowFlexContainer
                  alignItems="center"
                  justifyContent="center"
                  width={[14]}
                  height={[14]}
                  borderRadius={[3]}
                  style={{
                    backgroundColor: 'var(--background-dark-transparent)',
                    border: '1px solid var(--player-border)',
                    flexShrink: 0,
                  }}
                >
                  <ListMusic size="22px" color="var(--player-accent)" />
                </RowFlexContainer>
                <ColumnFlexContainer gap={[1]} minWidth={[0]}>
                  <Typography
                    variant="body1"
                    weight="semiBold"
                    color="var(--player-text-primary)"
                    sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                  >
                    {playlist.title}
                  </Typography>
                  <Typography variant="caption" color="var(--player-text-secondary)">
                    {playlist.songIds.length} songs
                  </Typography>
                </ColumnFlexContainer>
              </RowFlexContainer>

              <RowFlexContainer alignItems="center" gap={[3]}>
                <RowFlexContainer
                  alignItems="center"
                  justifyContent="center"
                  width={[10]}
                  height={[10]}
                  cursor="pointer"
                  style={{
                    borderRadius: '999px',
                    backgroundColor: isActive
                      ? 'var(--player-accent)'
                      : 'var(--background-dark-transparent)',
                    flexShrink: 0,
                  }}
                  onClick={handlePlayClick}
                >
                  {isPlaylistPlaying ? (
                    <Pause
                      size="14px"
                      color="var(--player-background)"
                      fill="var(--player-background)"
                    />
                  ) : (
                    <Play
                      size="14px"
                      color={isActive ? 'var(--player-background)' : 'var(--player-text-primary)'}
                      fill={isActive ? 'var(--player-background)' : 'none'}
                    />
                  )}
                </RowFlexContainer>
                <RowFlexContainer
                  alignItems="center"
                  justifyContent="center"
                  width={[10]}
                  height={[10]}
                  cursor="pointer"
                  onClick={(event) => {
                    event.stopPropagation();
                    setOpenPlaylistId(playlist.id);
                  }}
                >
                  <ChevronRight size="18px" color="var(--player-text-secondary)" />
                </RowFlexContainer>
              </RowFlexContainer>
            </RowFlexContainer>
          );
        })}
      </ColumnFlexContainer>
    </ColumnFlexContainer>
  );
};
