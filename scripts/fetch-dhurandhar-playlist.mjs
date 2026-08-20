import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import crypto from 'node:crypto';

const ROOT = process.cwd();
const OUTPUT_FILE = path.join(ROOT, 'src/constants/playlistSongs/dhurandhar.ts');

function requestJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          rejectUnauthorized: false,
          headers: { 'User-Agent': 'Mozilla/5.0' },
        },
        (res) => {
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
        }
      )
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

function decodeHtmlEntities(value) {
  return String(value || '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

async function searchAlbums(query) {
  const url = `https://www.jiosaavn.com/api.php?__call=autocomplete.get&_format=json&_marker=0&query=${encodeURIComponent(query)}`;
  const data = await requestJson(url);
  return data?.albums?.data || [];
}

async function getAlbumDetails(albumId) {
  const url = `https://www.jiosaavn.com/api.php?__call=content.getAlbumDetails&_format=json&_marker=0&albumid=${encodeURIComponent(albumId)}`;
  return requestJson(url);
}

function toSongObject(item) {
  const baseAudio = decryptMediaUrl(item.encrypted_media_url || '');
  const audioUrl = baseAudio
    ? baseAudio.replace(/_\d+\.mp4$/, '_160.mp4')
    : item.media_preview_url || '';

  return {
    id: item.id,
    title: decodeHtmlEntities(cleanTitle(item.song)),
    artist: decodeHtmlEntities((item.primary_artists || item.singers || 'Unknown Artist').trim()),
    album: decodeHtmlEntities((item.album || 'Dhurandhar').trim()),
    coverUrl: toCover500(item.image || ''),
    audioUrl,
    duration: Number(item.duration || 0) || 0,
  };
}

function formatSong(song) {
  return [
    '  {',
    `    id: '${song.id}',`,
    `    title: '${song.title.replace(/'/g, "\\'")}',`,
    `    artist: '${song.artist.replace(/'/g, "\\'")}',`,
    `    album: '${song.album.replace(/'/g, "\\'")}',`,
    `    coverUrl: '${song.coverUrl.replace(/'/g, "\\'")}',`,
    `    audioUrl: '${song.audioUrl.replace(/'/g, "\\'")}',`,
    `    duration: ${song.duration},`,
    '  },',
  ].join('\n');
}

async function main() {
  const albums = await searchAlbums('Dhurandhar');
  const match = albums.find((album) =>
    String(album.title || '')
      .toLowerCase()
      .includes('dhurandhar')
  );

  if (!match) {
    console.log('No matching album found for "Dhurandhar". Raw results:');
    console.log(JSON.stringify(albums, null, 2));
    return;
  }

  console.log(`Found album: ${match.title} (id: ${match.id})`);

  const details = await getAlbumDetails(match.id);
  const rawSongs = details?.songs || [];

  if (!rawSongs.length) {
    console.log('Album has no songs in response:');
    console.log(JSON.stringify(details, null, 2));
    return;
  }

  const songs = rawSongs.map(toSongObject);

  const fileContent = [
    "import { Song } from '@/types/music';",
    '',
    'export const dhurandharSongs: Song[] = [',
    songs.map(formatSong).join('\n'),
    '];',
    '',
  ].join('\n');

  fs.writeFileSync(OUTPUT_FILE, fileContent);
  console.log(`Wrote ${songs.length} songs to ${OUTPUT_FILE}`);
  songs.forEach((song) => console.log(`- ${song.title} (${song.duration}s)`));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
