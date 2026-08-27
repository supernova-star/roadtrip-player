import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { CustomPlaylistMoodId } from '@/constants/customPlaylistMoods';
import type { Playlist } from '@/types/music';

export type CustomPlaylist = Playlist & {
  mood: CustomPlaylistMoodId;
};

type CreateCustomPlaylistInput = {
  title: string;
  mood: CustomPlaylistMoodId;
  songIds: string[];
};

interface CustomPlaylistsState {
  customPlaylists: CustomPlaylist[];
  createCustomPlaylist: (input: CreateCustomPlaylistInput) => CustomPlaylist;
  deleteCustomPlaylist: (playlistId: string) => void;
}

export const useCustomPlaylistsStore = create<CustomPlaylistsState>()(
  devtools(
    persist(
      (set) => ({
        customPlaylists: [],
        createCustomPlaylist: ({ title, mood, songIds }) => {
          const playlist: CustomPlaylist = {
            id: `custom-${crypto.randomUUID()}`,
            title,
            description: `${mood.replace(/-/g, ' ')} mix generated from your library.`,
            songIds,
            mood,
          };

          set((state) => ({
            customPlaylists: [...state.customPlaylists, playlist],
          }));

          return playlist;
        },
        deleteCustomPlaylist: (playlistId) => {
          set((state) => ({
            customPlaylists: state.customPlaylists.filter(
              (playlist) => playlist.id !== playlistId,
            ),
          }));
        },
      }),
      { name: 'roadtrip-custom-playlists' },
    ),
    { name: 'custom-playlists-store' },
  ),
);
