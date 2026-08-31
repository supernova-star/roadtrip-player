import { create } from 'zustand';
import { Song } from '../types/music';
import { playlists } from '../constants/playlists';
import { cachePlaylistAudio } from '../utils/audioPlaylistCache';

interface PlayerState {
  currentSong: Song | null;
  currentPlaylistId: string;
  queue: Song[];
  currentIndex: number;
  isPlaying: boolean;
  isBuffering: boolean;
  currentTime: number;
  duration: number;
  playSong: (song: Song) => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  next: () => void;
  previous: () => void;
  seek: (time: number) => void;
  setCurrentPlaylistId: (playlistId: string) => void;
  setQueue: (songs: Song[]) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setIsBuffering: (isBuffering: boolean) => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentSong: null,
  currentPlaylistId: playlists[0]?.id ?? '',
  queue: [],
  currentIndex: 0,
  isPlaying: false,
  isBuffering: false,
  currentTime: 0,
  duration: 0,

  playSong: (song) => {
    const { currentPlaylistId, queue } = get();
    const existingIndex = queue.findIndex((item) => item.id === song.id);
    const playlistSongs = existingIndex >= 0 ? queue : [...queue, song];

    set((state) => {
      const nextIndex =
        existingIndex >= 0 ? existingIndex : playlistSongs.length - 1;

      return {
        currentSong: song,
        queue: playlistSongs,
        currentIndex: nextIndex,
        isPlaying: true,
        isBuffering: true,
        currentTime: 0,
      };
    });

    cachePlaylistAudio(currentPlaylistId, playlistSongs);
  },

  play: () => {
    const { currentPlaylistId, queue } = get();
    set({ isPlaying: true, isBuffering: true });
    cachePlaylistAudio(currentPlaylistId, queue);
  },
  pause: () => set({ isPlaying: false, isBuffering: false }),
  togglePlay: () => {
    const { currentPlaylistId, isPlaying, queue } = get();
    set({ isPlaying: !isPlaying, isBuffering: !isPlaying });

    if (!isPlaying) {
      cachePlaylistAudio(currentPlaylistId, queue);
    }
  },
  setCurrentPlaylistId: (playlistId) => set({ currentPlaylistId: playlistId }),

  next: () => {
    set((state) => {
      if (state.queue.length === 0) {
        return state;
      }

      const nextIndex = Math.min(
        state.currentIndex + 1,
        state.queue.length - 1,
      );
      const hasNext = state.currentIndex < state.queue.length - 1;

      if (!hasNext) {
        return {
          ...state,
          currentTime: 0,
          isPlaying: false,
          isBuffering: false,
        };
      }

      return {
        ...state,
        currentIndex: nextIndex,
        currentSong: state.queue[nextIndex],
        currentTime: 0,
        isPlaying: true,
        isBuffering: true,
      };
    });
  },

  previous: () => {
    set((state) => {
      if (state.queue.length === 0) {
        return state;
      }

      if (state.currentIndex <= 0) {
        return {
          ...state,
          currentTime: 0,
        };
      }

      const previousIndex = state.currentIndex - 1;
      return {
        ...state,
        currentIndex: previousIndex,
        currentSong: state.queue[previousIndex],
        currentTime: 0,
        isPlaying: true,
        isBuffering: true,
      };
    });
  },

  seek: (time) =>
    set((state) => ({
      currentTime: Math.max(0, Math.min(time, state.duration || time)),
    })),

  setQueue: (songs) =>
    set((state) => {
      const index = songs.findIndex(
        (song) => song.id === state.currentSong?.id,
      );
      const currentSong = index >= 0 ? songs[index] : (songs[0] ?? null);

      return {
        queue: songs,
        currentIndex: Math.max(index, 0),
        currentSong,
        currentTime: 0,
      };
    }),

  setCurrentTime: (time) =>
    set({
      currentTime: Math.max(0, time),
    }),

  setDuration: (duration) =>
    set({
      duration: Math.max(0, duration),
    }),

  setIsBuffering: (isBuffering) => set({ isBuffering }),
}));
