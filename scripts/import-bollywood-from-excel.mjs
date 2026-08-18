import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import crypto from 'node:crypto';
import XLSX from 'xlsx';

const ROOT = process.cwd();
const WORKBOOK = path.join(ROOT, 'bollywood_playlist_categorized.xlsx');

const CATEGORY_TO_PLAYLIST = {
  Romance: {
    id: 'romance',
    title: 'Romance',
    description: 'Romantic Bollywood songs from your curated workbook.',
  },
  Heartbreak: {
    id: 'heartbreak',
    title: 'Heartbreak',
    description: 'Heartbreak and sad Bollywood songs from your curated workbook.',
  },
  Masti: {
    id: 'masti',
    title: 'Masti',
    description: 'High-energy and fun Bollywood tracks from your curated workbook.',
  },
  Nostalgia: {
    id: 'nostalgia',
    title: 'Nostalgia',
    description: 'Nostalgic Bollywood throwbacks from your curated workbook.',
  },
};

function normalizeName(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/\(.*?\)/g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\b(jhankar|beats|beat|version|remix|audio|official|song)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function requestJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { rejectUnauthorized: false }, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (err) {
            reject(new Error(`Failed to parse JSON from ${url}: ${err.message}`));
          }
        });
      })
      .on('error', reject);
  });
}

function decryptMediaUrl(encryptedMediaUrl) {
  const decipher = crypto.createDecipheriv('des-ecb', Buffer.from('38346591'), null);
  decipher.setAutoPadding(true);
  let decrypted = decipher.update(encryptedMediaUrl, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

function toCover500(url) {
  if (!url) return '';
  return url
    .replace(/-\d+x\d+(?=\.[a-zA-Z]+$)/, '-500x500')
    .replace(/\/(\d{2,4})x(\d{2,4})\//, '/500x500/');
}

function pickBestSongResult(query, items) {
  const normalizedQuery = normalizeName(query);
  const qTokens = new Set(normalizedQuery.split(' ').filter(Boolean));

  let best = null;
  let bestScore = -Infinity;

  for (const item of items || []) {
    const candidate = normalizeName(item.title || item.song || '');
    const cTokens = new Set(candidate.split(' ').filter(Boolean));

    let overlap = 0;
    for (const token of qTokens) {
      if (cTokens.has(token)) overlap += 1;
    }

    const prefixBoost = candidate.startsWith(normalizedQuery) ? 2 : 0;
    const lengthPenalty = Math.abs(candidate.length - normalizedQuery.length) / 50;
    const score = overlap + prefixBoost - lengthPenalty;

    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }

  return best;
}

function cleanTitle(song) {
  return String(song || '')
    .replace(/\s*\(.*?\)\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function searchSong(query) {
  const url = `https://www.jiosaavn.com/api.php?__call=autocomplete.get&_format=json&_marker=0&query=${encodeURIComponent(query)}`;
  const data = await requestJson(url);
  const songs = data?.songs?.data || [];
  if (!songs.length) return null;
  return pickBestSongResult(query, songs);
}

async function getSongDetails(songId) {
  const url = `https://www.jiosaavn.com/api.php?__call=song.getDetails&pids=${encodeURIComponent(songId)}&_format=json&_marker=0`;
  const data = await requestJson(url);
  return data?.[songId] || null;
}

function toSongObject(songId, details, fallbackTitle) {
  const baseAudio = decryptMediaUrl(details.encrypted_media_url || '');
  const audioUrl = baseAudio
    ? baseAudio.replace(/_\d+\.mp4$/, '_160.mp4')
    : details.media_preview_url || '';

  return {
    id: songId,
    title: cleanTitle(details.song || fallbackTitle || ''),
    artist: (details.primary_artists || details.singers || 'Unknown Artist').trim(),
    album: (details.album || 'Unknown Album').trim(),
    coverUrl: toCover500(details.image || ''),
    audioUrl,
    duration: Number(details.duration || 0) || 0,
  };
}

function formatSong(song) {
  const lines = [
    '  {',
    `    id: '${song.id}',`,
    `    title: '${song.title.replace(/'/g, "\\'")}',`,
    `    artist: '${song.artist.replace(/'/g, "\\'")}',`,
    `    album: '${song.album.replace(/'/g, "\\'")}',`,
    `    coverUrl: '${song.coverUrl.replace(/'/g, "\\'")}',`,
    `    audioUrl: '${song.audioUrl.replace(/'/g, "\\'")}',`,
    `    duration: ${song.duration},`,
    '  },',
  ];
  return lines.join('\n');
}

async function main() {
  const wb = XLSX.readFile(WORKBOOK);
  const ws = wb.Sheets['All Songs'];
  if (!ws) {
    throw new Error('Missing "All Songs" sheet in workbook');
  }

  const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });
  const categoryToTitles = new Map();

  for (const row of rows) {
    const title = String(row.Song || '').trim();
    const category = String(row.Category || '').trim();
    if (!title || !CATEGORY_TO_PLAYLIST[category]) continue;

    if (!categoryToTitles.has(category)) categoryToTitles.set(category, []);
    categoryToTitles.get(category).push(title);
  }

  const uniqueTitleMap = new Map();
  for (const [category, titles] of categoryToTitles.entries()) {
    for (const title of titles) {
      const key = normalizeName(title);
      if (!uniqueTitleMap.has(key)) {
        uniqueTitleMap.set(key, { rawTitle: title, categories: new Set([category]) });
      } else {
        uniqueTitleMap.get(key).categories.add(category);
      }
    }
  }

  const songsById = new Map();
  const titleKeyToSongId = new Map();
  const unresolved = [];

  const total = uniqueTitleMap.size;
  let i = 0;
  for (const [titleKey, info] of uniqueTitleMap.entries()) {
    i += 1;
    const progress = `[${i}/${total}]`;
    const rawTitle = info.rawTitle;

    let result = await searchSong(rawTitle);
    if (!result) {
      result = await searchSong(cleanTitle(rawTitle));
    }

    if (!result?.id) {
      unresolved.push(rawTitle);
      console.log(`${progress} unresolved: ${rawTitle}`);
      continue;
    }

    const details = await getSongDetails(result.id);
    if (!details || !details.encrypted_media_url) {
      unresolved.push(rawTitle);
      console.log(`${progress} unresolved details: ${rawTitle}`);
      continue;
    }

    if (!songsById.has(result.id)) {
      const song = toSongObject(result.id, details, rawTitle);
      songsById.set(result.id, song);
    }

    titleKeyToSongId.set(titleKey, result.id);
    console.log(`${progress} resolved: ${rawTitle} -> ${result.id}`);
  }

  const playlists = [];
  for (const [category, config] of Object.entries(CATEGORY_TO_PLAYLIST)) {
    const titles = categoryToTitles.get(category) || [];
    const seen = new Set();
    const songIds = [];

    for (const title of titles) {
      const key = normalizeName(title);
      const sid = titleKeyToSongId.get(key);
      if (!sid || seen.has(sid)) continue;
      seen.add(sid);
      songIds.push(sid);
    }

    playlists.push({
      ...config,
      songIds,
    });
  }

  const categorySongs = {
    romance: [],
    heartbreak: [],
    masti: [],
    nostalgia: [],
  };

  const allSongsByPlaylistId = [];

  for (const playlist of playlists) {
    const remappedIds = [];

    for (let index = 0; index < playlist.songIds.length; index += 1) {
      const saavnId = playlist.songIds[index];
      const baseSong = songsById.get(saavnId);
      if (!baseSong) continue;

      const playlistSongId = `${playlist.id}-${index + 1}`;
      const playlistSong = { ...baseSong, id: playlistSongId };

      remappedIds.push(playlistSongId);
      categorySongs[playlist.id].push(playlistSong);
      allSongsByPlaylistId.push(playlistSong);
    }

    playlist.songIds = remappedIds;
  }

  const uniqueSongs = allSongsByPlaylistId;

  const createPlaylistSongsFile = (exportName, songs) =>
    [
      "import { Song } from '@/types/music';",
      '',
      `export const ${exportName}: Song[] = [`,
      songs.map(formatSong).join('\n'),
      '];',
      '',
    ].join('\n');

  const playlistsFileLines = [
    "import { Playlist } from '../types/music';",
    '',
    'export const playlists: Playlist[] = [',
  ];

  for (const pl of playlists) {
    playlistsFileLines.push('  {');
    playlistsFileLines.push(`    id: '${pl.id}',`);
    playlistsFileLines.push(`    title: '${pl.title}',`);
    playlistsFileLines.push(`    description: '${pl.description}',`);
    playlistsFileLines.push('    songIds: [');
    for (const sid of pl.songIds) {
      playlistsFileLines.push(`      '${sid}',`);
    }
    playlistsFileLines.push('    ],');
    playlistsFileLines.push('  },');
  }

  playlistsFileLines.push('];');
  playlistsFileLines.push('');

  const aggregatorFile = [
    "import { romanceSongs } from './playlistSongs/romanceSongs';",
    "import { heartbreakSongs } from './playlistSongs/heartbreakSongs';",
    "import { mastiSongs } from './playlistSongs/mastiSongs';",
    "import { nostalgiaSongs } from './playlistSongs/nostalgiaSongs';",
    '',
    "export { romanceSongs } from './playlistSongs/romanceSongs';",
    "export { heartbreakSongs } from './playlistSongs/heartbreakSongs';",
    "export { mastiSongs } from './playlistSongs/mastiSongs';",
    "export { nostalgiaSongs } from './playlistSongs/nostalgiaSongs';",
    '',
    'export const songs = [...romanceSongs, ...heartbreakSongs, ...mastiSongs, ...nostalgiaSongs];',
    '',
  ].join('\n');

  fs.writeFileSync(
    path.join(ROOT, 'src/constants/playlistSongs/romanceSongs.ts'),
    createPlaylistSongsFile('romanceSongs', categorySongs.romance),
    'utf8'
  );
  fs.writeFileSync(
    path.join(ROOT, 'src/constants/playlistSongs/heartbreakSongs.ts'),
    createPlaylistSongsFile('heartbreakSongs', categorySongs.heartbreak),
    'utf8'
  );
  fs.writeFileSync(
    path.join(ROOT, 'src/constants/playlistSongs/mastiSongs.ts'),
    createPlaylistSongsFile('mastiSongs', categorySongs.masti),
    'utf8'
  );
  fs.writeFileSync(
    path.join(ROOT, 'src/constants/playlistSongs/nostalgiaSongs.ts'),
    createPlaylistSongsFile('nostalgiaSongs', categorySongs.nostalgia),
    'utf8'
  );
  fs.writeFileSync(
    path.join(ROOT, 'src/constants/playlists.ts'),
    playlistsFileLines.join('\n'),
    'utf8'
  );
  fs.writeFileSync(path.join(ROOT, 'src/constants/songs.ts'), aggregatorFile, 'utf8');

  const report = {
    workbookRows: rows.length,
    uniqueWorkbookSongs: uniqueTitleMap.size,
    resolvedSongs: uniqueSongs.length,
    unresolvedCount: unresolved.length,
    unresolved,
    playlistCounts: playlists.map((p) => ({ id: p.id, songCount: p.songIds.length })),
  };

  fs.writeFileSync(
    path.join(ROOT, 'src/constants/playlistSongs/bollywoodImportReport.json'),
    JSON.stringify(report, null, 2)
  );
  console.log(JSON.stringify(report, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
