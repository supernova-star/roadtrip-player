import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favoriteSongIds: string[];
  addFavorite: (songId: string) => void;
  removeFavorite: (songId: string) => void;
  toggleFavorite: (songId: string) => void;
  isFavorite: (songId: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteSongIds: [],

      addFavorite: (songId) => {
        set((state) =>
          state.favoriteSongIds.includes(songId)
            ? state
            : { favoriteSongIds: [...state.favoriteSongIds, songId] }
        );
      },

      removeFavorite: (songId) => {
        set((state) => ({
          favoriteSongIds: state.favoriteSongIds.filter((id) => id !== songId),
        }));
      },

      toggleFavorite: (songId) => {
        const { favoriteSongIds } = get();
        if (favoriteSongIds.includes(songId)) {
          set({ favoriteSongIds: favoriteSongIds.filter((id) => id !== songId) });
        } else {
          set({ favoriteSongIds: [...favoriteSongIds, songId] });
        }
      },

      isFavorite: (songId) => get().favoriteSongIds.includes(songId),

      clearFavorites: () => set({ favoriteSongIds: [] }),
    }),
    {
      name: 'roadtrip-favorites',
    }
  )
);
