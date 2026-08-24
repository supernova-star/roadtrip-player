import React, { FC } from 'react';
import { SkipBack, Play, Pause, SkipForward, ListMusic } from 'lucide-react';
import {
  Container,
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { usePlayerStore } from '../../store/playerStore';
import {
  ControlButton,
  PlayButton,
  ProgressBar,
  ListButton,
  MobileProgressTrack,
  MobileProgressFill,
  LoadingSpinner,
} from './Player.styles';
import { useResponsive } from '@/hooks/useResponsive';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { Song } from '@/types/music';
import { formatTime } from '@/utils/formatter';

const CoverImage: FC<{ currentSong: Song; isMobile: boolean }> = ({
  currentSong,
  isMobile,
}) => {
  return (
    <Container
      width={isMobile ? [12] : [22]}
      height={isMobile ? [12] : [22]}
      borderRadius={[20]}
      style={{
        border: `1px solid var(--player-border)`,
        backgroundColor: 'var(--background-dark-transparent)',
        flexShrink: 0,
        overflow: 'hidden',
      }}
    >
      <img
        src={currentSong?.coverUrl}
        alt={currentSong?.title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </Container>
  );
};

type ControlSectionProps = {
  isPlaying: boolean;
  isBuffering: boolean;
  playPreviousSong: () => void;
  playNextSong: () => void;
  playSong: () => void;
  pauseSong: () => void;
  isMobile: boolean;
  showPreviousNextButtons: boolean;
};

const ControlSection: FC<ControlSectionProps> = ({
  isPlaying,
  isBuffering,
  playPreviousSong,
  playNextSong,
  playSong,
  pauseSong,
  isMobile,
  showPreviousNextButtons,
}) => {
  return (
    <RowFlexContainer alignItems="center" gap={[1, 2]}>
      {showPreviousNextButtons && (
        <ControlButton
          type="button"
          onClick={playPreviousSong}
          aria-label="Previous"
          $isMobile={isMobile}
        >
          <SkipBack size={16} />
        </ControlButton>
      )}

      <PlayButton
        type="button"
        onClick={isPlaying ? pauseSong : playSong}
        aria-label={isBuffering ? 'Loading' : isPlaying ? 'Pause' : 'Play'}
        aria-busy={isBuffering}
        $isMobile={isMobile}
      >
        {isBuffering ? (
          <LoadingSpinner size={16} color="var(--player-background)" />
        ) : isPlaying ? (
          <Pause size={16} color="var(--player-background)" />
        ) : (
          <Play size={16} color="var(--player-background)" />
        )}
      </PlayButton>
      {showPreviousNextButtons && (
        <ControlButton
          type="button"
          onClick={playNextSong}
          aria-label="Next"
          $isMobile={isMobile}
        >
          <SkipForward size={16} />
        </ControlButton>
      )}
    </RowFlexContainer>
  );
};

export const Player: React.FC<{
  openPlaylistDrawer: () => void;
  openNowPlaying: () => void;
  showQueueShortcut?: boolean;
  showProgressBar?: boolean;
}> = ({
  openPlaylistDrawer,
  openNowPlaying,
  showQueueShortcut = true,
  showProgressBar = true,
}) => {
  const { isMobile } = useResponsive();
  const currentSong = usePlayerStore((state) => state.currentSong);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const isBuffering = usePlayerStore((state) => state.isBuffering);
  const currentTime = usePlayerStore((state) => state.currentTime);
  const duration = usePlayerStore((state) => state.duration);

  const play = usePlayerStore((state) => state.play);
  const pause = usePlayerStore((state) => state.pause);
  const next = usePlayerStore((state) => state.next);
  const previous = usePlayerStore((state) => state.previous);
  const seek = usePlayerStore((state) => state.seek);

  const playerWidth = isMobile ? '100%' : '60vw';
  const progressPercent =
    duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

  return (
    <RowFlexContainer
      borderRadius={isMobile ? [5, 5, 0, 0] : [16]}
      padding={isMobile ? [4, 3] : [4, 7]}
      gap={[4]}
      width={playerWidth}
      overflow="hidden"
      onClick={openNowPlaying}
      sx={{
        position: 'relative',
        backdropFilter: 'blur(28px)',
        width: playerWidth,
        border: isMobile ? 'none' : '1px solid var(--player-border)',
        backgroundColor: 'var(--player-surface)',
        boxShadow: 'var(--player-surface-shadow)',
        cursor: currentSong ? 'pointer' : 'default',
      }}
    >
      {currentSong && (
        <CoverImage currentSong={currentSong} isMobile={isMobile} />
      )}
      <ColumnFlexContainer
        gap={[4]}
        width="100%"
        minWidth={[0]}
        flex={1}
        data-testid="player-song-info-wrapper"
      >
        <RowFlexContainer
          justifyContent="between"
          alignItems="center"
          gap={isMobile ? [1] : [4]}
          data-testid="player-song-info-container"
        >
          <ColumnFlexContainer
            gap={[1]}
            minWidth={[0]}
            flex={1}
            data-testid="player-song-info"
          >
            <Typography
              variant={isMobile ? 'body2' : 'body1'}
              weight="bold"
              color="var(--player-text-primary)"
              sx={{
                display: 'block',
                maxWidth: '100%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {currentSong?.title ?? 'Nothing playing'}
            </Typography>
            <Typography
              variant="caption"
              color="var(--player-text-secondary)"
              sx={{
                display: 'block',
                maxWidth: '100%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {currentSong?.artist ?? 'Select a song to start the ride'}
            </Typography>
          </ColumnFlexContainer>
          <RowFlexContainer
            data-testid="player-controls"
            alignItems="center"
            style={{ flexShrink: 0 }}
            onClick={(event) => event.stopPropagation()}
          >
            <ControlSection
              isPlaying={isPlaying}
              isBuffering={isBuffering}
              playPreviousSong={previous}
              playNextSong={next}
              playSong={play}
              pauseSong={pause}
              isMobile={isMobile}
              showPreviousNextButtons={!isMobile}
            />
            {showQueueShortcut && (
              <ListButton
                type="button"
                onClick={openPlaylistDrawer}
                $isMobile={isMobile}
                style={{ flexShrink: 0 }}
              >
                <ListMusic size={24} />
              </ListButton>
            )}
          </RowFlexContainer>
        </RowFlexContainer>

        {!isMobile && (
          <RowFlexContainer
            alignItems="center"
            gap={[1, 2]}
            onClick={(event) => event.stopPropagation()}
          >
            <Typography
              variant="caption"
              weight="semiBold"
              color="var(--player-text-secondary)"
            >
              {formatTime(currentTime)}
            </Typography>
            <ProgressBar
              type="range"
              min={0}
              max={duration || 0}
              value={Math.min(currentTime, duration || 0)}
              onChange={(event) => seek(Number(event.target.value))}
            />
            <Typography
              variant="caption"
              weight="semiBold"
              color="var(--player-text-secondary)"
            >
              {formatTime(duration)}
            </Typography>
          </RowFlexContainer>
        )}
      </ColumnFlexContainer>
      {isMobile && showProgressBar && (
        <MobileProgressTrack aria-hidden="true">
          <MobileProgressFill $progress={progressPercent} />
        </MobileProgressTrack>
      )}
    </RowFlexContainer>
  );
};
