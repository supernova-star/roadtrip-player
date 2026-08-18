import React, { FC } from 'react';
import { ListMusic, Wrench } from 'lucide-react';
import { ColumnFlexContainer, RowFlexContainer } from '../uiComponents/container/Container';
import { Typography } from '../uiComponents/typography/Typography';
import { useResponsive } from '@/hooks/useResponsive';
import { useWallpaper } from '@/hooks/useWallpaper';
import { wallpaperQuotes } from '@/constants/wallpapers';
import { Playlist } from '@/types/music';

type HeaderProps = {
  activePlaylist: Playlist;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
};

export const Header: FC<HeaderProps> = ({ activePlaylist, handleClick }) => {
  const { isMobile } = useResponsive();
  const { wallpaper } = useWallpaper();
  const quote = wallpaperQuotes[wallpaper.id] ?? 'Every road has a story.';
  return (
    <RowFlexContainer justifyContent="between" alignItems="start" gap={[7]} margin={[0]}>
      <ColumnFlexContainer gap={[2]}>
        <ColumnFlexContainer
          gap={[3]}
          backgroundColor="var(--background-dark-transparent) "
          padding={isMobile ? [3] : [5]}
          borderRadius={isMobile ? [5] : [8]}
          style={{
            border: `1px solid var(--player-border)`,
            backdropFilter: 'blur(8px)',
          }}
        >
          <Typography
            variant={isMobile ? 'subtitle1' : 'h5'}
            weight="bold"
            color="var(--player-text-primary)"
            sx={{ letterSpacing: '0.35em', textTransform: 'uppercase' }}
          >
            ROADTRIP
          </Typography>
          <Typography
            variant={isMobile ? 'body2' : 'subtitle1'}
            weight="semiBold"
            color="var(--player-text-primary)"
            sx={{ textTransform: 'uppercase', letterSpacing: '0.2em' }}
          >
            {/* MUSIC FOR THE LONG WAY */}
            {wallpaper.name}
          </Typography>
          <Typography
            variant={isMobile ? 'caption' : 'body2'}
            color="var(--player-text-secondary)"
            sx={{
              maxWidth: isMobile ? '240px' : '420px',
              fontStyle: 'italic',
              lineHeight: 1.4,
            }}
          >
            “{quote}”
          </Typography>
          <RowFlexContainer
            alignItems="center"
            gap={isMobile ? [2] : [4]}
            backgroundColor="var(--background-dark-transparent) "
            padding={isMobile ? [1, 2] : [1, 3]}
            borderRadius={[10]}
            style={{
              border: `1px solid var(--player-border)`,
              backdropFilter: 'blur(12px)',
            }}
          >
            <RowFlexContainer alignItems="center" gap={[1]}>
              <ListMusic size={isMobile ? '16px' : '20px'} color="var(--blur-text-accent)" />
              <Typography
                variant={isMobile ? 'body2' : 'subtitle1'}
                weight="semiBold"
                color="var(--blur-text-accent)"
              >
                Now Playing
              </Typography>
            </RowFlexContainer>
            <Typography weight="bold">{activePlaylist.title}</Typography>
          </RowFlexContainer>
        </ColumnFlexContainer>
      </ColumnFlexContainer>
      <RowFlexContainer
        backgroundColor="var(--surface-selected)"
        padding={isMobile ? [3] : [4]}
        borderRadius={[10]}
        cursor="pointer"
        style={{
          border: `1px solid var(--player-border)`,
          backdropFilter: 'blur(10px)',
        }}
        onClick={(event: React.MouseEvent<HTMLElement>) => handleClick(event)}
      >
        <Wrench color="var(--player-text-primary)" size={isMobile ? '12px' : '20px'} />
      </RowFlexContainer>
    </RowFlexContainer>
  );
};
