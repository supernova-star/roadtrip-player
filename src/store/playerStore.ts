import { create } from 'zustand';
import { Song } from '../types/music';
import { playlists } from '../constants/playlists';

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

export const usePlayerStore = create<PlayerState>((set) => ({
  currentSong: null,
  currentPlaylistId: playlists[0]?.id ?? '',
  queue: [],
  currentIndex: 0,
  isPlaying: false,
  isBuffering: false,
  currentTime: 0,
  duration: 0,

  playSong: (song) => {
    set((state) => {
      const existingIndex = state.queue.findIndex(
        (item) => item.id === song.id,
      );
      const nextQueue =
        existingIndex >= 0 ? state.queue : [...state.queue, song];
      const nextIndex =
        existingIndex >= 0 ? existingIndex : nextQueue.length - 1;

      return {
        currentSong: song,
        queue: nextQueue,
        currentIndex: nextIndex,
        isPlaying: true,
        isBuffering: true,
        currentTime: 0,
      };
    });
  },

  play: () => set({ isPlaying: true, isBuffering: true }),
  pause: () => set({ isPlaying: false, isBuffering: false }),
  togglePlay: () =>
    set((state) => ({
      isPlaying: !state.isPlaying,
      isBuffering: !state.isPlaying,
    })),
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
