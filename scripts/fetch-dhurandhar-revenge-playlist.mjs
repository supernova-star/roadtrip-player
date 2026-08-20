import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import crypto from 'node:crypto';

const ROOT = process.cwd();
const OUTPUT_FILE = path.join(ROOT, 'src/constants/playlistSongs/dhurandhar.ts');
const ALBUM_ID = '73765671'; // "Dhurandhar The Revenge"

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

async function getAlbumDetails(albumId) {
  const url = `https://www.jiosaavn.com/api.php?__call=content.getAlbumDetails&_format=json&_marker=0&albumid=${encodeURIComponent(albumId)}`;
  return requestJson(url);
}

function toSongObject(item, index) {
  const baseAudio = decryptMediaUrl(item.encrypted_media_url || '');
  const audioUrl = baseAudio
    ? baseAudio.replace(/_\d+\.mp4$/, '_160.mp4')
    : item.media_preview_url || '';

  return {
    id: `dhurandhar-revenge-${index + 1}`,
    title: decodeHtmlEntities(cleanTitle(item.song)),
    artist: decodeHtmlEntities((item.primary_artists || item.singers || 'Unknown Artist').trim()),
    album: decodeHtmlEntities((item.album || 'Dhurandhar The Revenge').trim()),
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
  const details = await getAlbumDetails(ALBUM_ID);
  const rawSongs = details?.songs || [];

  if (!rawSongs.length) {
    console.log('Album has no songs in response:');
    console.log(JSON.stringify(details, null, 2));
    return;
  }

  const songs = rawSongs.map(toSongObject);

  const existing = fs.readFileSync(OUTPUT_FILE, 'utf8');
  const insertion = songs.map(formatSong).join('\n') + '\n';
  const updated = existing.replace(/\];\s*$/, `${insertion}];\n`);

  fs.writeFileSync(OUTPUT_FILE, updated);
  console.log(`Appended ${songs.length} songs to ${OUTPUT_FILE}`);
  songs.forEach((song) => console.log(`- ${song.title} (${song.duration}s)`));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
