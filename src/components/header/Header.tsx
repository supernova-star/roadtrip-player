import React, { FC, useEffect, useState } from 'react';
import { CassetteTape, ListMusic, Sparkles, Wrench } from 'lucide-react';
import {
  ColumnFlexContainer,
  Container,
  RowFlexContainer,
} from '../uiComponents/container/Container';
import { Typography } from '../uiComponents/typography/Typography';
import { useResponsive } from '@/hooks/useResponsive';
import { useWallpaper } from '@/hooks/useWallpaper';
import { wallpaperQuotes } from '@/constants/wallpapers';
import { useDisplayPreferencesStore } from '@/store/displayPreferencesStore';
import { Playlist } from '@/types/music';
import { formatClockTime } from '@/utils/formatter';

type HeaderProps = {
  activePlaylist: Playlist;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  isFavorites?: boolean;
  favoriteSongCount?: number;
  displayOptions?: {
    showHeaderCard: boolean;
    showHeaderNowPlaying: boolean;
    showHeaderQuote: boolean;
    showHeaderClock: boolean;
  };
};

export const Header: FC<HeaderProps> = ({
  activePlaylist,
  handleClick,
  isFavorites = false,
  favoriteSongCount = 0,
  displayOptions,
}) => {
  const { isMobile } = useResponsive();
  const { wallpaper } = useWallpaper();
  const storedShowHeaderCard = useDisplayPreferencesStore((state) => state.showHeaderCard);
  const storedShowHeaderNowPlaying = useDisplayPreferencesStore(
    (state) => state.showHeaderNowPlaying
  );
  const storedShowHeaderQuote = useDisplayPreferencesStore((state) => state.showHeaderQuote);
  const storedShowHeaderClock = useDisplayPreferencesStore((state) => state.showHeaderClock);
  const showHeaderCard = displayOptions?.showHeaderCard ?? storedShowHeaderCard;
  const showHeaderNowPlaying = displayOptions?.showHeaderNowPlaying ?? storedShowHeaderNowPlaying;
  const showHeaderQuote = displayOptions?.showHeaderQuote ?? storedShowHeaderQuote;
  const showHeaderClock = displayOptions?.showHeaderClock ?? storedShowHeaderClock;
  const quote = wallpaperQuotes[wallpaper.id] ?? 'Every road has a story.';
  const playlistTitle = isFavorites ? 'Favorites' : activePlaylist.title;
  const songCount = isFavorites ? favoriteSongCount : activePlaylist.songIds.length;
  const [clockDate, setClockDate] = useState(new Date());

  useEffect(() => {
    if (!showHeaderClock) return undefined;

    const timer = window.setInterval(() => setClockDate(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, [showHeaderClock]);

  const headerClockText = formatClockTime(clockDate, {
    timeFormat: '12-hour',
    showSeconds: false,
    showAmPm: true,
  });

  if (!showHeaderCard) {
    return isMobile ? null : (
      <RowFlexContainer justifyContent="end" alignItems="start" width="100%" margin={[0]}>
        <RowFlexContainer
          backgroundColor="var(--surface-selected)"
          padding={[4]}
          borderRadius={[10]}
          cursor="pointer"
          style={{
            border: `1px solid var(--player-border)`,
            backdropFilter: 'blur(10px)',
          }}
          onClick={(event: React.MouseEvent<HTMLElement>) => handleClick(event)}
        >
          <Wrench color="var(--player-text-primary)" size="20px" />
        </RowFlexContainer>
      </RowFlexContainer>
    );
  }

  return (
    <RowFlexContainer
      justifyContent="between"
      alignItems="start"
      gap={[7]}
      width="100%"
      margin={[0]}
    >
      <ColumnFlexContainer gap={[2]} width={isMobile ? '100%' : undefined}>
        <ColumnFlexContainer
          gap={isMobile ? [3] : [4]}
          padding={isMobile ? [4] : [5]}
          borderRadius={isMobile ? [5] : [8]}
          width={isMobile ? '100%' : undefined}
          style={{
            border: `1px solid var(--player-border)`,
            background: 'var(--header-glass-background)',
            backdropFilter: 'blur(18px) saturate(1.08)',
            boxShadow: 'var(--header-glass-shadow)',
          }}
        >
          <RowFlexContainer
            alignItems="center"
            justifyContent={isMobile ? 'start' : 'between'}
            gap={[3]}
            flexWrap={isMobile ? 'wrap' : undefined}
          >
            <RowFlexContainer
              alignItems="center"
              gap={[2]}
              minWidth={[0]}
              width={isMobile ? '100%' : undefined}
            >
              <RowFlexContainer
                alignItems="center"
                justifyContent="center"
                width={isMobile ? [8] : [10]}
                height={isMobile ? [8] : [10]}
                borderRadius={[2]}
                style={{
                  backgroundColor: 'var(--header-chip-background)',
                  border: '1px solid var(--player-border)',
                  flexShrink: 0,
                }}
              >
                <CassetteTape size={isMobile ? '18px' : '22px'} color="var(--player-accent)" />
              </RowFlexContainer>
              <ColumnFlexContainer gap={[0]} minWidth={[0]}>
                <Typography
                  variant={isMobile ? 'subtitle1' : 'h5'}
                  weight="bold"
                  color="var(--player-text-primary)"
                  sx={{ letterSpacing: '0.08em' }}
                >
                  Casette
                </Typography>
                <Typography
                  variant="caption"
                  weight="semiBold"
                  color="var(--player-text-secondary)"
                  sx={{
                    letterSpacing: isMobile ? '0.12em' : '0.18em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Music for the road
                </Typography>
              </ColumnFlexContainer>
            </RowFlexContainer>
            <RowFlexContainer
              alignItems="center"
              gap={[1]}
              padding={[1, 2]}
              borderRadius={[10]}
              style={{
                backgroundColor: 'var(--header-chip-background)',
                border: '1px solid var(--player-border)',
                flexShrink: 0,
                maxWidth: isMobile ? '100%' : undefined,
              }}
            >
              <Sparkles size={isMobile ? '13px' : '15px'} color="var(--player-accent)" />
              <Typography
                variant="caption"
                weight="semiBold"
                color="var(--player-accent)"
                sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
              >
                {wallpaper.mood}
              </Typography>
            </RowFlexContainer>
            {showHeaderClock && (
              <RowFlexContainer
                alignItems="center"
                padding={[1, 2]}
                borderRadius={[10]}
                style={{
                  backgroundColor: 'var(--header-chip-background)',
                  border: '1px solid var(--player-border)',
                  flexShrink: 0,
                }}
              >
                <Typography
                  variant="caption"
                  weight="bold"
                  color="var(--player-text-primary)"
                  sx={{ fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}
                >
                  {headerClockText}
                </Typography>
              </RowFlexContainer>
            )}
          </RowFlexContainer>

          {showHeaderQuote && (
            <ColumnFlexContainer gap={[1]}>
              <Typography
                variant={isMobile ? 'body2' : 'subtitle1'}
                weight="semiBold"
                color="var(--player-text-primary)"
                sx={{
                  textTransform: 'uppercase',
                  letterSpacing: isMobile ? '0.16em' : '0.2em',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {wallpaper.name}
              </Typography>
              <Typography
                variant={isMobile ? 'caption' : 'body2'}
                color="var(--player-text-secondary)"
                sx={{
                  maxWidth: isMobile ? '280px' : '460px',
                  fontStyle: 'italic',
                  lineHeight: 1.45,
                }}
              >
                “{quote}”
              </Typography>
            </ColumnFlexContainer>
          )}

          {showHeaderNowPlaying && (
            <>
              <Container
                height="1px"
                width="100%"
                sx={{
                  background: 'linear-gradient(90deg, var(--player-accent), transparent)',
                  opacity: 0.72,
                }}
              />

              <RowFlexContainer
                alignItems="center"
                justifyContent={isMobile ? 'start' : 'between'}
                gap={isMobile ? [2] : [4]}
                padding={isMobile ? [2, 3] : [2, 4]}
                borderRadius={[10]}
                flexWrap={isMobile ? 'wrap' : undefined}
                style={{
                  border: `1px solid var(--player-border)`,
                  backgroundColor: 'var(--header-chip-background)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <RowFlexContainer alignItems="center" gap={[2]} minWidth={[0]}>
                  <ListMusic size={isMobile ? '16px' : '20px'} color="var(--blur-text-accent)" />
                  <Typography
                    variant={isMobile ? 'body2' : 'subtitle1'}
                    weight="semiBold"
                    color="var(--blur-text-accent)"
                    sx={{ whiteSpace: 'nowrap' }}
                  >
                    Now Playing
                  </Typography>
                </RowFlexContainer>
                <RowFlexContainer
                  alignItems="baseline"
                  gap={[2]}
                  minWidth={[0]}
                  flex={1}
                  justifyContent={isMobile ? 'start' : 'end'}
                >
                  <Typography
                    variant={isMobile ? 'body2' : 'subtitle1'}
                    weight="bold"
                    color="var(--player-text-primary)"
                    sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                  >
                    {playlistTitle}
                  </Typography>
                  <Typography variant="caption" color="var(--player-text-secondary)">
                    {songCount} songs
                  </Typography>
                </RowFlexContainer>
              </RowFlexContainer>
            </>
          )}
        </ColumnFlexContainer>
      </ColumnFlexContainer>
      {!isMobile && (
        <RowFlexContainer
          backgroundColor="var(--surface-selected)"
          padding={[4]}
          borderRadius={[10]}
          cursor="pointer"
          style={{
            border: `1px solid var(--player-border)`,
            backdropFilter: 'blur(10px)',
          }}
          onClick={(event: React.MouseEvent<HTMLElement>) => handleClick(event)}
        >
          <Wrench color="var(--player-text-primary)" size="20px" />
        </RowFlexContainer>
      )}
    </RowFlexContainer>
  );
};
