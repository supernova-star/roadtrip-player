import React from 'react';
import { Heart, ListMusic, Music2 } from 'lucide-react';
import { ColumnFlexContainer, Container } from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { playlists } from '@/constants/playlists';
import { songs } from '@/constants/songs';
import { ProfileStat } from './ProfileStat';

type ProfileLibrarySectionProps = {
  favoriteSongCount: number;
  accent: string;
  isLightMode: boolean;
};

export const ProfileLibrarySection: React.FC<ProfileLibrarySectionProps> = ({
  favoriteSongCount,
  accent,
  isLightMode,
}) => (
  <ColumnFlexContainer gap={[3]}>
    <Typography variant="body1" weight="semiBold" color="var(--player-text-secondary)">
      Your Library
    </Typography>

    <ColumnFlexContainer
      gap={[3]}
      padding={[3]}
      style={{
        borderRadius: '12px',
        backgroundColor: isLightMode ? 'var(--background-transparent)' : 'var(--surface-panel)',
        border: '1px solid var(--player-border)',
      }}
    >
      <Container
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: '1px',
          overflow: 'hidden',
          borderRadius: '10px',
          backgroundColor: 'var(--background-dark-selected)',
        }}
      >
        <ProfileStat
          icon={<ListMusic size="20px" color="var(--player-accent)" />}
          label="Playlists"
          value={playlists.length.toString()}
          accent={accent}
        />
        <ProfileStat
          icon={<Heart size="20px" color="var(--player-accent)" fill="var(--player-accent)" />}
          label="Liked"
          value={favoriteSongCount.toString()}
          accent={accent}
        />
        <ProfileStat
          icon={<Music2 size="20px" color="var(--player-accent)" />}
          label="Songs"
          value={songs.length.toString()}
          accent={accent}
        />
      </Container>
    </ColumnFlexContainer>
  </ColumnFlexContainer>
);
