import React, { FC } from 'react';

import { Pause, Play } from 'lucide-react';
import { Button } from '@/components/uiComponents/button/Button';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { Playlist, Song } from '@/types/music';
import { useWallpaper } from '@/hooks/useWallpaper';
import { usePlayerStore } from '@/store/playerStore';
import { formatTime } from '@/utils/formatter';

type SongCardProps = {
  song: Song;
  serialNumber: number;
  isMobile: boolean;
  selectedPlaylist: Playlist | null;
  handlePlaySongFromPlaylist: (playlist: Playlist, song: Song) => void;
};

export const SongCard: FC<SongCardProps> = ({
  song,
  serialNumber,
  isMobile,
  selectedPlaylist,
  handlePlaySongFromPlaylist,
}) => {
  const { wallpaper } = useWallpaper();
  const mode = wallpaper.theme.mode;
  const currentSong = usePlayerStore((state) => state.currentSong);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const togglePlay = usePlayerStore((state) => state.togglePlay);
  const isThisSongPlaying = isPlaying && currentSong?.id === song.id;

  const handlePlayButtonClick = () => {
    if (currentSong?.id === song.id) {
      togglePlay();
      return;
    }
    if (!selectedPlaylist) return;
    handlePlaySongFromPlaylist(selectedPlaylist, song);
  };

  return (
    <RowFlexContainer
      key={song.id}
      justifyContent="between"
      alignItems="center"
      padding={isMobile ? [1, 2] : [1, 3]}
      borderRadius={[1]}
      style={{
        border: '1px solid var(--player-border)',
        background:
          mode === 'light' ? 'var(--background-selected)' : 'var(--background-dark-transparent)',
      }}
    >
      <ColumnFlexContainer flex={1} style={{ minWidth: 0 }}>
        <Typography
          variant="caption"
          color="var(--player-text-primary)"
          sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {serialNumber}. {song.title}
        </Typography>
        <Typography
          variant="legal"
          color="var(--player-text-secondary)"
          sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {song.artist}
        </Typography>
      </ColumnFlexContainer>
      <RowFlexContainer alignItems="center" gap={[2]} style={{ minWidth: 0 }}>
        <Typography variant="legal" color="var(--player-text-secondary)">
          {song.duration ? formatTime(song.duration) : '--:--'}
        </Typography>
        <Button
          text={isMobile ? '' : isThisSongPlaying ? 'Pause' : 'Play'}
          size="xSmall"
          variant="contained"
          iconOptions={{
            icon: isThisSongPlaying ? Pause : Play,
            iconColor: 'var(--player-text-primary)',
          }}
          textOptions={{
            textColor: 'var(--player-text-primary)',
            textVariant: 'caption',
          }}
          buttonStyles={{
            borderRadius: [99],
            bgColor:
              mode === 'dark'
                ? 'var(--background-transparent)'
                : 'var(--background-dark-transparent)',
          }}
          onClick={handlePlayButtonClick}
        />
      </RowFlexContainer>
    </RowFlexContainer>
  );
};
