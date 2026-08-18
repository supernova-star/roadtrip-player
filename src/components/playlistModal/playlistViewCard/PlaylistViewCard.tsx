import { Button } from '@/components/uiComponents/button/Button';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { useWallpaper } from '@/hooks/useWallpaper';
import { usePlayerStore } from '@/store/playerStore';
import { Playlist } from '@/types/music';
import { Pause, Play } from 'lucide-react';
import React, { FC } from 'react';

type DesktopPlaylistViewCardProps = {
  playlist: Playlist;
  isSelected: boolean;
  onSelectPlaylist: (playlistId: string) => void;
  handlePlayButtonClick: (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
};

export const DesktopPlaylistViewCard: FC<DesktopPlaylistViewCardProps> = ({
  playlist,
  isSelected,
  onSelectPlaylist,
  handlePlayButtonClick,
}) => {
  const { wallpaper } = useWallpaper();
  const mode = wallpaper.theme.mode;
  const currentSong = usePlayerStore((state) => state.currentSong);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const togglePlay = usePlayerStore((state) => state.togglePlay);
  const isThisPlaylistPlaying =
    isPlaying && !!currentSong && playlist.songIds.includes(currentSong.id);

  const getBackground = () => {
    if (isSelected) {
      return mode === 'light' ? 'var(--background-selected)' : 'var(--background-dark-selected)';
    }
    return mode === 'light'
      ? 'var(--background-transparent)'
      : 'var(--background-dark-transparent)';
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isThisPlaylistPlaying) {
      event.stopPropagation();
      togglePlay();
      return;
    }
    handlePlayButtonClick(event);
  };

  return (
    <ColumnFlexContainer
      key={playlist.id}
      gap={[1]}
      padding={[2]}
      cursor="pointer"
      borderRadius={[1]}
      onClick={() => onSelectPlaylist(playlist.id)}
      style={{
        minWidth: 'auto',
        border: `1px solid ${isSelected ? 'var(--player-accent)' : 'var(--player-border)'}`,
        backgroundColor: getBackground(),

        position: 'relative',
        overflow: 'visible',
      }}
    >
      <RowFlexContainer justifyContent="between" alignItems="center" gap={[2]}>
        <ColumnFlexContainer flex={1} style={{ minWidth: 0 }}>
          <Typography
            variant="caption"
            color="var(--player-text-primary)"
            weight="semiBold"
            sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {playlist.title}
          </Typography>
          <Typography variant="legal" color="var(--player-text-secondary)">
            {playlist.songIds.length} songs
          </Typography>
        </ColumnFlexContainer>

        <Button
          text={isThisPlaylistPlaying ? 'Pause' : 'Play'}
          size="xSmall"
          variant="contained"
          iconOptions={{
            icon: isThisPlaylistPlaying ? Pause : Play,
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
          onClick={handleClick}
        />
      </RowFlexContainer>
    </ColumnFlexContainer>
  );
};

type MobilePlaylistViewCardProps = {
  playlist: Playlist;
  isSelected: boolean;
  onSelectPlaylist: (playlistId: string) => void;
  handlePlayButtonClick: (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
};

export const MobilePlaylistViewCard: FC<MobilePlaylistViewCardProps> = ({
  playlist,
  isSelected,
  onSelectPlaylist,
  handlePlayButtonClick,
}) => {
  const currentSong = usePlayerStore((state) => state.currentSong);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const togglePlay = usePlayerStore((state) => state.togglePlay);
  const isThisPlaylistPlaying =
    isPlaying && !!currentSong && playlist.songIds.includes(currentSong.id);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isThisPlaylistPlaying) {
      event.stopPropagation();
      togglePlay();
      return;
    }
    handlePlayButtonClick(event);
  };

  return (
    <ColumnFlexContainer
      gap={[1]}
      padding={[1, 2]}
      cursor="pointer"
      borderRadius={[1]}
      onClick={() => onSelectPlaylist(playlist.id)}
      style={{
        width: '100%',
        minWidth: 0,
        minHeight: '72px',
        border: `1px solid ${isSelected ? 'var(--player-accent)' : 'var(--player-border)'}`,
        borderRadius: '10px',
        background: isSelected
          ? 'var(--background-selected)'
          : 'var(--background-dark-transparent)',
        overflow: 'hidden',
      }}
    >
      <RowFlexContainer width="100%" alignItems="center" justifyContent="between" gap={[1]}>
        <ColumnFlexContainer flex={1} style={{ minWidth: 0 }}>
          <Typography
            variant="caption"
            color="var(--player-text-primary)"
            weight="semiBold"
            sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {playlist.title}
          </Typography>
          <Typography variant="legal" color="var(--player-text-secondary)">
            {playlist.songIds.length} songs
          </Typography>
        </ColumnFlexContainer>
        <RowFlexContainer
          alignItems="center"
          justifyContent="center"
          width={[8]}
          height={[8]}
          borderRadius={[99]}
          backgroundColor={isSelected ? 'var(--player-accent)' : 'rgba(29, 28, 46, 0.75)'}
          style={{ flexShrink: 0 }}
          onClick={handleClick}
        >
          {isThisPlaylistPlaying ? (
            <Pause size="12px" color="var(--player-text-primary)" />
          ) : (
            <Play size="12px" color="var(--player-text-primary)" />
          )}
        </RowFlexContainer>
      </RowFlexContainer>
    </ColumnFlexContainer>
  );
};
