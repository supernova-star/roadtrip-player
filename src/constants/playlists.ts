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
