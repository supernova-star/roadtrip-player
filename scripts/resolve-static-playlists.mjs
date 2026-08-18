import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import crypto from 'node:crypto';

const ROOT = process.cwd();

const FILES = {
  bhojpuri: path.join(ROOT, 'src/constants/playlistSongs/bhojpuriSongs.ts'),
  himesh: path.join(ROOT, 'src/constants/playlistSongs/himeshSongs.ts'),
  kk: path.join(ROOT, 'src/constants/playlistSongs/kkSongs.ts'),
};

function normalizeName(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/\(.*?\)/g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\b(jhankar|beats|beat|version|remix|audio|official|song|reprise)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
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

function cleanTitle(song) {
  return String(song || '')
    .replace(/\s*\(.*?\)\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
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

function escapeSingleQuotes(value) {
  return String(value || '').replace(/'/g, "\\'");
}

function formatSong(song) {
  return [
    '  {',
    `    id: '${escapeSingleQuotes(song.id)}',`,
    `    title: '${escapeSingleQuotes(song.title)}',`,
    `    artist: '${escapeSingleQuotes(song.artist)}',`,
    `    album: '${escapeSingleQuotes(song.album)}',`,
    `    coverUrl: '${escapeSingleQuotes(song.coverUrl)}',`,
    `    audioUrl: '${escapeSingleQuotes(song.audioUrl)}',`,
    `    duration: ${song.duration},`,
    '  },',
  ].join('\n');
}

function extractInlineTriples(fileText) {
  const pattern =
    /\{\s*title:\s*'([^']*)'\s*,\s*artist:\s*'([^']*)'\s*,\s*album:\s*'([^']*)'\s*\}/g;
  const rows = [];
  let match = pattern.exec(fileText);
  while (match) {
    rows.push({ title: match[1], artist: match[2], album: match[3] });
    match = pattern.exec(fileText);
  }
  return rows;
}

function extractSongObjects(fileText) {
  const pattern =
    /\{\s*id:\s*'([^']+)'\s*,\s*title:\s*'([^']+)'\s*,\s*artist:\s*'([^']+)'\s*,\s*album:\s*'([^']+)'[\s\S]*?\}/g;
  const rows = [];
  let match = pattern.exec(fileText);
  while (match) {
    rows.push({ id: match[1], title: match[2], artist: match[3], album: match[4] });
    match = pattern.exec(fileText);
  }
  return rows;
}

function toSongObjectFromDetails(base, details) {
  const decrypted = details.encrypted_media_url ? decryptMediaUrl(details.encrypted_media_url) : '';
  const audioUrl = decrypted
    ? decrypted.replace(/_\d+\.mp4$/, '_160.mp4')
    : details.media_preview_url || '';

  return {
    id: base.id,
    title: cleanTitle(base.title),
    artist: (details.primary_artists || details.singers || base.artist || 'Unknown Artist').trim(),
    album: (details.album || base.album || 'Unknown Album').trim(),
    coverUrl: toCover500(details.image || ''),
    audioUrl,
    duration: Number(details.duration || 0) || 0,
  };
}

async function resolveList(name, items) {
  const resolved = [];
  const unresolved = [];

  for (let i = 0; i < items.length; i += 1) {
    const row = items[i];
    const query = `${row.title} ${String(row.artist || '').split(',')[0]}`.trim();

    let result = await searchSong(query);
    if (!result?.id) {
      result = await searchSong(row.title);
    }

    if (!result?.id) {
      unresolved.push(row.title);
      console.log(`[${name}] unresolved search: ${row.title}`);
      continue;
    }

    const details = await getSongDetails(result.id);
    if (!details?.encrypted_media_url && !details?.media_preview_url) {
      unresolved.push(row.title);
      console.log(`[${name}] unresolved details: ${row.title}`);
      continue;
    }

    resolved.push(toSongObjectFromDetails(row, details));
    console.log(`[${name}] resolved ${i + 1}/${items.length}: ${row.title}`);
  }

  return { resolved, unresolved };
}

function writeSongFile(filePath, exportName, songs) {
  const content = [
    "import { Song } from '@/types/music';",
    '',
    `export const ${exportName}: Song[] = [`,
    songs.map(formatSong).join('\n'),
    '];',
    '',
  ].join('\n');

  fs.writeFileSync(filePath, content, 'utf8');
}

async function main() {
  const bhojpuriText = fs.readFileSync(FILES.bhojpuri, 'utf8');
  const himeshText = fs.readFileSync(FILES.himesh, 'utf8');
  const kkText = fs.readFileSync(FILES.kk, 'utf8');

  const bhojpuriTriples = extractInlineTriples(bhojpuriText);
  if (!bhojpuriTriples.length) {
    throw new Error('Could not parse Bhojpuri seed titles.');
  }

  const himeshSeeds = extractSongObjects(himeshText).map((row, index) => ({
    id: `himesh-${index + 1}`,
    title: row.title,
    artist: row.artist,
    album: row.album,
  }));

  const kkSeeds = extractSongObjects(kkText).map((row, index) => ({
    id: `kk-${index + 1}`,
    title: row.title,
    artist: row.artist,
    album: row.album,
  }));

  const bhojpuriSeeds = bhojpuriTriples.map((row, index) => ({
    id: `bhojpuri-${index + 1}`,
    title: row.title,
    artist: row.artist,
    album: row.album,
  }));

  const [bhojpuriResult, himeshResult, kkResult] = await Promise.all([
    resolveList('bhojpuri', bhojpuriSeeds),
    resolveList('himesh', himeshSeeds),
    resolveList('kk', kkSeeds),
  ]);

  writeSongFile(FILES.bhojpuri, 'bhojpuriSongs', bhojpuriResult.resolved);
  writeSongFile(FILES.himesh, 'himeshSongs', himeshResult.resolved);
  writeSongFile(FILES.kk, 'kkSongs', kkResult.resolved);

  console.log('--- SUMMARY ---');
  console.log(
    `bhojpuri: ${bhojpuriResult.resolved.length} resolved, ${bhojpuriResult.unresolved.length} unresolved`
  );
  console.log(
    `himesh: ${himeshResult.resolved.length} resolved, ${himeshResult.unresolved.length} unresolved`
  );
  console.log(`kk: ${kkResult.resolved.length} resolved, ${kkResult.unresolved.length} unresolved`);

  if (
    bhojpuriResult.unresolved.length ||
    himeshResult.unresolved.length ||
    kkResult.unresolved.length
  ) {
    console.log('Unresolved titles:');
    for (const title of bhojpuriResult.unresolved) console.log(`- [bhojpuri] ${title}`);
    for (const title of himeshResult.unresolved) console.log(`- [himesh] ${title}`);
    for (const title of kkResult.unresolved) console.log(`- [kk] ${title}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
