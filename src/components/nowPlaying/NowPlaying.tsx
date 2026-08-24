import React from 'react';
import {
  ChevronDown,
  Heart,
  ListMusic,
  Pause,
  Play,
  SkipBack,
  SkipForward,
} from 'lucide-react';
import {
  ColumnFlexContainer,
  Container,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { useWallpaper } from '@/hooks/useWallpaper';
import { usePlayerStore } from '@/store/playerStore';
import { useFavoritesStore } from '@/store/favoritesStore';
import { playlists } from '@/constants/playlists';
import { formatTime } from '@/utils/formatter';
import { LoadingSpinner, ProgressBar } from '@/components/player/Player.styles';

export type NowPlayingPageProps = {
  onBack: () => void;
  onQueue: () => void;
};

export const NowPlayingPage: React.FC<NowPlayingPageProps> = ({
  onBack,
  onQueue,
}) => {
  const { wallpaper, wallpaperPosition, isLightMode } = useWallpaper();
  const currentSong = usePlayerStore((state) => state.currentSong);
  const currentPlaylistId = usePlayerStore((state) => state.currentPlaylistId);
  const currentTime = usePlayerStore((state) => state.currentTime);
  const duration = usePlayerStore((state) => state.duration);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const isBuffering = usePlayerStore((state) => state.isBuffering);
  const play = usePlayerStore((state) => state.play);
  const pause = usePlayerStore((state) => state.pause);
  const next = usePlayerStore((state) => state.next);
  const previous = usePlayerStore((state) => state.previous);
  const seek = usePlayerStore((state) => state.seek);
  const favoriteSongIds = useFavoritesStore((state) => state.favoriteSongIds);

  const playlist = playlists.find((item) => item.id === currentPlaylistId);
  const playlistTitle =
    currentPlaylistId === 'favorites' ? 'Favorites' : playlist?.title;
  const playlistSongCount =
    currentPlaylistId === 'favorites'
      ? favoriteSongIds.length
      : (playlist?.songIds.length ?? 0);
  const progress =
    duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

  return (
    <Container
      width="100%"
      minHeight="100dvh"
      height="100%"
      overflow="hidden"
      position="relative"
      sx={{
        color: 'var(--player-text-primary)',
        backgroundColor: 'var(--player-background)',
      }}
    >
      <Container
        position="absolute"
        top="0px"
        left="0px"
        right="0px"
        bottom="0px"
        sx={{
          backgroundImage: `url("${wallpaper.src}")`,
          backgroundSize: 'cover',
          backgroundPosition: `${wallpaperPosition.x}% ${wallpaperPosition.y}%`,
          filter: 'blur(18px)',
          transform: 'scale(1.08)',
        }}
      />
      <Container
        position="absolute"
        top="0px"
        left="0px"
        right="0px"
        bottom="0px"
        sx={{
          background: isLightMode
            ? 'linear-gradient(180deg, rgba(245,250,248,0.72), rgba(239,246,243,0.94))'
            : 'linear-gradient(180deg, rgba(13,10,24,0.56), rgba(8,12,22,0.96))',
          backdropFilter: 'blur(8px)',
        }}
      />

      <ColumnFlexContainer
        gap={[5]}
        padding={[5, 5, 6]}
        position="relative"
        minHeight="100dvh"
        width="100%"
        sx={{ maxWidth: '760px', margin: '0 auto' }}
      >
        <RowFlexContainer alignItems="center" justifyContent="between">
          <RowFlexContainer
            width={[5]}
            height={[5]}
            onClick={onBack}
            alignItems="center"
            gap={[1]}
            cursor="pointer"
          >
            <ChevronDown size="20px" color="var(--player-text-primary)" />
          </RowFlexContainer>
          <ColumnFlexContainer alignItems="center" gap={[1]}>
            <Typography
              variant="caption"
              weight="bold"
              color="var(--player-text-secondary)"
              sx={{ textTransform: 'uppercase', letterSpacing: '0.16em' }}
            >
              Now playing
            </Typography>
            <Typography variant="caption" color="var(--player-text-secondary)">
              {playlistTitle ?? 'Unknown playlist'} • {playlistSongCount} songs
            </Typography>
          </ColumnFlexContainer>

          <Container width="52px" />
        </RowFlexContainer>

        <ColumnFlexContainer gap={[4]} flex={1} justifyContent="center">
          {currentSong ? (
            <>
              <ColumnFlexContainer
                alignItems="center"
                gap={[10]}
                height="512px"
                padding={[10, 0, 0]}
              >
                <Container
                  width="min(78vw, 420px)"
                  borderRadius={[6]}
                  overflow="hidden"
                  sx={{
                    aspectRatio: '1',
                    border: '1px solid var(--player-border)',
                    boxShadow: '0 24px 60px rgba(0, 0, 0, 0.32)',
                    backgroundColor: 'var(--background-dark-transparent)',
                  }}
                >
                  <img
                    src={currentSong.coverUrl}
                    alt={currentSong.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </Container>
                <ColumnFlexContainer gap={[1]} width="100%">
                  <RowFlexContainer
                    alignItems="start"
                    justifyContent="between"
                    gap={[3]}
                  >
                    <ColumnFlexContainer gap={[1]} minWidth={[0]}>
                      <Typography
                        variant="h6"
                        weight="bold"
                        color="var(--player-text-primary)"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {currentSong.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="var(--player-text-secondary)"
                      >
                        {currentSong.artist}
                      </Typography>
                    </ColumnFlexContainer>
                    <RowFlexContainer
                      height={[6]}
                      width={[6]}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Heart size="24px" color="var(--player-accent)" />
                    </RowFlexContainer>
                  </RowFlexContainer>
                </ColumnFlexContainer>
              </ColumnFlexContainer>
              <ColumnFlexContainer padding={[0, 0, 30]}>
                <ColumnFlexContainer gap={[2]}>
                  <ProgressBar
                    type="range"
                    min={0}
                    max={duration || 0}
                    value={Math.min(currentTime, duration || 0)}
                    onChange={(event) => seek(Number(event.target.value))}
                    aria-label="Seek through song"
                    disabled={!duration}
                    style={{
                      background: `linear-gradient(to right, var(--player-accent) ${progress}%, var(--background-selected) ${progress}%)`,
                    }}
                  />
                  <RowFlexContainer justifyContent="between">
                    <Typography
                      variant="caption"
                      color="var(--player-text-secondary)"
                    >
                      {formatTime(currentTime)}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="var(--player-text-secondary)"
                    >
                      {formatTime(duration)}
                    </Typography>
                  </RowFlexContainer>
                </ColumnFlexContainer>
                <RowFlexContainer
                  alignItems="center"
                  justifyContent="between"
                  padding={[2, 0]}
                >
                  <RowFlexContainer
                    role="button"
                    width={[5]}
                    height={[5]}
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    onClick={previous}
                  >
                    <SkipBack size="20px" />
                  </RowFlexContainer>
                  <RowFlexContainer
                    role="button"
                    aria-label={
                      isBuffering ? 'Loading' : isPlaying ? 'Pause' : 'Play'
                    }
                    aria-busy={isBuffering}
                    width={[10]}
                    height={[10]}
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    onClick={isPlaying ? pause : play}
                  >
                    {isBuffering ? (
                      <LoadingSpinner size="40px" />
                    ) : isPlaying ? (
                      <Pause size="40px" />
                    ) : (
                      <Play size="40px" />
                    )}
                  </RowFlexContainer>
                  <RowFlexContainer
                    role="button"
                    width={[5]}
                    height={[5]}
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    onClick={next}
                  >
                    <SkipForward size="20px" />
                  </RowFlexContainer>
                  <RowFlexContainer
                    role="button"
                    width={[5]}
                    height={[5]}
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    onClick={onQueue}
                  >
                    <ListMusic size="20px" />
                  </RowFlexContainer>
                </RowFlexContainer>
              </ColumnFlexContainer>
            </>
          ) : (
            <ColumnFlexContainer alignItems="center" gap={[2]}>
              <Typography
                variant="h5"
                weight="bold"
                color="var(--player-text-primary)"
              >
                Nothing playing
              </Typography>
              <Typography variant="body2" color="var(--player-text-secondary)">
                Choose a song to start the ride.
              </Typography>
            </ColumnFlexContainer>
          )}
        </ColumnFlexContainer>
      </ColumnFlexContainer>
    </Container>
  );
};
