import { Playlist } from '../types/music';

const createSongIds = (prefix: string, count: number): string[] =>
  Array.from({ length: count }, (_, index) => `${prefix}-${index + 1}`);

export const playlists: Playlist[] = [
  {
    id: 'hindi-classics',
    title: '90s Hindi Classics',
    description: 'Nostalgic Bollywood hits for the long road.',
    songIds: createSongIds('hindi', 12),
  },
  {
    id: 'barbershop',
    title: 'Barbershop Vibes',
    description: 'Banger songs that play at Indian barber shops.',
    songIds: createSongIds('barber', 27),
  },
  {
    id: 'romance',
    title: 'Romance',
    description: 'Romantic Bollywood songs from your curated workbook.',
    songIds: createSongIds('romance', 74),
  },
  {
    id: 'heartbreak',
    title: 'Heartbreak',
    description: 'Heartbreak and sad Bollywood songs from your curated workbook.',
    songIds: createSongIds('heartbreak', 35),
  },
  {
    id: 'masti',
    title: 'Masti',
    description: 'High-energy and fun Bollywood tracks from your curated workbook.',
    songIds: createSongIds('masti', 32),
  },
  {
    id: 'nostalgia',
    title: 'Nostalgia',
    description: 'Nostalgic Bollywood throwbacks from your curated workbook.',
    songIds: createSongIds('nostalgia', 16),
  },
  {
    id: 'bhojpuri-reels',
    title: 'Bhojpuri Reels Hits',
    description: 'Popular Bhojpuri tracks often trending in short-form videos.',
    songIds: createSongIds('bhojpuri', 63),
  },
  {
    id: 'himesh-hot-hits',
    title: 'Hot Himesh Hits',
    description: 'Hook-heavy Himesh Reshammiya anthems and chart favorites.',
    songIds: createSongIds('himesh', 24),
  },
  {
    id: 'kk-best',
    title: 'KK Best Songs',
    description: 'Timeless KK vocals from romantic to soulful chartbusters.',
    songIds: createSongIds('kk', 25),
  },
];
