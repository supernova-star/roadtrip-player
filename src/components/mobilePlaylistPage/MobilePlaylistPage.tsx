import React, { useState } from 'react';
import {
  ListMusic,
  Play,
  Pause,
  ChevronRight,
  Heart,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/uiComponents/button/Button';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { playlists } from '@/constants/playlists';
import { songs } from '@/constants/songs';
import { usePlayerStore } from '@/store/playerStore';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useCustomPlaylistsStore } from '@/store/customPlaylistsStore';
import { MobilePlaylistDetailPage } from './MobilePlaylistDetailPage';
import { useMobileHistoryView } from '@/hooks/useMobileHistoryView';
import { useMobilePageSurface } from '@/hooks/useMobilePageSurface';
import { useWallpaper } from '@/hooks/useWallpaper';
import { getSongsByIds } from '@/utils/music';
import { MobileCustomPlaylistEmptyState } from './MobileCustomPlaylistEmptyState';
import { MobileCreateCustomPlaylistPage } from './MobileCreateCustomPlaylistPage';

export const MobilePlaylistPage: React.FC = () => {
  const [activePlaylistTab, setActivePlaylistTab] = useState<
    'default' | 'custom'
  >('default');
  const currentPlaylistId = usePlayerStore((state) => state.currentPlaylistId);
  const setCurrentPlaylistId = usePlayerStore(
    (state) => state.setCurrentPlaylistId,
  );
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const setQueue = usePlayerStore((state) => state.setQueue);
  const playSong = usePlayerStore((state) => state.playSong);
  const pause = usePlayerStore((state) => state.pause);
  const favoriteSongCount = useFavoritesStore(
    (state) => state.favoriteSongIds.length,
  );
  const customPlaylists = useCustomPlaylistsStore(
    (state) => state.customPlaylists,
  );
  const { isLightMode } = useWallpaper();
  const selectedRowBackground = isLightMode
    ? 'var(--background-dark-transparent)'
    : 'var(--surface-selected)';
  const mobilePageSurface = useMobilePageSurface();
  const {
    activeView: activePlaylistView,
    openView: openPlaylist,
    closeView: closePlaylist,
    replaceView: replacePlaylistView,
  } = useMobileHistoryView<string>('mobilePlaylistView');

  if (activePlaylistView === 'create-custom') {
    return (
      <MobileCreateCustomPlaylistPage
        onBack={closePlaylist}
        onCreated={(playlistId) => {
          setActivePlaylistTab('custom');
          replacePlaylistView(playlistId);
        }}
      />
    );
  }

  if (activePlaylistView === 'favorites') {
    return <MobilePlaylistDetailPage isFavorites onBack={closePlaylist} />;
  }

  if (activePlaylistView) {
    return (
      <MobilePlaylistDetailPage
        playlistId={activePlaylistView}
        onBack={closePlaylist}
      />
    );
  }

  return (
    <ColumnFlexContainer
      gap={[4]}
      padding={[8, 5, 37]}
      width="100%"
      height="100vh"
      style={mobilePageSurface}
    >
      <Typography
        variant="h5"
        weight="bold"
        color="var(--player-text-primary)"
        sx={{ flexShrink: 0 }}
      >
        Playlists
      </Typography>
      <RowFlexContainer
        alignItems="center"
        justifyContent="between"
        gap={[3]}
        padding={[3]}
        borderRadius={[3]}
        cursor="pointer"
        onClick={() => openPlaylist('favorites')}
      >
        <RowFlexContainer alignItems="center" gap={[3]} flex={1} minWidth={[0]}>
          <RowFlexContainer
            alignItems="center"
            justifyContent="center"
            width={[14]}
            height={[14]}
            borderRadius={[3]}
            style={{
              backgroundColor: 'var(--background-dark-transparent)',
              border: '1px solid var(--player-border)',
              flexShrink: 0,
            }}
          >
            <Heart
              size="22px"
              color="var(--player-accent)"
              fill="var(--player-accent)"
            />
          </RowFlexContainer>
          <ColumnFlexContainer gap={[1]} minWidth={[0]}>
            <Typography
              variant="body1"
              weight="semiBold"
              color="var(--player-text-primary)"
            >
              Favorites
            </Typography>
            <Typography variant="caption" color="var(--player-text-secondary)">
              {favoriteSongCount} songs
            </Typography>
          </ColumnFlexContainer>
        </RowFlexContainer>

        <RowFlexContainer
          alignItems="center"
          justifyContent="center"
          width={[10]}
          height={[10]}
          cursor="pointer"
        >
          <ChevronRight size="18px" color="var(--player-text-secondary)" />
        </RowFlexContainer>
      </RowFlexContainer>
      <RowFlexContainer
        role="tablist"
        gap={[1]}
        padding={[1]}
        borderRadius={[3]}
        sx={{
          flexShrink: 0,
          backgroundColor: 'var(--background-dark-transparent)',
          border: '1px solid var(--player-border)',
        }}
      >
        <PlaylistTab
          active={activePlaylistTab === 'default'}
          label={`Default Playlists (${playlists.length})`}
          onClick={() => setActivePlaylistTab('default')}
        />
        <PlaylistTab
          active={activePlaylistTab === 'custom'}
          label={`Custom Playlists (${customPlaylists.length})`}
          onClick={() => setActivePlaylistTab('custom')}
        />
      </RowFlexContainer>
      <ColumnFlexContainer
        role="tabpanel"
        gap={[1]}
        flex={1}
        minHeight="0px"
        overflow="auto"
        hideScrollbar
      >
        {activePlaylistTab === 'default' &&
          playlists.map((playlist) => {
            const isActive = playlist.id === currentPlaylistId;
            const isPlaylistPlaying = isActive && isPlaying;

            const handlePlayClick = (event: React.MouseEvent) => {
              event.stopPropagation();
              if (isPlaylistPlaying) {
                pause();
                return;
              }
              const songDetails = getSongsByIds(playlist.songIds, songs);
              if (songDetails.length === 0) return;
              setCurrentPlaylistId(playlist.id);
              setQueue(songDetails);
              playSong(songDetails[0]);
            };

            return (
              <RowFlexContainer
                key={playlist.id}
                alignItems="center"
                justifyContent="between"
                gap={[3]}
                padding={[3]}
                borderRadius={[3]}
                cursor="pointer"
                backgroundColor={
                  isActive ? selectedRowBackground : 'transparent'
                }
                onClick={() => openPlaylist(playlist.id)}
              >
                <RowFlexContainer
                  alignItems="center"
                  gap={[3]}
                  flex={1}
                  minWidth={[0]}
                >
                  <RowFlexContainer
                    alignItems="center"
                    justifyContent="center"
                    width={[14]}
                    height={[14]}
                    borderRadius={[3]}
                    style={{
                      backgroundColor: 'var(--background-dark-transparent)',
                      border: '1px solid var(--player-border)',
                      flexShrink: 0,
                    }}
                  >
                    <ListMusic size="22px" color="var(--player-accent)" />
                  </RowFlexContainer>
                  <ColumnFlexContainer gap={[1]} minWidth={[0]}>
                    <Typography
                      variant="body1"
                      weight="semiBold"
                      color="var(--player-text-primary)"
                      sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {playlist.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="var(--player-text-secondary)"
                    >
                      {playlist.songIds.length} songs
                    </Typography>
                  </ColumnFlexContainer>
                </RowFlexContainer>

                <RowFlexContainer alignItems="center" gap={[3]}>
                  <RowFlexContainer
                    alignItems="center"
                    justifyContent="center"
                    width={[10]}
                    height={[10]}
                    cursor="pointer"
                    style={{
                      borderRadius: '999px',
                      backgroundColor: isActive
                        ? 'var(--player-accent)'
                        : 'var(--background-dark-transparent)',
                      flexShrink: 0,
                    }}
                    onClick={handlePlayClick}
                  >
                    {isPlaylistPlaying ? (
                      <Pause
                        size="14px"
                        color="var(--player-background)"
                        fill="var(--player-background)"
                      />
                    ) : (
                      <Play
                        size="14px"
                        color={
                          isActive
                            ? 'var(--player-background)'
                            : 'var(--player-text-primary)'
                        }
                        fill={isActive ? 'var(--player-background)' : 'none'}
                      />
                    )}
                  </RowFlexContainer>
                  <RowFlexContainer
                    alignItems="center"
                    justifyContent="center"
                    width={[10]}
                    height={[10]}
                    cursor="pointer"
                  >
                    <ChevronRight
                      size="18px"
                      color="var(--player-text-secondary)"
                    />
                  </RowFlexContainer>
                </RowFlexContainer>
              </RowFlexContainer>
            );
          })}
        {activePlaylistTab === 'custom' && customPlaylists.length === 0 && (
          <MobileCustomPlaylistEmptyState
            onCreate={() => openPlaylist('create-custom')}
          />
        )}
        {activePlaylistTab === 'custom' && customPlaylists.length > 0 && (
          <RowFlexContainer justifyContent="end" padding={[1, 0]}>
            <Button
              text="Create Custom Playlist"
              size="small"
              iconOptions={{
                icon: Plus,
                iconColor: 'var(--player-background)',
              }}
              textOptions={{
                textColor: 'var(--player-background)',
                textWeight: 'bold',
              }}
              buttonStyles={{
                bgColor: 'var(--player-accent)',
                borderRadius: [3],
                width: 'fullWidth',
              }}
              onClick={() => openPlaylist('create-custom')}
            />
          </RowFlexContainer>
        )}
        {activePlaylistTab === 'custom' &&
          customPlaylists.map((playlist) => (
            <RowFlexContainer
              key={playlist.id}
              alignItems="center"
              justifyContent="between"
              gap={[3]}
              padding={[3]}
              borderRadius={[3]}
              cursor="pointer"
              onClick={() => openPlaylist(playlist.id)}
            >
              <RowFlexContainer
                alignItems="center"
                gap={[3]}
                flex={1}
                minWidth={[0]}
              >
                <RowFlexContainer
                  alignItems="center"
                  justifyContent="center"
                  width={[14]}
                  height={[14]}
                  borderRadius={[3]}
                  style={{
                    backgroundColor: 'var(--background-dark-transparent)',
                    border: '1px solid var(--player-border)',
                    flexShrink: 0,
                  }}
                >
                  <ListMusic size="22px" color="var(--player-accent)" />
                </RowFlexContainer>
                <ColumnFlexContainer gap={[1]} minWidth={[0]}>
                  <Typography
                    variant="body1"
                    weight="semiBold"
                    color="var(--player-text-primary)"
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {playlist.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="var(--player-text-secondary)"
                  >
                    {playlist.songIds.length} songs
                  </Typography>
                </ColumnFlexContainer>
              </RowFlexContainer>
              <ChevronRight size="18px" color="var(--player-text-secondary)" />
            </RowFlexContainer>
          ))}
      </ColumnFlexContainer>
    </ColumnFlexContainer>
  );
};

type PlaylistTabProps = {
  active: boolean;
  label: string;
  onClick: () => void;
};

const PlaylistTab: React.FC<PlaylistTabProps> = ({
  active,
  label,
  onClick,
}) => (
  <RowFlexContainer
    role="tab"
    aria-selected={active}
    tabIndex={active ? 0 : -1}
    alignItems="center"
    justifyContent="center"
    flex={1}
    minWidth={[0]}
    padding={[2]}
    borderRadius={[2]}
    cursor="pointer"
    onClick={onClick}
    onKeyDown={(event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onClick();
      }
    }}
    backgroundColor={active ? 'var(--surface-selected)' : 'transparent'}
  >
    <Typography
      variant="caption"
      weight="semiBold"
      color={
        active ? 'var(--player-text-primary)' : 'var(--player-text-secondary)'
      }
      sx={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {label}
    </Typography>
  </RowFlexContainer>
);
