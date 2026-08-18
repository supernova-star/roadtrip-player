import React, { FC, useMemo, useState } from 'react';
import { ArrowLeft, ListMusic } from 'lucide-react';
import { useResponsive } from '@/hooks/useResponsive';
import { useWallpaper } from '@/hooks/useWallpaper';
import { playlists } from '@/constants/playlists';
import { songs } from '@/constants/songs';
import { usePlayerStore } from '@/store/playerStore';
import Container, {
  ColumnFlexContainer,
  RowFlexContainer,
} from '../uiComponents/container/Container';
import { Typography } from '../uiComponents/typography/Typography';
import { Button } from '../uiComponents/button/Button';
import { Playlist, Song } from '@/types/music';
import { SongCard } from './songCard/SongCard';
import {
  DesktopPlaylistViewCard,
  MobilePlaylistViewCard,
} from './playlistViewCard/PlaylistViewCard';
import { percentToHex } from '@/utils/formatter';

type PlaylistModalProps = {
  onCancel: () => void;
};

export const PlaylistModal: FC<PlaylistModalProps> = ({ onCancel }) => {
  const { isMobile } = useResponsive();
  const { wallpaper: currentWallpaper, isLightMode } = useWallpaper();
  const selectedPlaylistId = usePlayerStore((state) => state.currentPlaylistId);
  const setCurrentPlaylistId = usePlayerStore((state) => state.setCurrentPlaylistId);
  const setQueue = usePlayerStore((state) => state.setQueue);
  const playSong = usePlayerStore((state) => state.playSong);
  const [showSongList, setShowSongList] = useState(false);

  const panelBackground = isLightMode
    ? 'var(--background-dark-transparent)'
    : 'var(--background-transparent)';

  const songsById = useMemo(() => {
    return new Map(songs.map((song) => [song.id, song]));
  }, []);

  const selectedPlaylist = useMemo(
    () => playlists.find((playlist) => playlist.id === selectedPlaylistId) ?? playlists[0],
    [selectedPlaylistId]
  );

  const getSongsForPlaylist = (playlist: Playlist): Song[] => {
    return playlist.songIds
      .map((songId) => songsById.get(songId))
      .filter((song): song is Song => Boolean(song));
  };

  const selectedPlaylistSongs = useMemo<Song[]>(() => {
    if (!selectedPlaylist) return [];
    return getSongsForPlaylist(selectedPlaylist);
  }, [selectedPlaylist]);

  const handleSelectPlaylist = (playlistId: string) => {
    setCurrentPlaylistId(playlistId);
    if (isMobile) setShowSongList(true);
  };

  const handlePlayPlaylist = (playlist: Playlist) => {
    const playlistSongs = getSongsForPlaylist(playlist);
    if (playlistSongs.length === 0) return;

    handleSelectPlaylist(playlist.id);
    setQueue(playlistSongs);
    playSong(playlistSongs[0]);
  };

  const handlePlaySongFromPlaylist = (playlist: Playlist, song: Song) => {
    const playlistSongs = getSongsForPlaylist(playlist);
    if (playlistSongs.length === 0) return;

    handleSelectPlaylist(playlist.id);
    setQueue(playlistSongs);
    playSong(song);
  };

  const modalBackgroundColor = isLightMode
    ? percentToHex(currentWallpaper.theme.playerBackground, 85)
    : percentToHex(currentWallpaper.theme.playerBackground, 10);

  return (
    <ColumnFlexContainer
      padding={isMobile ? [6] : [4]}
      backgroundColor={modalBackgroundColor}
      width={isMobile ? '90vw' : '700px'}
      height={isMobile ? '100%' : undefined}
      borderRadius={[2]}
      position="relative"
      style={{
        overflow: 'hidden',
        isolation: 'isolate',
        backdropFilter: 'blur(14px)',
        border: '1px solid var(--player-border)',
      }}
      gap={[3]}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          // backgroundImage: `url(${currentWallpaper.src})`,
          // backgroundSize: 'cover',
          // backgroundPosition: 'center',
          filter: 'blur(12px)',
          transform: 'scale(1.1)',
          zIndex: -1,
        }}
      />
      {/* <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'var(--surface-chip)',
          zIndex: -1,
        }}
      /> */}

      <RowFlexContainer alignItems="start" gap={isMobile ? [2] : [4]}>
        <ListMusic
          size={isMobile ? '24px' : '32px'}
          style={{ marginTop: '4px', color: 'var(--player-text-primary)' }}
        />
        <ColumnFlexContainer>
          <Typography
            variant={isMobile ? 'button' : 'h6'}
            weight="semiBold"
            color="var(--player-text-primary)"
          >
            PLAYLIST LIBRARY
          </Typography>
          <Typography variant={isMobile ? 'legal' : 'caption'} color="var(--player-text-secondary)">
            Browse all playlists and see songs in each playlist.
          </Typography>
        </ColumnFlexContainer>
      </RowFlexContainer>

      <Container
        display="flex"
        flexDirection={isMobile ? 'column' : 'row'}
        gap={[3]}
        flex={isMobile ? 1 : undefined}
        style={isMobile ? { minHeight: 0 } : undefined}
      >
        <Container
          display="flex"
          flexDirection="column"
          width={isMobile ? '100%' : '34%'}
          flex={isMobile ? 1 : undefined}
          gap={[2]}
          maxHeight={isMobile ? 'none' : '420px'}
          overflow="auto"
          padding={[1]}
          borderRadius={[2]}
          backgroundColor={panelBackground}
          hideScrollbar
          style={
            isMobile
              ? {
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                  alignContent: 'start',
                  ...(showSongList ? { display: 'none' } : {}),
                }
              : undefined
          }
        >
          {playlists.map((playlist) => {
            const isSelected = playlist.id === selectedPlaylist?.id;
            return isMobile ? (
              <MobilePlaylistViewCard
                key={playlist.id}
                playlist={playlist}
                isSelected={isSelected}
                onSelectPlaylist={handleSelectPlaylist}
                handlePlayButtonClick={(event) => {
                  event.stopPropagation();
                  handlePlayPlaylist(playlist);
                }}
              />
            ) : (
              <DesktopPlaylistViewCard
                key={playlist.id}
                playlist={playlist}
                isSelected={isSelected}
                onSelectPlaylist={handleSelectPlaylist}
                handlePlayButtonClick={(
                  event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
                ) => {
                  event.stopPropagation();
                  handlePlayPlaylist(playlist);
                }}
              />
            );
          })}
        </Container>

        <ColumnFlexContainer
          flex={1}
          gap={[2]}
          maxHeight={isMobile ? 'none' : '420px'}
          overflow="auto"
          padding={[1, 2]}
          style={{
            border: '1px solid var(--player-border)',
            borderRadius: '10px',
            background: panelBackground,
            minHeight: 0,
            height: isMobile ? '100%' : undefined,
            ...(isMobile && !showSongList ? { display: 'none' } : {}),
          }}
          hideScrollbar
        >
          {isMobile && (
            <Button
              text="All playlists"
              size="xSmall"
              variant="text"
              iconOptions={{
                icon: ArrowLeft,
                iconColor: 'var(--player-text-primary)',
              }}
              textOptions={{
                textColor: 'var(--player-text-primary)',
                textVariant: 'caption',
              }}
              buttonStyles={{ borderRadius: [2] }}
              onClick={() => setShowSongList(false)}
            />
          )}

          {selectedPlaylist && (
            <ColumnFlexContainer gap={[1]} padding={[1, 1, 2]}>
              <Typography variant="subtitle1" color="var(--player-text-primary)" weight="semiBold">
                {selectedPlaylist.title}
              </Typography>
              <Typography variant="legal" color="var(--player-text-secondary)">
                {selectedPlaylist.description || 'Playlist songs'}
              </Typography>
            </ColumnFlexContainer>
          )}

          {selectedPlaylistSongs.map((song, index) => (
            <SongCard
              key={song.id}
              song={song}
              serialNumber={index + 1}
              isMobile={isMobile}
              selectedPlaylist={selectedPlaylist}
              handlePlaySongFromPlaylist={handlePlaySongFromPlaylist}
            />
          ))}

          {selectedPlaylistSongs.length === 0 && (
            <RowFlexContainer
              alignItems="center"
              justifyContent="center"
              padding={[4, 2]}
              style={{ border: '1px dashed var(--player-border)', borderRadius: '10px' }}
            >
              <Typography variant="body2" color="var(--player-text-secondary)">
                No songs found for this playlist.
              </Typography>
            </RowFlexContainer>
          )}
        </ColumnFlexContainer>
      </Container>

      <RowFlexContainer width="100%" justifyContent="end" gap={[2]} margin={[1, 0, 0]}>
        <Button
          text="Close"
          size="small"
          variant="outlined"
          textOptions={{ textColor: 'var(--player-text-primary)', textVariant: 'button' }}
          buttonStyles={{ bgColor: 'var(--player-border)', borderRadius: [2] }}
          onClick={onCancel}
        />
      </RowFlexContainer>
    </ColumnFlexContainer>
  );
};
