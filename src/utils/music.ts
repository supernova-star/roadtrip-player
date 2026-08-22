import type { Song } from '@/types/music';

export const getSongsByIds = (songIds: string[], availableSongs: Song[]): Song[] => {
  const songsById = new Map(availableSongs.map((song) => [song.id, song]));

  return songIds
    .map((songId) => songsById.get(songId))
    .filter((song): song is Song => Boolean(song));
};
