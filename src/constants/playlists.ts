import { Playlist } from '../types/music';

const createSongIds = (prefix: string, count: number): string[] =>
  Array.from({ length: count }, (_, index) => `${prefix}-${index + 1}`);

export const playlists: Playlist[] = [
  {
    id: 'dhurandhar',
    title: 'Dhurandhar',
    description: 'Hit songs from the movie Dhurandhar.',
    songIds: createSongIds('dhurandhar', 25),
  },
  {
    id: 'coke-studio-pakistan',
    title: 'Coke Studio Pakistan',
    description: 'Recognizable Coke Studio Pakistan collaborations.',
    songIds: createSongIds('coke-studio-pakistan', 20),
  },
  {
    id: 'coke-studio-bangla',
    title: 'Coke Studio Bangla',
    description: 'Folk and Baul-influenced Coke Studio Bangla favorites.',
    songIds: createSongIds('coke-studio-bangla', 21),
  },
  {
    id: 'coke-studio-india',
    title: 'Coke Studio India',
    description: 'Coke Studio India and Coke Studio @ MTV highlights.',
    songIds: createSongIds('coke-studio-india', 20),
  },
  {
    id: 'monsoon-mixtape',
    title: 'MIX - Monsoon Mixtape',
    description: 'A rainy-day mix of Hindi and Bengali favorites.',
    songIds: createSongIds('monsoon-mixtape', 27),
  },
  {
    id: 'late-night',
    title: 'Late Night',
    description: 'Soft, late-night favorites for quiet drives.',
    songIds: createSongIds('late-night', 12),
  },
  {
    id: 'old-bengali-classics',
    title: 'Old Bengali Classics',
    description: 'Timeless Bengali songs for reflective evenings.',
    songIds: createSongIds('old-bengali-classics', 12),
  },
  {
    id: 'hindi-classics',
    title: '90s Hindi Classics',
    description: 'Bollywood hits for the road.',
    songIds: createSongIds('hindi', 12),
  },
  {
    id: 'barbershop',
    title: 'Barbershop Vibes',
    description: 'Bangers from the barbershop.',
    songIds: createSongIds('barber', 27),
  },
  {
    id: 'romance',
    title: 'Romance',
    description: 'Romantic Bollywood songs.',
    songIds: createSongIds('romance', 74),
  },
  {
    id: 'heartbreak',
    title: 'Heartbreak',
    description: 'Sad Bollywood songs.',
    songIds: createSongIds('heartbreak', 35),
  },
  {
    id: 'masti',
    title: 'Masti',
    description: 'High-energy Bollywood tracks.',
    songIds: createSongIds('masti', 32),
  },
  {
    id: 'nostalgia',
    title: 'Nostalgia',
    description: 'Nostalgic Bollywood throwbacks.',
    songIds: createSongIds('nostalgia', 16),
  },
  {
    id: 'bhojpuri-reels',
    title: 'Bhojpuri Reels Hits',
    description: 'Trending Bhojpuri tracks.',
    songIds: createSongIds('bhojpuri', 63),
  },
  {
    id: 'himesh-hot-hits',
    title: 'Hot Himesh Hits',
    description: 'Hook-heavy Himesh anthems.',
    songIds: createSongIds('himesh', 24),
  },
  {
    id: 'kk-best',
    title: 'KK Best Songs',
    description: 'Timeless KK chartbusters.',
    songIds: createSongIds('kk', 25),
  },
];
