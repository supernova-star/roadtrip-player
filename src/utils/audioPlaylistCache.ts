import type { Song } from '@/types/music';

const databaseName = 'cassette-playlist-audio';
const storeName = 'audio';
const workerCount = 3;

type CachedAudio = {
  id: string;
  playlistId: string;
  blob: Blob;
};

let activePlaylistId: string | null = null;
let activePreload: AbortController | null = null;
let operationQueue = Promise.resolve();

const runDatabaseOperation = <T>(operation: () => Promise<T>) => {
  const result = operationQueue.then(operation, operation);
  operationQueue = result.then(
    () => undefined,
    () => undefined,
  );
  return result;
};

const openDatabase = () =>
  new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(databaseName, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(storeName);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

const readAudio = (playlistId: string, songId: string) =>
  runDatabaseOperation(
    () =>
      new Promise<Blob | null>((resolve, reject) => {
        void openDatabase()
          .then((database) => {
            const request = database
              .transaction(storeName, 'readonly')
              .objectStore(storeName)
              .get(`${playlistId}:${songId}`);

            request.onsuccess = () => {
              database.close();
              resolve(
                (request.result as CachedAudio | undefined)?.blob ?? null,
              );
            };
            request.onerror = () => {
              database.close();
              reject(request.error);
            };
          })
          .catch(reject);
      }),
  );

const clearAudio = () =>
  runDatabaseOperation(
    () =>
      new Promise<void>((resolve, reject) => {
        void openDatabase()
          .then((database) => {
            const transaction = database.transaction(storeName, 'readwrite');
            transaction.objectStore(storeName).clear();
            transaction.oncomplete = () => {
              database.close();
              resolve();
            };
            transaction.onerror = () => {
              database.close();
              reject(transaction.error);
            };
          })
          .catch(reject);
      }),
  );

const saveAudio = (playlistId: string, songId: string, blob: Blob) =>
  runDatabaseOperation(
    () =>
      new Promise<void>((resolve, reject) => {
        void openDatabase()
          .then((database) => {
            const transaction = database.transaction(storeName, 'readwrite');
            const record: CachedAudio = {
              id: `${playlistId}:${songId}`,
              playlistId,
              blob,
            };
            transaction.objectStore(storeName).put(record, record.id);
            transaction.oncomplete = () => {
              database.close();
              resolve();
            };
            transaction.onerror = () => {
              database.close();
              reject(transaction.error);
            };
          })
          .catch(reject);
      }),
  );

const preloadSong = async (
  playlistId: string,
  song: Song,
  signal: AbortSignal,
) => {
  if (!song.audioUrl || activePlaylistId !== playlistId) {
    return;
  }

  const cachedAudio = await readAudio(playlistId, song.id);
  if (cachedAudio || signal.aborted || activePlaylistId !== playlistId) {
    return;
  }

  const response = await fetch(song.audioUrl, { signal });
  if (!response.ok || signal.aborted || activePlaylistId !== playlistId) {
    return;
  }

  const blob = await response.blob();
  if (!signal.aborted && activePlaylistId === playlistId) {
    await saveAudio(playlistId, song.id, blob);
  }
};

const preloadPlaylist = async (
  playlistId: string,
  songs: Song[],
  signal: AbortSignal,
) => {
  let nextSongIndex = 0;

  const preloadWorker = async () => {
    while (!signal.aborted && activePlaylistId === playlistId) {
      const song = songs[nextSongIndex++];
      if (!song) {
        return;
      }

      try {
        await preloadSong(playlistId, song, signal);
      } catch {
        if (signal.aborted) {
          return;
        }
      }
    }
  };

  await Promise.all(
    Array.from({ length: Math.min(workerCount, songs.length) }, preloadWorker),
  );
};

export const cachePlaylistAudio = (playlistId: string, songs: Song[]) => {
  if (!playlistId || playlistId === 'favorites' || songs.length === 0) {
    return;
  }

  if (activePlaylistId === playlistId) {
    return;
  }

  activePreload?.abort();
  activePlaylistId = playlistId;
  const controller = new AbortController();
  activePreload = controller;

  void (async () => {
    try {
      await clearAudio();
      if (!controller.signal.aborted && activePlaylistId === playlistId) {
        await preloadPlaylist(playlistId, songs, controller.signal);
      }
    } catch {
      // Playback falls back to the original song URL if caching is unavailable.
    }
  })();
};

export const getCachedAudioUrl = async (playlistId: string, songId: string) => {
  if (!playlistId || playlistId === 'favorites') {
    return null;
  }

  const blob = await readAudio(playlistId, songId);
  return blob ? URL.createObjectURL(blob) : null;
};
