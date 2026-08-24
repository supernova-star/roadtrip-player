import { songs } from '@/constants/songs';
import type { Song } from '@/types/music';

type SongIdentity = Pick<Song, 'title'>;

export const getAdminSongLibraryKey = ({ title }: SongIdentity) =>
  title.toLowerCase().trim().replace(/\s+/g, ' ');

const casetteSongLibraryKeys = new Set(songs.map(getAdminSongLibraryKey));

export const isSongAlreadyInCasetteLibrary = (song: SongIdentity) =>
  casetteSongLibraryKeys.has(getAdminSongLibraryKey(song));
