import { playlists } from '@/constants/playlists';
import {
  barbershopSongs,
  bhojpuriSongs,
  cokeStudioBanglaSongs,
  cokeStudioIndiaSongs,
  cokeStudioPakistanSongs,
  dhurandharSongs,
  heartbreakSongs,
  hindiClassicsSongs,
  himeshSongs,
  kkSongs,
  mastiSongs,
  monsoonMixtapeSongs,
  lateNightSongs,
  nostalgiaSongs,
  oldBengaliClassicsSongs,
  romanceSongs,
  songs,
} from '@/constants/songs';
import type { Song } from '@/types/music';

type SongIdentity = Pick<Song, 'title'>;

export const getAdminSongLibraryKey = ({ title }: SongIdentity) =>
  title.toLowerCase().trim().replace(/\s+/g, ' ');

const casetteSongLibraryKeys = new Set(songs.map(getAdminSongLibraryKey));

const playlistSongsById: Record<string, Song[]> = {
  dhurandhar: dhurandharSongs,
  'coke-studio-pakistan': cokeStudioPakistanSongs,
  'coke-studio-bangla': cokeStudioBanglaSongs,
  'coke-studio-india': cokeStudioIndiaSongs,
  'monsoon-mixtape': monsoonMixtapeSongs,
  'late-night': lateNightSongs,
  'old-bengali-classics': oldBengaliClassicsSongs,
  'hindi-classics': hindiClassicsSongs,
  barbershop: barbershopSongs,
  romance: romanceSongs,
  heartbreak: heartbreakSongs,
  masti: mastiSongs,
  nostalgia: nostalgiaSongs,
  'bhojpuri-reels': bhojpuriSongs,
  'himesh-hot-hits': himeshSongs,
  'kk-best': kkSongs,
};

export const isSongAlreadyInCasetteLibrary = (song: SongIdentity) =>
  casetteSongLibraryKeys.has(getAdminSongLibraryKey(song));

export const getSongPlaylistMembership = (song: SongIdentity) => {
  const songKey = getAdminSongLibraryKey(song);

  for (const playlist of playlists) {
    const matchedSong = playlistSongsById[playlist.id]?.find(
      (playlistSong) => getAdminSongLibraryKey(playlistSong) === songKey,
    );

    if (matchedSong) {
      return {
        playlist,
        matchedSongId: matchedSong.id,
        playlistId: playlist.id,
      };
    }
  }

  return null;
};
