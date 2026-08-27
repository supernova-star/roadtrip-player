import { Pause, Play, Search, ShoppingCart, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { Avatar, IconButton, InputAdornment, TextField } from '@mui/material';
import { Button } from '@/components/uiComponents/button/Button';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import {
  type AdminSearchSong,
  useAdminSearchStore,
} from '@/store/adminSearchStore';
import { useAdminCartStore } from '@/store/adminCartStore';
import { SongDetailsModal } from './SongDetailsModal';
import { AdminMiniPlayer } from './AdminMiniPlayer';
import { colorPalette } from '@/theme/colors';
import {
  getSongPlaylistMembership,
  isSongAlreadyInCasetteLibrary,
} from '@/utils/adminSongLibrary';

type SearchResponse = {
  results: AdminSearchSong[];
};

export const AdminSongSearch = () => {
  const [query, setQuery] = useState('');
  const results = useAdminSearchStore((state) => state.results);
  const setResults = useAdminSearchStore((state) => state.setResults);
  const clearResults = useAdminSearchStore((state) => state.clearResults);
  const cartSongs = useAdminCartStore((state) => state.songs);
  const addSong = useAdminCartStore((state) => state.addSong);
  const removeSong = useAdminCartStore((state) => state.removeSong);
  const [selectedSong, setSelectedSong] = useState<AdminSearchSong | null>(
    null,
  );
  const [previewSong, setPreviewSong] = useState<AdminSearchSong | null>(null);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isSongInCart = (songId: string) =>
    cartSongs.some((cartSong) => cartSong.id === songId);
  const getCartItemId = (songId: string) =>
    cartSongs.find((cartSong) => cartSong.id === songId)?.cartItemId;
  const handlePlaySong = (song: AdminSearchSong) => {
    if (previewSong?.id === song.id) {
      setIsPreviewPlaying((playing) => !playing);
      return;
    }

    setPreviewSong(song);
    setIsPreviewPlaying(true);
  };
  const handlePreviewEnded = () => setIsPreviewPlaying(false);
  const getPlaylistMembership = (song: Pick<AdminSearchSong, 'title'>) =>
    getSongPlaylistMembership(song);
  const alreadyInCasetteCount =
    results?.filter(isSongAlreadyInCasetteLibrary).length ?? 0;
  const selectedSongMembership = selectedSong
    ? getPlaylistMembership(selectedSong)
    : null;

  const handleSearch = async () => {
    const searchQuery = query.trim();
    if (searchQuery.length < 3) {
      setError('Enter at least 3 characters to search songs.');
      return;
    }

    setIsLoading(true);
    setError(null);
    clearResults();

    try {
      const response = await fetch(
        `/api/saavn/search?q=${encodeURIComponent(searchQuery)}`,
      );

      if (!response.ok) {
        throw new Error('Search request failed');
      }

      const data = (await response.json()) as SearchResponse;
      setResults(Array.isArray(data.results) ? data.results : []);
    } catch {
      setError('Unable to search songs right now. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    clearResults();
    setError(null);
    setIsLoading(false);
  };

  return (
    <ColumnFlexContainer
      gap={[6]}
      flex={1}
      minHeight="0px"
      data-testid="SEARCH"
      sx={{ minHeight: 0, overflow: 'hidden' }}
    >
      <ColumnFlexContainer
        position="fixed"
        bottom="68px"
        left="0px"
        right="0px"
        width="100%"
        padding={[0, 0, 1]}
        alignItems="center"
        justifyContent="center"
        sx={{ zIndex: 11 }}
      >
        <AdminMiniPlayer
          song={previewSong}
          isPlaying={isPreviewPlaying}
          onTogglePlay={() => setIsPreviewPlaying((playing) => !playing)}
          onEnded={handlePreviewEnded}
        />
      </ColumnFlexContainer>
      <ColumnFlexContainer gap={[1]}>
        <Typography variant="h4" weight="bold" color="adminDarkBrown">
          Search Songs
        </Typography>
        <Typography variant="body2" color="adminMuted" sx={{ lineHeight: 1.6 }}>
          Find something new for the Casette library.
        </Typography>
      </ColumnFlexContainer>

      <ColumnFlexContainer gap={[3]}>
        <TextField
          fullWidth
          label="Search songs"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              handleSearch();
            }
          }}
          placeholder="Search by song or artist"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={19} color={colorPalette.adminMuted} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: colorPalette.adminSurface,
              borderRadius: 1.5,
              '& fieldset': { borderColor: colorPalette.adminBorder },
              '&.Mui-focused fieldset': {
                borderColor: colorPalette.adminYellow,
              },
            },
          }}
        />
        <RowFlexContainer gap={[3]}>
          <Button
            text="Search"
            fullWidth
            disabled={isLoading || query.trim().length < 3}
            iconOptions={{ icon: Search, iconColor: 'adminDarkBrown' }}
            textOptions={{ textColor: 'adminDarkBrown', textWeight: 'bold' }}
            onClick={handleSearch}
            buttonStyles={{
              bgColor: 'adminYellow',
              borderRadius: [2],
              width: 'fullWidth',
            }}
          />
          <Button
            text="Clear"
            fullWidth
            disabled={!query && !results && !error}
            variant="outlined"
            textOptions={{ textColor: 'adminBrown', textWeight: 'bold' }}
            onClick={handleClear}
            buttonStyles={{
              bgColor: 'adminBrown',
              borderRadius: [2],
              width: 'fullWidth',
            }}
          />
        </RowFlexContainer>
      </ColumnFlexContainer>

      {isLoading && (
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
          <Typography variant="body2" color="adminMuted">
            Searching songs...
          </Typography>
        </ColumnFlexContainer>
      )}

      {!isLoading && error && (
        <ColumnFlexContainer
          padding={[8]}
          borderRadius={[2]}
          textAlign="center"
          alignItems="center"
          flex={1}
          justifyContent="center"
          backgroundColor="adminSurface"
          sx={{ border: `1px dashed ${colorPalette.adminBorder}` }}
        >
          <Typography variant="body2" color="adminDarkBrown">
            {error}
          </Typography>
        </ColumnFlexContainer>
      )}

      {!isLoading && !error && results && results.length > 0 && (
        <ColumnFlexContainer gap={[2]} flex={1} minHeight="0px">
          <Typography variant="caption" weight="bold" color="adminBrown">
            {results.length} {results.length === 1 ? 'result' : 'results'} ·{' '}
            {alreadyInCasetteCount} already in Casette
          </Typography>

          <SongDetailsModal
            song={selectedSong}
            onClose={() => setSelectedSong(null)}
            inPlaylistAlready={Boolean(selectedSongMembership)}
            playlistName={selectedSongMembership?.playlist.title}
            playlistId={selectedSongMembership?.playlistId}
            localSongId={selectedSongMembership?.matchedSongId}
          />

          <ColumnFlexContainer
            borderRadius={[2]}
            backgroundColor="adminSurface"
            sx={{
              border: `1px solid ${colorPalette.adminBorder}`,
              minHeight: 0,
              flex: 1,
              overflow: 'auto',
              // paddingBottom: previewSong ? '140px' : 0,
              marginBottom: previewSong ? '70px' : 0,
            }}
          >
            {results.map((song, index) => {
              const isInCart = isSongInCart(song.id);
              const isSelected = selectedSong?.id === song.id;
              const playlistMembership = getPlaylistMembership(song);

              return (
                <RowFlexContainer
                  key={song.id || `${song.title}-${index}`}
                  alignItems="center"
                  gap={[3]}
                  padding={[3]}
                  onClick={() => setSelectedSong(song)}
                  sx={{
                    cursor: 'pointer',
                    borderBottom:
                      index === results.length - 1
                        ? 0
                        : `1px solid ${colorPalette.adminBorder}`,
                    backgroundColor: isSelected
                      ? `${colorPalette.adminYellow}22`
                      : 'transparent',
                    borderLeft: isSelected
                      ? `3px solid ${colorPalette.adminYellow}`
                      : '3px solid transparent',
                  }}
                >
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
                    <Typography variant="caption" color="adminBrown">
                      {playlistMembership
                        ? `In ${playlistMembership.playlist.title}`
                        : 'Not in any playlist'}
                    </Typography>
                  </ColumnFlexContainer>
                  <IconButton
                    aria-label={
                      previewSong?.id === song.id && isPreviewPlaying
                        ? `Pause ${song.title}`
                        : `Play ${song.title}`
                    }
                    title={
                      previewSong?.id === song.id && isPreviewPlaying
                        ? 'Pause preview'
                        : 'Play preview'
                    }
                    onClick={(event) => {
                      event.stopPropagation();
                      handlePlaySong(song);
                    }}
                    sx={{
                      color: colorPalette.adminDarkBrown,
                      bgcolor: colorPalette.adminBackground,
                      border: `1px solid ${colorPalette.adminBorder}`,
                      '&:hover': {
                        bgcolor: colorPalette.adminBackground,
                        borderColor: colorPalette.adminYellow,
                      },
                    }}
                  >
                    {previewSong?.id === song.id && isPreviewPlaying ? (
                      <Pause size={18} />
                    ) : (
                      <Play size={18} />
                    )}
                  </IconButton>
                  <IconButton
                    aria-label={
                      isInCart
                        ? `Remove ${song.title} from cart`
                        : `Add ${song.title} to cart`
                    }
                    title={isInCart ? 'Remove from cart' : 'Add to cart'}
                    onClick={(event) => {
                      event.stopPropagation();
                      const cartItemId = getCartItemId(song.id);

                      if (cartItemId) {
                        removeSong(cartItemId);
                        return;
                      }

                      addSong(song);
                    }}
                    sx={{
                      color: isInCart
                        ? colorPalette.adminSurface
                        : colorPalette.adminDarkBrown,
                      bgcolor: isInCart
                        ? colorPalette.adminDanger
                        : colorPalette.adminBackground,
                      border: `1px solid ${
                        isInCart
                          ? colorPalette.adminDanger
                          : colorPalette.adminBorder
                      }`,
                      '&:hover': {
                        bgcolor: isInCart
                          ? colorPalette.adminDanger
                          : colorPalette.adminBackground,
                        borderColor: isInCart
                          ? colorPalette.adminDanger
                          : colorPalette.adminYellow,
                      },
                    }}
                  >
                    {isInCart ? (
                      <Trash2 size={18} />
                    ) : (
                      <ShoppingCart size={18} />
                    )}
                  </IconButton>
                </RowFlexContainer>
              );
            })}
          </ColumnFlexContainer>
        </ColumnFlexContainer>
      )}

      {!isLoading && !error && (!results || results.length === 0) && (
        <ColumnFlexContainer
          padding={[8]}
          borderRadius={[2]}
          textAlign="center"
          justifyContent="center"
          flex={1}
          backgroundColor="adminSurface"
          sx={{ border: `1px dashed ${colorPalette.adminBorder}` }}
        >
          <ColumnFlexContainer alignItems="center" gap={[1]}>
            <Search size={26} color={colorPalette.adminYellow} />
            <Typography
              variant="subtitle2"
              weight="bold"
              color="adminDarkBrown"
            >
              {results ? 'No songs found' : 'Search for songs'}
            </Typography>
            <Typography variant="body2" color="adminMuted">
              {results
                ? 'Try a different song title or artist.'
                : 'Enter at least 3 characters to begin.'}
            </Typography>
            {results && (
              <Typography variant="caption" weight="bold" color="adminBrown">
                0 results
              </Typography>
            )}
          </ColumnFlexContainer>
        </ColumnFlexContainer>
      )}
    </ColumnFlexContainer>
  );
};
