export const CUSTOM_PLAYLIST_MOOD_GROUPS = {
  chill: ['monsoon-mixtape', 'coke-studio-pakistan', 'coke-studio-bangla'],
  romantic: ['romance', 'kk-best'],
  happy: ['masti', 'bhojpuri-reels', 'himesh-hot-hits'],
  nostalgic: ['nostalgia', 'hindi-classics', 'kk-best'],
  energetic: ['masti', 'barbershop', 'dhurandhar', 'bhojpuri-reels'],
  sad: ['heartbreak', 'monsoon-mixtape', 'kk-best'],
  'late-night': ['romance', 'heartbreak', 'kk-best', 'monsoon-mixtape'],
  'road-trip': ['hindi-classics', 'coke-studio-india', 'masti', 'barbershop'],
  workout: ['masti', 'barbershop', 'bhojpuri-reels', 'himesh-hot-hits'],
} as const;

export type CustomPlaylistMoodId = keyof typeof CUSTOM_PLAYLIST_MOOD_GROUPS;