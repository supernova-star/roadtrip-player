import React, { FC } from 'react';
import { SkipBack, Play, Pause, SkipForward, ListMusic } from 'lucide-react';
import Container, {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { usePlayerStore } from '../../store/playerStore';
import { ControlButton, PlayButton, ProgressBar, ListButton } from './Player.styles';
import { useResponsive } from '@/hooks/useResponsive';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { Song } from '@/types/music';
import { formatTime } from '@/utils/formatter';

const CoverImage: FC<{ currentSong: Song; isMobile: boolean }> = ({ currentSong, isMobile }) => {
  return (
    <Container
      width={isMobile ? [14] : [24]}
      height={isMobile ? [14] : [22]}
      borderRadius={[20]}
      style={{ border: `1px solid var(--player-border)` }}
    >
      <img
        src={currentSong?.coverUrl}
        alt={currentSong?.title}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '80px',
          objectFit: 'contain',
          border: `1px solid var(--player-border)`,
        }}
      />
    </Container>
  );
};

type ControlSectionProps = {
  isPlaying: boolean;
  playPreviousSong: () => void;
  playNextSong: () => void;
  playSong: () => void;
  pauseSong: () => void;
  isMobile: boolean;
};

const ControlSection: FC<ControlSectionProps> = ({
  isPlaying,
  playPreviousSong,
  playNextSong,
  playSong,
  pauseSong,
  isMobile,
}) => {
  return (
    <RowFlexContainer alignItems="center" gap={[1, 2]}>
      <ControlButton
        type="button"
        onClick={playPreviousSong}
        aria-label="Previous"
        $isMobile={isMobile}
      >
        <SkipBack size={16} />
      </ControlButton>

      <PlayButton
        type="button"
        onClick={isPlaying ? pauseSong : playSong}
        aria-label="Play/Pause"
        $isMobile={isMobile}
      >
        {isPlaying ? (
          <Pause size={16} color="var(--player-background)" />
        ) : (
          <Play size={16} color="var(--player-background)" />
        )}
      </PlayButton>
      <ControlButton type="button" onClick={playNextSong} aria-label="Next" $isMobile={isMobile}>
        <SkipForward size={16} />
      </ControlButton>
    </RowFlexContainer>
  );
};

export const Player: React.FC<{ openPlaylistDrawer: () => void }> = ({ openPlaylistDrawer }) => {
  const { isMobile } = useResponsive();

  const currentSong = usePlayerStore((state) => state.currentSong);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const currentTime = usePlayerStore((state) => state.currentTime);
  const duration = usePlayerStore((state) => state.duration);

  const play = usePlayerStore((state) => state.play);
  const pause = usePlayerStore((state) => state.pause);
  const next = usePlayerStore((state) => state.next);
  const previous = usePlayerStore((state) => state.previous);
  const seek = usePlayerStore((state) => state.seek);

  const playerWidth = isMobile ? '90%' : '60vw';

  return (
    <RowFlexContainer
      position="fixed"
      bottom="0px"
      left="0px"
      right="0px"
      width="100%"
      padding={[0, 0, 6]}
      alignItems="center"
      justifyContent="center"
    >
      <ColumnFlexContainer
        borderRadius={isMobile ? [4] : [16]}
        padding={isMobile ? [4, 3] : [4, 7]}
        gap={[4]}
        width={playerWidth}
        sx={{
          backdropFilter: 'blur(28px)',
          width: playerWidth,
          border: `1px solid var(--player-border)`,
        }}
      >
        <RowFlexContainer gap={[4]}>
          {currentSong && !isMobile && <CoverImage currentSong={currentSong} isMobile={isMobile} />}
          <ColumnFlexContainer gap={[4]} width="100%">
            <RowFlexContainer
              justifyContent="between"
              alignItems="center"
              flexWrap="wrap"
              gap={[4]}
            >
              <RowFlexContainer gap={[2]} flex={1} minWidth={[0]}>
                {currentSong && isMobile && (
                  <CoverImage currentSong={currentSong} isMobile={isMobile} />
                )}
                <ColumnFlexContainer gap={[1]} minWidth={[0]} flex={1}>
                  <Typography
                    variant="body1"
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
                    variant="body2"
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
              </RowFlexContainer>
              {!isMobile && (
                <ControlSection
                  isPlaying={isPlaying}
                  playPreviousSong={previous}
                  playNextSong={next}
                  playSong={play}
                  pauseSong={pause}
                  isMobile={isMobile}
                />
              )}
              <ListButton type="button" onClick={openPlaylistDrawer} $isMobile={isMobile}>
                <ListMusic size={24} />
              </ListButton>
            </RowFlexContainer>

            <RowFlexContainer alignItems="center" gap={[1, 2]}>
              <Typography variant="caption" weight="semiBold" color="var(--player-text-secondary)">
                {formatTime(currentTime)}
              </Typography>
              <ProgressBar
                type="range"
                min={0}
                max={duration || 0}
                value={Math.min(currentTime, duration || 0)}
                onChange={(event) => seek(Number(event.target.value))}
              />
              <Typography variant="caption" weight="semiBold" color="var(--player-text-secondary)">
                {formatTime(duration)}
              </Typography>
            </RowFlexContainer>
            {isMobile && (
              <ControlSection
                isPlaying={isPlaying}
                playPreviousSong={previous}
                playNextSong={next}
                playSong={play}
                pauseSong={pause}
                isMobile={isMobile}
              />
            )}
          </ColumnFlexContainer>
        </RowFlexContainer>
      </ColumnFlexContainer>
    </RowFlexContainer>
  );
};
