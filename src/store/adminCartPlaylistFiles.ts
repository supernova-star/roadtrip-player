export type AdminCartPlaylistId =
  | 'dhurandhar'
  | 'coke-studio-pakistan'
  | 'coke-studio-bangla'
  | 'coke-studio-india'
  | 'monsoon-mixtape'
  | 'late-night'
  | 'old-bengali-classics'
  | 'hindi-classics'
  | 'barbershop'
  | 'romance'
  | 'heartbreak'
  | 'masti'
  | 'nostalgia'
  | 'bhojpuri-reels'
  | 'himesh-hot-hits'
  | 'kk-best';

export type AdminCartPlaylistSongFilePath =
  `src/constants/playlistSongs/${string}.ts`;

export type AdminCartPlaylistSongExportName = `${string}Songs`;

export type AdminCartPlaylistSongFile = {
  filePath: AdminCartPlaylistSongFilePath;
  songsExport: AdminCartPlaylistSongExportName;
};

export const adminCartPlaylistSongFileById = {
  dhurandhar: {
    filePath: 'src/constants/playlistSongs/dhurandhar.ts',
    songsExport: 'dhurandharSongs',
  },
  'coke-studio-pakistan': {
    filePath: 'src/constants/playlistSongs/coke-studio-pakistan.ts',
    songsExport: 'cokeStudioPakistanSongs',
  },
  'coke-studio-bangla': {
    filePath: 'src/constants/playlistSongs/coke-studio-bangla.ts',
    songsExport: 'cokeStudioBanglaSongs',
  },
  'coke-studio-india': {
    filePath: 'src/constants/playlistSongs/coke-studio-india.ts',
    songsExport: 'cokeStudioIndiaSongs',
  },
  'monsoon-mixtape': {
    filePath: 'src/constants/playlistSongs/monsoon-mixtape.ts',
    songsExport: 'monsoonMixtapeSongs',
  },
  'late-night': {
    filePath: 'src/constants/playlistSongs/late-night.ts',
    songsExport: 'lateNightSongs',
  },
  'old-bengali-classics': {
    filePath: 'src/constants/playlistSongs/old-bengali-classics.ts',
    songsExport: 'oldBengaliClassicsSongs',
  },
  'hindi-classics': {
    filePath: 'src/constants/playlistSongs/hindiClassics.ts',
    songsExport: 'hindiClassicsSongs',
  },
  barbershop: {
    filePath: 'src/constants/playlistSongs/barbershop.ts',
    songsExport: 'barbershopSongs',
  },
  romance: {
    filePath: 'src/constants/playlistSongs/romanceSongs.ts',
    songsExport: 'romanceSongs',
  },
  heartbreak: {
    filePath: 'src/constants/playlistSongs/heartbreakSongs.ts',
    songsExport: 'heartbreakSongs',
  },
  masti: {
    filePath: 'src/constants/playlistSongs/mastiSongs.ts',
    songsExport: 'mastiSongs',
  },
  nostalgia: {
    filePath: 'src/constants/playlistSongs/nostalgiaSongs.ts',
    songsExport: 'nostalgiaSongs',
  },
  'bhojpuri-reels': {
    filePath: 'src/constants/playlistSongs/bhojpuriSongs.ts',
    songsExport: 'bhojpuriSongs',
  },
  'himesh-hot-hits': {
    filePath: 'src/constants/playlistSongs/himeshSongs.ts',
    songsExport: 'himeshSongs',
  },
  'kk-best': {
    filePath: 'src/constants/playlistSongs/kkSongs.ts',
    songsExport: 'kkSongs',
  },
} as const satisfies Record<AdminCartPlaylistId, AdminCartPlaylistSongFile>;
