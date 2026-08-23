import React from 'react';
import { CassetteTape } from 'lucide-react';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { percentToHex } from '@/utils/formatter';

type CurrentPlaylistCardProps = {
  accent: string;
  isLightMode: boolean;
  currentPlaylistTitle: string;
  currentPlaylistSongCount: number;
};

export const CurrentPlaylistCard: React.FC<CurrentPlaylistCardProps> = ({
  accent,
  isLightMode,
  currentPlaylistTitle,
  currentPlaylistSongCount,
}) => (
  <ColumnFlexContainer gap={[3]}>
    <Typography variant="body1" weight="semiBold" color="var(--player-text-secondary)">
      Now Selected
    </Typography>

    <RowFlexContainer
      alignItems="center"
      gap={[4]}
      padding={[4]}
      style={{
        borderRadius: '12px',
        backgroundColor: isLightMode ? 'var(--background-transparent)' : 'var(--surface-panel)',
        border: '1px solid var(--player-border)',
      }}
    >
      <RowFlexContainer
        alignItems="center"
        justifyContent="center"
        width={[14]}
        height={[14]}
        borderRadius={[3]}
        style={{
          backgroundColor: percentToHex(accent, 12),
          flexShrink: 0,
        }}
      >
        <CassetteTape size="24px" color="var(--player-accent)" />
      </RowFlexContainer>

      <ColumnFlexContainer gap={[1]} flex={1} minWidth={[0]}>
        <Typography variant="caption" weight="semiBold" color="var(--player-text-secondary)">
          CURRENT PLAYLIST
        </Typography>
        <Typography
          variant="body1"
          weight="bold"
          color="var(--player-text-primary)"
          sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {currentPlaylistTitle}
        </Typography>
        <Typography variant="caption" color="var(--player-text-secondary)">
          {currentPlaylistSongCount} {currentPlaylistSongCount === 1 ? 'song' : 'songs'}
        </Typography>
      </ColumnFlexContainer>
    </RowFlexContainer>
  </ColumnFlexContainer>
);
