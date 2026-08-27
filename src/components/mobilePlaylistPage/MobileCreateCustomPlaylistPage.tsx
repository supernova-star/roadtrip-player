import {
  CarFront,
  CassetteTape,
  ChevronLeft,
  CloudRain,
  Dumbbell,
  Heart,
  Moon,
  Smile,
  Sparkles,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { CircularProgress, Input } from '@mui/material';
import React, { useState } from 'react';
import { Button } from '@/components/uiComponents/button/Button';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import {
  CUSTOM_PLAYLIST_MOOD_GROUPS,
  type CustomPlaylistMoodId,
} from '@/constants/customPlaylistMoods';
import { playlists } from '@/constants/playlists';
import { songs } from '@/constants/songs';
import { useMobilePageSurface } from '@/hooks/useMobilePageSurface';
import { useCustomPlaylistsStore } from '@/store/customPlaylistsStore';
import { getSongsByIds } from '@/utils/music';

type MobileCreateCustomPlaylistPageProps = {
  onBack: () => void;
  onCreated: (playlistId: string) => void;
};

type Mood = {
  id: CustomPlaylistMoodId;
  label: string;
  icon: LucideIcon;
  color: string;
};

const moods: Mood[] = [
  { id: 'chill', label: 'Chill', icon: CloudRain, color: '#5b9dff' },
  { id: 'romantic', label: 'Romantic', icon: Heart, color: '#ef5b79' },
  { id: 'happy', label: 'Happy', icon: Smile, color: '#f6bd45' },
  { id: 'nostalgic', label: 'Nostalgic', icon: CassetteTape, color: '#9b6df0' },
  { id: 'energetic', label: 'Energetic', icon: Zap, color: '#f1a13c' },
  { id: 'sad', label: 'Sad', icon: CloudRain, color: '#4f91e8' },
  { id: 'late-night', label: 'Late Night', icon: Moon, color: '#8b55e8' },
  { id: 'road-trip', label: 'Road Trip', icon: CarFront, color: '#e89536' },
  { id: 'workout', label: 'Workout', icon: Dumbbell, color: '#48bf91' },
];

const SONG_COUNT_OPTIONS = [10, 20, 30] as const;
type SongCount = (typeof SONG_COUNT_OPTIONS)[number];

export const MobileCreateCustomPlaylistPage: React.FC<
  MobileCreateCustomPlaylistPageProps
> = ({ onBack, onCreated }) => {
  const mobilePageSurface = useMobilePageSurface();
  const createCustomPlaylist = useCustomPlaylistsStore(
    (state) => state.createCustomPlaylist,
  );
  const [playlistName, setPlaylistName] = useState('');
  const [selectedMood, setSelectedMood] =
    useState<CustomPlaylistMoodId>('late-night');
  const [selectedSongCount, setSelectedSongCount] = useState<SongCount>(10);
  const [isMixing, setIsMixing] = useState(false);
  const canCreateMix = Boolean(playlistName.trim() && selectedMood);

  const createMoodMix = () => {
    if (!canCreateMix) return;

    const title = playlistName.trim();
    const mood = selectedMood;
    const songCount = selectedSongCount;
    setIsMixing(true);
    window.setTimeout(() => {
      const sourcePlaylistIds = new Set<string>(
        CUSTOM_PLAYLIST_MOOD_GROUPS[mood],
      );
      const sourceSongIds = playlists
        .filter((playlist) => sourcePlaylistIds.has(playlist.id))
        .flatMap((playlist) => playlist.songIds);
      const uniqueSongIds = Array.from(new Set(sourceSongIds));
      const shuffledSongIds = uniqueSongIds
        .map((songId) => ({ songId, order: Math.random() }))
        .sort((first, second) => first.order - second.order)
        .map(({ songId }) => songId);
      const availableSongIds = new Set(
        getSongsByIds(shuffledSongIds, songs).map((song) => song.id),
      );
      const playlist = createCustomPlaylist({
        title,
        mood,
        songIds: shuffledSongIds
          .filter((songId) => availableSongIds.has(songId))
          .slice(0, songCount),
      });

      onCreated(playlist.id);
    }, 700);
  };

  return (
    <ColumnFlexContainer
      gap={[5]}
      padding={[6, 5, 37]}
      width="100%"
      height="100vh"
      style={mobilePageSurface}
    >
      <RowFlexContainer alignItems="center" gap={[3]} style={{ flexShrink: 0 }}>
        <RowFlexContainer
          alignItems="center"
          justifyContent="center"
          width={[10]}
          height={[10]}
          cursor="pointer"
          onClick={onBack}
          style={{
            borderRadius: '999px',
            backgroundColor: 'var(--background-dark-transparent)',
            flexShrink: 0,
          }}
        >
          <ChevronLeft size="20px" color="var(--player-text-primary)" />
        </RowFlexContainer>
        <ColumnFlexContainer gap={[1]}>
          <Typography
            variant="h5"
            weight="bold"
            color="var(--player-text-primary)"
          >
            Create Custom Playlist
          </Typography>
          <Typography variant="caption" color="var(--player-text-secondary)">
            Build a mix from songs in your library
          </Typography>
        </ColumnFlexContainer>
      </RowFlexContainer>
      <ColumnFlexContainer gap={[2]}>
        <Typography
          variant="body2"
          weight="semiBold"
          color="var(--player-text-primary)"
        >
          Playlist name
        </Typography>
        <Input
          fullWidth
          value={playlistName}
          placeholder="Name your playlist"
          inputProps={{
            'aria-label': 'Custom playlist name',
            maxLength: 80,
          }}
          onChange={(event) => setPlaylistName(event.target.value)}
          sx={{
            color: 'var(--player-text-primary)',
            background: 'var(--background-dark-transparent)',
            border: '1px solid var(--player-border)',
            borderRadius: '10px',
            padding: '3px 14px',
            '&::before, &::after': { display: 'none' },
            '& input': {
              color: 'var(--player-text-primary)',
              fontSize: '16px',
              fontWeight: 600,
              padding: '10px 0',
            },
            '& input::placeholder': {
              color: 'var(--player-text-secondary)',
              opacity: 0.8,
            },
          }}
        />
      </ColumnFlexContainer>
      <ColumnFlexContainer gap={[2]}>
        <Typography
          variant="body2"
          weight="semiBold"
          color="var(--player-text-primary)"
        >
          Number of songs
        </Typography>
        <RowFlexContainer role="radiogroup" gap={[2]}>
          {SONG_COUNT_OPTIONS.map((songCount) => {
            const isSelected = selectedSongCount === songCount;

            return (
              <RowFlexContainer
                key={songCount}
                role="radio"
                aria-checked={isSelected}
                tabIndex={isSelected ? 0 : -1}
                alignItems="center"
                justifyContent="center"
                flex={1}
                padding={[2]}
                borderRadius={[3]}
                cursor="pointer"
                onClick={() => setSelectedSongCount(songCount)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setSelectedSongCount(songCount);
                  }
                }}
                sx={{
                  border: `1px solid ${
                    isSelected ? 'var(--player-accent)' : 'var(--player-border)'
                  }`,
                  backgroundColor: isSelected
                    ? 'var(--surface-selected)'
                    : 'var(--background-dark-transparent)',
                }}
              >
                <Typography
                  variant="body2"
                  weight="semiBold"
                  color={
                    isSelected
                      ? 'var(--player-text-primary)'
                      : 'var(--player-text-secondary)'
                  }
                >
                  {songCount}
                </Typography>
              </RowFlexContainer>
            );
          })}
        </RowFlexContainer>
      </ColumnFlexContainer>
      <ColumnFlexContainer gap={[3]}>
        <Typography
          variant="body2"
          weight="semiBold"
          color="var(--player-text-primary)"
        >
          What&apos;s your mood?
        </Typography>
        <ColumnFlexContainer
          display="grid"
          gap={[2]}
          sx={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}
        >
          {moods.map(({ id, label, icon: Icon, color }) => {
            const isSelected = selectedMood === id;

            return (
              <ColumnFlexContainer
                key={id}
                role="button"
                tabIndex={0}
                alignItems="center"
                justifyContent="center"
                gap={[2]}
                minWidth={[0]}
                padding={[3, 1]}
                borderRadius={[3]}
                cursor="pointer"
                onClick={() => setSelectedMood(id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setSelectedMood(id);
                  }
                }}
                sx={{
                  aspectRatio: '1 / 0.78',
                  border: `1px solid ${
                    isSelected ? 'var(--player-accent)' : 'var(--player-border)'
                  }`,
                  backgroundColor: isSelected
                    ? 'var(--background-dark-transparent)'
                    : 'transparent',
                  boxShadow: isSelected
                    ? '0 0 0 1px var(--player-accent)'
                    : 'none',
                }}
              >
                <Icon size="29px" color={color} />
                <Typography
                  variant="caption"
                  weight="semiBold"
                  color="var(--player-text-primary)"
                  textAlign="center"
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {label}
                </Typography>
              </ColumnFlexContainer>
            );
          })}
        </ColumnFlexContainer>
      </ColumnFlexContainer>
      <Button
        text="Create Mix"
        disabled={!canCreateMix || isMixing}
        size="large"
        iconOptions={{ icon: Sparkles, iconColor: 'var(--player-background)' }}
        textOptions={{
          textColor: 'var(--player-background)',
          textWeight: 'bold',
        }}
        buttonStyles={{
          bgColor: 'var(--player-accent)',
          borderRadius: [4],
          width: 'fullWidth',
        }}
        onClick={createMoodMix}
      />
      {isMixing && (
        <RowFlexContainer alignItems="center" justifyContent="center" gap={[2]}>
          <CircularProgress size={16} sx={{ color: 'var(--player-accent)' }} />
          <Typography variant="caption" color="var(--player-text-secondary)">
            Mixing your playlist...
          </Typography>
        </RowFlexContainer>
      )}
    </ColumnFlexContainer>
  );
};
