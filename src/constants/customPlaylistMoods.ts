export const CUSTOM_PLAYLIST_MOOD_GROUPS = {
  chill: [
    'shaam-ka-safar',
    'monsoon-mixtape',
    'coke-studio-pakistan',
    'coke-studio-bangla',
  ],
  romantic: ['shaam-ka-safar', 'romance', 'kk-best'],
  happy: ['masti', 'himesh-hot-hits'],
  nostalgic: ['shaam-ka-safar', 'hindi-classics', 'kk-best', 'kumar-sanu-hits'],
  energetic: ['masti', 'barbershop'],
  sad: ['heartbreak', 'monsoon-mixtape', 'kk-best'],
  'late-night': [
    'shaam-ka-safar',
    'romance',
    'heartbreak',
    'kk-best',
    'monsoon-mixtape',
  ],
  'road-trip': [
    'shaam-ka-safar',
    'hindi-classics',
    'coke-studio-india',
    'masti',
    'barbershop',
  ],
  workout: ['masti', 'barbershop', 'himesh-hot-hits'],
} as const;

export type CustomPlaylistMoodId = keyof typeof CUSTOM_PLAYLIST_MOOD_GROUPS;
