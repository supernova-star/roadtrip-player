import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type AdminSearchSong = {
  id: string;
  title: string;
  artist: string;
  album: string;
  imageUrl: string;
  audioUrl: string;
  duration?: number;
};

interface AdminSearchState {
  results: AdminSearchSong[] | null;
  setResults: (results: AdminSearchSong[]) => void;
  clearResults: () => void;
}

export const useAdminSearchStore = create<AdminSearchState>()(
  devtools(
    (set) => ({
      results: null,
      setResults: (results) => set({ results }),
      clearResults: () => set({ results: null }),
    }),
    { name: 'admin-search-store' },
  ),
);
