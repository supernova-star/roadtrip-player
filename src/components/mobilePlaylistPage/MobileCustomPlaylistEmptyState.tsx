import { ListMusic, Plus, Sparkles } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/uiComponents/button/Button';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';

type MobileCustomPlaylistEmptyStateProps = {
  onCreate: () => void;
};

export const MobileCustomPlaylistEmptyState: React.FC<
  MobileCustomPlaylistEmptyStateProps
> = ({ onCreate }) => (
  <ColumnFlexContainer
    alignItems="center"
    justifyContent="center"

    width="100%"
    height="100%"
    minHeight="0px"
    padding={[8, 5]}
    borderRadius={[4]}
    sx={{
      border: '1px solid var(--player-border)',
      backgroundColor: 'var(--background-dark-transparent)',
    }}
  >
    <ColumnFlexContainer alignItems="center" gap={[5]} justifyContent="center">
      <RowFlexContainer
        alignItems="center"
        justifyContent="center"
        position="relative"
        width={[18]}
        height={[18]}
      >
        <ListMusic size="42px" color="var(--player-accent)" />
        <Sparkles
          size="23px"
          color="var(--player-accent)"
          style={{ position: 'absolute', top: 0, right: 0 }}
        />
      </RowFlexContainer>
      <ColumnFlexContainer alignItems="center" gap={[2]}>
        <Typography
          variant="body1"
          weight="semiBold"
          color="var(--player-text-primary)"
          textAlign="center"
        >
          No custom playlists yet
        </Typography>
        <Typography
          variant="body2"
          color="var(--player-text-secondary)"
          textAlign="center"
          sx={{ maxWidth: '280px', lineHeight: 1.5 }}
        >
          Create your own mix based on your mood using songs from your library.
        </Typography>
      </ColumnFlexContainer>
      <Button
        text="Create Custom Playlist"
        fullWidth
        iconOptions={{ icon: Plus, iconColor: 'var(--player-background)' }}
        textOptions={{
          textColor: 'var(--player-background)',
          textWeight: 'bold',
        }}
        buttonStyles={{ bgColor: 'var(--player-accent)', borderRadius: [4] }}
        onClick={onCreate}
      />
    </ColumnFlexContainer>
  </ColumnFlexContainer>
);
