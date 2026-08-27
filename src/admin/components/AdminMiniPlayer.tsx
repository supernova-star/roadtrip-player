import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import {
  ColumnFlexContainer,
  Container,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { useResponsive } from '@/hooks/useResponsive';
import { formatTime } from '@/utils/formatter';
import {
  LoadingSpinner,
  MobileProgressFill,
  MobileProgressTrack,
  PlayButton,
  ProgressBar,
} from '@/components/player/Player.styles';
import type { AdminSearchSong } from '@/store/adminSearchStore';

type AdminMiniPlayerProps = {
  song: AdminSearchSong | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onEnded: () => void;
};

export const AdminMiniPlayer: React.FC<AdminMiniPlayerProps> = ({
  song,
  isPlaying,
  onTogglePlay,
  onEnded,
}) => {
  const { isMobile } = useResponsive();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isBuffering, setIsBuffering] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(song?.duration ?? 0);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;
    audio.pause();
    audio.src = song?.audioUrl ?? '';
    setCurrentTime(0);
    setDuration(song?.duration ?? 0);
    setIsBuffering(Boolean(song && isPlaying));

    if (song && isPlaying) {
      audio.play().catch(() => setIsBuffering(false));
    }

    return () => {
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
    };
  }, [song]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !song) {
      return;
    }

    if (isPlaying) {
      setIsBuffering(true);
      audio.play().then(
        () => setIsBuffering(false),
        () => setIsBuffering(false),
      );
    } else {
      audio.pause();
      setIsBuffering(false);
    }
  }, [isPlaying, song]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleEnded = () => {
      setCurrentTime(0);
      onEnded();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onEnded]);

  if (!song) {
    return null;
  }

  const progressPercent =
    duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;
  const playerWidth = isMobile ? '100%' : '60vw';

  return (
    <RowFlexContainer
      borderRadius={isMobile ? [5, 5, 0, 0] : [16]}
      padding={isMobile ? [4, 3] : [4, 7]}
      gap={[4]}
      width={playerWidth}
      overflow="hidden"
      sx={{
        position: 'relative',
        backdropFilter: 'blur(28px)',
        border: isMobile ? 'none' : '1px solid var(--player-border)',
        backgroundColor: 'var(--player-surface)',
        boxShadow: 'var(--player-surface-shadow)',
      }}
    >
      <Container
        width={isMobile ? [12] : [22]}
        height={isMobile ? [12] : [22]}
        borderRadius={[20]}
        style={{
          border: '1px solid var(--player-border)',
          backgroundColor: 'var(--background-dark-transparent)',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        <img
          src={song.imageUrl}
          alt={song.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Container>
      <ColumnFlexContainer gap={[4]} width="100%" minWidth={[0]} flex={1}>
        <RowFlexContainer
          justifyContent="between"
          alignItems="center"
          gap={[4]}
        >
          <ColumnFlexContainer gap={[1]} minWidth={[0]} flex={1}>
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
              {song.title}
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
              {song.artist}
            </Typography>
          </ColumnFlexContainer>
          <PlayButton
            type="button"
            onClick={onTogglePlay}
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
        </RowFlexContainer>
        {!isMobile && (
          <RowFlexContainer alignItems="center" gap={[1, 2]}>
            <Typography variant="caption" color="var(--player-text-secondary)">
              {formatTime(currentTime)}
            </Typography>
            <ProgressBar
              type="range"
              min={0}
              max={duration || 0}
              value={Math.min(currentTime, duration || 0)}
              onChange={(event) => {
                const nextTime = Number(event.target.value);
                if (audioRef.current) {
                  audioRef.current.currentTime = nextTime;
                }
                setCurrentTime(nextTime);
              }}
            />
            <Typography variant="caption" color="var(--player-text-secondary)">
              {formatTime(duration)}
            </Typography>
          </RowFlexContainer>
        )}
      </ColumnFlexContainer>
      {isMobile && (
        <MobileProgressTrack aria-hidden="true">
          <MobileProgressFill $progress={progressPercent} />
        </MobileProgressTrack>
      )}
    </RowFlexContainer>
  );
};
