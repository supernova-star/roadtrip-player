import { Check, Copy, ShoppingCart, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { Avatar, IconButton, MenuItem, Select } from '@mui/material';
import { Button } from '@/components/uiComponents/button/Button';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { type AdminCartSong, useAdminCartStore } from '@/store/adminCartStore';
import {
  type AdminCartPlaylistId,
  adminCartPlaylistSongFileById,
} from '@/store/adminCartPlaylistFiles';
import { playlists } from '@/constants/playlists';
import { colorPalette } from '@/theme/colors';
import type { Song } from '@/types/music';

const escapeStringLiteral = (value: string) =>
  value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

const formatSongObject = (song: Song) => {
  const lines = [
    '  {',
    `    id: '${escapeStringLiteral(song.id)}',`,
    `    title: '${escapeStringLiteral(song.title)}',`,
    `    artist: '${escapeStringLiteral(song.artist)}',`,
  ];

  if (song.album !== undefined) {
    lines.push(`    album: '${escapeStringLiteral(song.album)}',`);
  }

  if (song.coverUrl !== undefined) {
    lines.push(`    coverUrl: '${escapeStringLiteral(song.coverUrl)}',`);
  }

  lines.push(`    audioUrl: '${escapeStringLiteral(song.audioUrl)}',`);

  if (song.duration !== undefined) {
    lines.push(`    duration: ${song.duration},`);
  }

  lines.push('  },');

  return lines.join('\n');
};

const isAdminCartPlaylistId = (
  playlistId: string | null,
): playlistId is AdminCartPlaylistId =>
  Boolean(playlistId && playlistId in adminCartPlaylistSongFileById);

const formatCartSongsForClipboard = (songs: AdminCartSong[]) => {
  const songsByPlaylist = new Map<AdminCartPlaylistId, Song[]>();

  songs.forEach((song) => {
    if (!song.finalSong || !isAdminCartPlaylistId(song.playlistId)) {
      return;
    }

    const playlistSongs = songsByPlaylist.get(song.playlistId) ?? [];
    playlistSongs.push(song.finalSong);
    songsByPlaylist.set(song.playlistId, playlistSongs);
  });

  return Array.from(songsByPlaylist.entries())
    .map(([playlistId, playlistSongs]) => {
      const playlist = playlists.find((item) => item.id === playlistId);
      const playlistSongFile = adminCartPlaylistSongFileById[playlistId];

      return [
        `// ${playlist?.title ?? playlistId}`,
        `// File: ${playlistSongFile.filePath}`,
        `// Export: ${playlistSongFile.songsExport}`,
        playlistSongs.map(formatSongObject).join('\n'),
      ].join('\n');
    })
    .join('\n\n');
};

export const AdminCart = () => {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');
  const songs = useAdminCartStore((state) => state.songs);
  const removeSong = useAdminCartStore((state) => state.removeSong);
  const clearSongs = useAdminCartStore((state) => state.clearSongs);
  const setSongPlaylist = useAdminCartStore((state) => state.setSongPlaylist);

  const handleCopyAll = async () => {
    const clipboardText = formatCartSongsForClipboard(songs);

    await navigator.clipboard.writeText(clipboardText);
    setCopyStatus('copied');
    window.setTimeout(() => setCopyStatus('idle'), 1800);
  };

  const handleDeleteAll = () => {
    if (window.confirm('Clear all songs from the cart?')) {
      clearSongs();
    }
  };

  return (
    <ColumnFlexContainer gap={[6]} flex={1}>
      <RowFlexContainer
        alignItems="start"
        justifyContent="between"
        gap={[3]}
        sx={{ flexWrap: 'wrap' }}
      >
        <ColumnFlexContainer gap={[1]}>
          <Typography variant="h4" weight="bold" color="adminDarkBrown">
            Cart
          </Typography>
          <Typography
            variant="body2"
            color="adminMuted"
            sx={{ lineHeight: 1.6 }}
          >
            Songs ready to add to your library.
          </Typography>
        </ColumnFlexContainer>
        <RowFlexContainer gap={[2]} sx={{ flexWrap: 'wrap' }}>
          <Button
            text={copyStatus === 'copied' ? 'Copied' : 'Copy All'}
            size="small"
            disabled={songs.length === 0}
            iconOptions={{
              icon: copyStatus === 'copied' ? Check : Copy,
              iconColor: 'adminDarkBrown',
            }}
            textOptions={{ textColor: 'adminDarkBrown', textWeight: 'bold' }}
            onClick={handleCopyAll}
            buttonStyles={{
              bgColor: 'adminYellow',
              borderRadius: [1.5],
            }}
          />
          <Button
            text="Delete All"
            size="small"
            disabled={songs.length === 0}
            iconOptions={{ icon: Trash2, iconColor: 'adminSurface' }}
            textOptions={{ textColor: 'adminSurface', textWeight: 'bold' }}
            onClick={handleDeleteAll}
            buttonStyles={{
              bgColor: 'adminDanger',
              borderRadius: [1.5],
            }}
          />
        </RowFlexContainer>
      </RowFlexContainer>

      {songs.length > 0 ? (
        <ColumnFlexContainer
          borderRadius={[2]}
          backgroundColor="adminSurface"
          sx={{
            border: `1px solid ${colorPalette.adminBorder}`,
            overflow: 'auto',
          }}
        >
          {songs.map((song, index) => (
            <ColumnFlexContainer
              key={song.cartItemId}
              padding={[3]}
              sx={{
                borderBottom:
                  index === songs.length - 1
                    ? 0
                    : `1px solid ${colorPalette.adminBorder}`,
              }}
            >
              <RowFlexContainer alignItems="center" gap={[3]}>
                <Avatar
                  variant="rounded"
                  src={song.imageUrl}
                  alt=""
                  sx={{ width: 50, height: 50 }}
                />
                <ColumnFlexContainer flex={1} minWidth="0">
                  <Typography
                    noWrap
                    variant="body2"
                    weight="bold"
                    color="adminDarkBrown"
                  >
                    {song.title}
                  </Typography>
                  <Typography noWrap variant="caption" color="adminMuted">
                    {song.artist}
                  </Typography>
                  {song.playlistId && (
                    <Typography
                      noWrap
                      variant="caption"
                      weight="bold"
                      color="adminBrown"
                    >
                      {
                        playlists.find(
                          (playlist) => playlist.id === song.playlistId,
                        )?.title
                      }
                    </Typography>
                  )}
                </ColumnFlexContainer>
                <IconButton
                  aria-label={`Remove ${song.title} from cart`}
                  title={`Remove ${song.title} from cart`}
                  onClick={() => removeSong(song.cartItemId)}
                  sx={{
                    color: colorPalette.adminSurface,
                    bgcolor: colorPalette.adminDanger,
                    '&:hover': { bgcolor: colorPalette.adminDanger },
                  }}
                >
                  <Trash2 size={18} />
                </IconButton>
              </RowFlexContainer>
              <Select
                fullWidth
                displayEmpty
                value={song.playlistId ?? ''}
                onChange={(event) =>
                  setSongPlaylist(song.cartItemId, event.target.value)
                }
                inputProps={{
                  'aria-label': `Choose playlist for ${song.title}`,
                }}
                sx={{
                  mt: 1.5,
                  borderRadius: 1.5,
                  color: colorPalette.adminDarkBrown,
                  bgcolor: colorPalette.adminBackground,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: colorPalette.adminBorder,
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: colorPalette.adminYellow,
                  },
                  '& .MuiSelect-icon': { color: colorPalette.adminBrown },
                }}
                MenuProps={{
                  slotProps: {
                    paper: {
                      sx: {
                        maxHeight: 320,
                        bgcolor: colorPalette.adminSurface,
                        '& .MuiMenuItem-root.Mui-selected': {
                          bgcolor: colorPalette.adminBackground,
                        },
                      },
                    },
                  },
                }}
              >
                <MenuItem value="" disabled>
                  Choose playlist
                </MenuItem>
                {playlists.map((playlist) => (
                  <MenuItem key={playlist.id} value={playlist.id}>
                    {playlist.title}
                  </MenuItem>
                ))}
              </Select>
            </ColumnFlexContainer>
          ))}
        </ColumnFlexContainer>
      ) : (
        <ColumnFlexContainer
          padding={[8]}
          borderRadius={[2]}
          textAlign="center"
          justifyContent="center"
          alignItems="center"
          flex={1}
          backgroundColor="adminSurface"
          sx={{ border: `1px dashed ${colorPalette.adminBorder}` }}
        >
          <ShoppingCart size={26} color={colorPalette.adminYellow} />
          <Typography
            variant="subtitle2"
            weight="bold"
            color="adminDarkBrown"
            sx={{ mt: 1 }}
          >
            Your cart is empty
          </Typography>
          <Typography variant="body2" color="adminMuted" textAlign="center">
            Add songs from Search Songs to see them here.
          </Typography>
        </ColumnFlexContainer>
      )}
    </ColumnFlexContainer>
  );
};
