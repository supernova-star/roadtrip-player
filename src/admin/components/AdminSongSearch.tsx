import { Search, ShoppingCart, Trash2 } from 'lucide-react';
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
import { colorPalette } from '@/theme/colors';
import { isSongAlreadyInCasetteLibrary } from '@/utils/adminSongLibrary';

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isSongInCart = (songId: string) =>
    cartSongs.some((cartSong) => cartSong.id === songId);
  const getCartItemId = (songId: string) =>
    cartSongs.find((cartSong) => cartSong.id === songId)?.cartItemId;
  const alreadyInCasetteCount =
    results?.filter(isSongAlreadyInCasetteLibrary).length ?? 0;

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
    <ColumnFlexContainer gap={[6]} flex={1}>
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
        <ColumnFlexContainer gap={[2]}>
          <Typography variant="caption" weight="bold" color="adminBrown">
            {results.length} {results.length === 1 ? 'result' : 'results'} ·{' '}
            {alreadyInCasetteCount} already in Casette
          </Typography>
          <ColumnFlexContainer
            borderRadius={[2]}
            backgroundColor="adminSurface"
            sx={{
              border: `1px solid ${colorPalette.adminBorder}`,
              maxHeight: 492,
              overflow: 'auto',
            }}
          >
            {results.map((song, index) => {
              const isInLibrary = isSongAlreadyInCasetteLibrary(song);
              const isInCart = isSongInCart(song.id);

              return (
                <RowFlexContainer
                  key={song.id || `${song.title}-${index}`}
                  alignItems="center"
                  gap={[3]}
                  padding={[3]}
                  sx={{
                    borderBottom:
                      index === results.length - 1
                        ? 0
                        : `1px solid ${colorPalette.adminBorder}`,
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
                  </ColumnFlexContainer>
                  <IconButton
                    aria-label={
                      isInLibrary
                        ? `${song.title} is already in the Casette library`
                        : isInCart
                          ? `Remove ${song.title} from cart`
                          : `Add ${song.title} to cart`
                    }
                    title={
                      isInLibrary
                        ? 'Already in Casette library'
                        : isInCart
                          ? 'Remove from cart'
                          : 'Add to cart'
                    }
                    disabled={isInLibrary}
                    onClick={() => {
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
                      '&.Mui-disabled': {
                        color: `${colorPalette.adminMuted}66`,
                        bgcolor: colorPalette.adminSurface,
                        borderColor: colorPalette.adminBorder,
                        borderStyle: 'dashed',
                        opacity: 1,
                      },
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
                    {isInCart && !isInLibrary ? (
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
