import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  barbershopSongs,
  cokeStudioBanglaSongs,
  cokeStudioIndiaSongs,
  cokeStudioPakistanSongs,
  heartbreakSongs,
  hindiClassicsSongs,
  himeshSongs,
  kkSongs,
  lateNightSongs,
  kumarSanuSongs,
  mastiSongs,
  monsoonMixtapeSongs,
  oldBengaliClassicsSongs,
  romanceSongs,
  shaamKaSafarSongs,
  punjabiHitsSongs,
} from '@/constants/songs';
import type { Song } from '@/types/music';
import type { AdminSearchSong } from './adminSearchStore';

export type AdminCartSong = AdminSearchSong & {
  cartItemId: string;
  playlistId: string | null;
  finalSong: Song | null;
};

const playlistSongsById: Record<string, Song[]> = {
  'shaam-ka-safar': shaamKaSafarSongs,
  'kumar-sanu-hits': kumarSanuSongs,
  'coke-studio-pakistan': cokeStudioPakistanSongs,
  'coke-studio-bangla': cokeStudioBanglaSongs,
  'coke-studio-india': cokeStudioIndiaSongs,
  'monsoon-mixtape': monsoonMixtapeSongs,
  'late-night': lateNightSongs,
  'punjabi-hits': punjabiHitsSongs,
  'old-bengali-classics': oldBengaliClassicsSongs,
  'hindi-classics': hindiClassicsSongs,
  barbershop: barbershopSongs,
  romance: romanceSongs,
  heartbreak: heartbreakSongs,
  masti: mastiSongs,
  'himesh-hot-hits': himeshSongs,
  'kk-best': kkSongs,
};

const getPlaylistIdSeed = (playlistId: string) => {
  const lastSong = playlistSongsById[playlistId]?.at(-1);
  const idMatch = lastSong?.id.match(/^(.*)-(\d+)$/);

  if (!idMatch) {
    return null;
  }

  return { prefix: idMatch[1], lastNumber: Number(idMatch[2]) };
};

// IDs are regenerated across the whole cart so songs sharing a playlist stay sequential.
const withGeneratedIds = (songs: AdminCartSong[]): AdminCartSong[] => {
  const nextNumberByPlaylist = new Map<string, number>();

  return songs.map((song) => {
    const seed = song.playlistId ? getPlaylistIdSeed(song.playlistId) : null;

    if (!song.playlistId || !seed) {
      return { ...song, finalSong: null };
    }

    const nextNumber =
      nextNumberByPlaylist.get(song.playlistId) ?? seed.lastNumber + 1;
    nextNumberByPlaylist.set(song.playlistId, nextNumber + 1);

    return {
      ...song,
      finalSong: {
        id: `${seed.prefix}-${nextNumber}`,
        title: song.title,
        artist: song.artist,
        album: song.album,
        coverUrl: song.imageUrl,
        audioUrl: song.audioUrl,
        duration: song.duration,
      },
    };
  });
};

interface AdminCartState {
  songs: AdminCartSong[];
  addSong: (song: AdminSearchSong) => void;
  removeSong: (cartItemId: string) => void;
  clearSongs: () => void;
  setSongPlaylist: (cartItemId: string, playlistId: string) => void;
}

export const useAdminCartStore = create<AdminCartState>()(
  devtools(
    (set) => ({
      songs: [],
      addSong: (song) =>
        set((state) =>
          state.songs.some((cartSong) => cartSong.id === song.id)
            ? state
            : {
                songs: [
                  ...state.songs,
                  {
                    ...song,
                    cartItemId: crypto.randomUUID(),
                    playlistId: null,
                    finalSong: null,
                  },
                ],
              },
        ),
      removeSong: (cartItemId) =>
        set((state) => ({
          songs: withGeneratedIds(
            state.songs.filter((song) => song.cartItemId !== cartItemId),
          ),
        })),
      clearSongs: () => set({ songs: [] }),
      setSongPlaylist: (cartItemId, playlistId) =>
        set((state) => ({
          songs: withGeneratedIds(
            state.songs.map((song) =>
              song.cartItemId === cartItemId ? { ...song, playlistId } : song,
            ),
          ),
        })),
    }),
    { name: 'admin-cart-store' },
  ),
);
