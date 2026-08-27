import React from 'react';
import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { type AdminSearchSong } from '@/store/adminSearchStore';
import { colorPalette } from '@/theme/colors';

export type SongDetailsModalProps = {
  song: AdminSearchSong | null;
  onClose: () => void;
  inPlaylistAlready: boolean;
  playlistName?: string;
  playlistId?: string;
  localSongId?: string;
};

export const SongDetailsModal: React.FC<SongDetailsModalProps> = ({
  song,
  onClose,
  inPlaylistAlready,
  playlistName,
  playlistId,
  localSongId,
}) => (
  <Dialog
    open={Boolean(song)}
    onClose={onClose}
    maxWidth="sm"
    fullWidth
    slotProps={{
      paper: {
        sx: {
          borderRadius: 3,
          bgcolor: colorPalette.adminSurface,
          border: `1px solid ${colorPalette.adminBorder}`,
        },
      },
    }}
  >
    {song && (
      <>
        <DialogTitle
          sx={{
            pb: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: colorPalette.adminDarkBrown,
          }}
        >
          Song details
          <IconButton
            aria-label="Close song details"
            onClick={onClose}
            sx={{ color: colorPalette.adminBrown }}
          >
            ×
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 2, pb: 3 }}>
          <ColumnFlexContainer gap={[2]}>
            <RowFlexContainer alignItems="center" gap={[2]}>
              <Avatar
                variant="rounded"
                src={song.imageUrl}
                alt=""
                sx={{ width: 54, height: 54 }}
              />
              <ColumnFlexContainer flex={1} minWidth="0">
                <Typography variant="h6" weight="bold" color="adminDarkBrown">
                  {song.title}
                </Typography>
                <Typography variant="body2" color="adminMuted">
                  {song.artist}
                </Typography>
              </ColumnFlexContainer>
            </RowFlexContainer>

            <Typography variant="body2" color="adminDarkBrown">
              In playlist already:{' '}
              <strong>{inPlaylistAlready ? 'Yes' : 'No'}</strong>
            </Typography>

            {inPlaylistAlready && playlistName ? (
              <Typography variant="body2" color="adminDarkBrown">
                Playlist: <strong>{playlistName}</strong>
              </Typography>
            ) : null}

            {inPlaylistAlready && playlistId ? (
              <Typography variant="body2" color="adminDarkBrown">
                Playlist ID: <strong>{playlistId}</strong>
              </Typography>
            ) : null}

            {inPlaylistAlready && localSongId ? (
              <Typography variant="body2" color="adminDarkBrown">
                Local Song ID: <strong>{localSongId}</strong>
              </Typography>
            ) : null}

            <Typography variant="body2" color="adminDarkBrown">
              Search Song ID: <strong>{song.id}</strong>
            </Typography>
          </ColumnFlexContainer>
        </DialogContent>
      </>
    )}
  </Dialog>
);
