import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import crypto from 'node:crypto';

const ROOT = process.cwd();
const OUTPUT_DIR = path.join(ROOT, 'src/constants/playlistSongs');

const PLAYLISTS = [
  {
    key: 'cokeStudioPakistan',
    id: 'coke-studio-pakistan',
    title: 'Coke Studio Pakistan',
    description: 'Recognizable Coke Studio Pakistan collaborations.',
    songs: [
      ['Pasoori', 'Ali Sethi, Shae Gill'],
      ['Afreen Afreen', 'Rahat Fateh Ali Khan, Momina Mustehsan'],
      ['Tu Jhoom', 'Abida Parveen, Naseebo Lal'],
      ['Tajdar-E-Haram', 'Atif Aslam'],
      ['Tera Woh Pyar (Nawazishein Karam)', 'Momina Mustehsan, Asim Azhar'],
      ['Faasle', 'Kaavish, Quratulain Balouch'],
      ['Alif Allah Chambey Di Booty', 'Arif Lohar, Meesha Shafi'],
      ['Chaap Tilak', 'Abida Parveen, Rahat Fateh Ali Khan'],
      ['Latthay Di Chaadar', 'Farhan Saeed, Quratulain Balouch'],
      ['Ranjish Hi Sahi', 'Ali Sethi'],
      ['Kana Yaari', 'Kaifi Khalil, Eva B, Wahab Bugti'],
      ['Neray Neray Vas', 'Soch the Band, Butt Brothers'],
      ['Thagyan', 'Zain Zohaib, Quratulain Balouch'],
      ['Muaziz Saarif', 'Faris Shafi, Meesha Shafi'],
      ['Jhol', 'Maanu, Annural Khalid'],
      ['Blockbuster', 'Faris Shafi, Umair Butt, Gharvi Group'],
      ['O Yaara', 'Abdul Hannan, Kaavish'],
      ['Peechay Hutt', 'Hasan Raheem, Justin Bibis, Talal Qureshi'],
      ['Ye Dunya', 'Karakoram, Faris Shafi, Talha Anjum'],
      ['Tu Kuja Man Kuja', 'Shiraz Uppal, Rafaqat Ali Khan'],
    ],
  },
  {
    key: 'cokeStudioBangla',
    id: 'coke-studio-bangla',
    title: 'Coke Studio Bangla',
    description: 'Folk and Baul-influenced Coke Studio Bangla favorites.',
    songs: [
      ['Noya Daman', 'Muza, Tosiba'],
      ['Bulbuli', 'Rituraj Baidya, Nandita'],
      ['Deora', 'Pritom Hasan, Paloma Majumder'],
      ['Bhober Pagol', 'Jalali Set'],
      ['Murir Tin', 'Chanchal Chowdhury, Mehedi Hasan'],
      ['Ghum Ghum', 'Shayan Chowdhury Arnob, Ripon Sarkar'],
      ['Benche Thakar Gaan', 'Animes Roy'],
      ['Chiltey Roud', 'Arnob, Ripon Sarkar'],
      ['Shondhatara', 'Animes Roy, Pritom Hasan'],
      ['Bulbuli', 'Rituraj Baidya, Nandita'],
      ['Doyal', 'Tashfee, Debanjan Dhar'],
      ['Kotha Koiyo Na', 'Animes Roy, Pritom Hasan'],
      ['Prarthona', 'Arnob'],
      ['Chand Mama', 'Pritom Hasan'],
      ['Nishith Raater Gaan', 'Sunidhi Nayak'],
      ['Tati', 'Adit Rahman'],
      ['Meye', 'Rituraj Baidya'],
      ['Rongila Re', 'Pritom Hasan'],
      ['Patar Bashori', 'Ishaan, Sunidhi Nayak'],
      ['Beni Khule', 'Coke Studio Bangla'],
      ['Aamay Bhashalli Rey', 'Coke Studio Bangla'],
    ],
  },
  {
    key: 'cokeStudioIndia',
    id: 'coke-studio-india',
    title: 'Coke Studio India',
    description: 'Coke Studio India and Coke Studio @ MTV highlights.',
    songs: [
      ['Madari', 'Clinton Cerejo, Vishal Dadlani'],
      ['Nenjukkul Peidhidum', 'A.R. Rahman'],
      ['Tu Kuja', 'Sunidhi Chauhan'],
      ['Zariya', 'A.R. Rahman, Ani Choying Drolma, Farah Siraj'],
      ['Aao Milo Chalo', 'Coke Studio'],
      ['Bismillah', 'Salim-Sulaiman'],
      ['Aaja Nachle', 'Shriram Iyer'],
      ['Husn', 'Papon'],
      ['Iktaara', 'Kavita Seth'],
      ['Naina', 'Sona Mohapatra'],
      ['Vachinde', 'Daler Mehndi'],
      ['Allah Hi Reham', 'Abida Parveen'],
      ['Rangabati', 'Sona Mohapatra, Rituraj Mohanty'],
      ['Manavyalakinchara', 'Shankar Mahadevan'],
      ['Chadh Chadh Jana', 'Harshdeep Kaur, Jazzy B'],
      ['Khwaabon Ke Parindey', 'Benny Dayal'],
      ['Aarambh Hai Prachand', 'Piyush Mishra'],
      ['Kaatru Veliyidai', 'A.R. Rahman'],
      ['Madari', 'Vishal Dadlani, Clinton Cerejo'],
      ['Aaj Jaane Ki Zid Na Karo', 'Coke Studio India'],
    ],
  },
  {
    key: 'monsoonMixtape',
    id: 'monsoon-mixtape',
    title: 'MIX - Monsoon Mixtape',
    description: 'A rainy-day mix of Hindi and Bengali favorites.',
    songs: [
      ['Prithibi Ta Naki Bheegi Bheegi Si Hai', 'Fakirs Official'],
      ['Ishq', 'Faheem Abdullah'],
      ['Tere Ishk Mein', 'A. R. Rahman'],
      ['Zara Zara Let Me Down Slowly', 'JalRaj'],
      ['Tujhko', 'Pritam'],
      ['Toh Phir Aao', 'Pritam'],
      ['Bheegi Bheegi', 'Pritam'],
      ['Khat', 'Navjot Ahuja'],
      ['Jo Tum Mere Ho', 'Anuv Jain'],
      ['Saiyaara', 'Faheem Abdullah'],
      ['Tera Mera Rishta New Version', 'Emraan, Disha, Mithoon, Saaj, Sayeed, Mustafa'],
      ['Jaise Mera Tu', 'Sachin-Jigar'],
      ['Stay', 'King'],
      ['Alvida The Duet', 'Nightfall'],
      ['Kabhi Na Kabhi', 'Shaapit, Aditya Narayan'],
      ['Bulbuli', 'Ritu Raj, Nandita'],
      ['Moner Manush', 'Anupam Roy, Satyaki Banerjee, Babul Supriyo'],
      ['Long Distance Love', 'Ankan, Afrin, Shuvendu'],
      ['Mon Amar Kemon Kemon Kore', 'Snigdhajit Bhowmik, Barenya Saha, Somraj Das'],
      ['Amake Aamar Moto Thaakte Dao', 'Anupam Roy'],
      ['Teri Deewani', 'Kailash Kher, Fakirs'],
      ['Faasla', 'Madhur Sharma, Ravator'],
      ['Tera Mera Rishta 2.0', 'Mustafa Zahid'],
      ['Benche Thakar Gaan', 'Prosenjit, Rupam Islam, Srijit'],
      ['Neel Rang Chhilo Bhishon Priyo', 'Rupam Islam'],
      ['Ekla Ghor', 'Fossils, Rupam Islam'],
      ['Prithibi Ta Naki Chhoto Hote Hote', 'Crosswinds'],
    ],
  },
];

function requestJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { rejectUnauthorized: false, headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (error) {
            reject(new Error(`Failed to parse ${url}: ${error.message}`));
          }
        });
      })
      .on('error', reject);
  });
}

function normalize(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/\(.*?\)/g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function escape(value) {
  return String(value || '').replace(/'/g, "\\'");
}

function pickBest(query, items) {
  const queryTokens = new Set(normalize(query).split(' ').filter(Boolean));
  return (items || []).reduce((best, item) => {
    const candidate = normalize(item.title || item.song);
    const score = [...queryTokens].filter((token) => candidate.includes(token)).length;
    return !best || score > best.score ? { item, score } : best;
  }, null)?.item;
}

function decryptMediaUrl(value) {
  const decipher = crypto.createDecipheriv('des-ecb', Buffer.from('38346591'), null);
  return decipher.update(value, 'base64', 'utf8') + decipher.final('utf8');
}

function coverUrl(value) {
  return String(value || '').replace(/-\d+x\d+(?=\.[a-zA-Z]+$)/, '-500x500');
}

async function resolveSong(title, artist, id, album) {
  const query = `${title} ${artist.split(',')[0]}`;
  const searchUrl = `https://www.jiosaavn.com/api.php?__call=autocomplete.get&_format=json&_marker=0&query=${encodeURIComponent(query)}`;
  const search = await requestJson(searchUrl);
  let result = pickBest(query, search?.songs?.data);
  if (!result?.id) {
    const titleSearchUrl = `https://www.jiosaavn.com/api.php?__call=autocomplete.get&_format=json&_marker=0&query=${encodeURIComponent(title)}`;
    const titleSearch = await requestJson(titleSearchUrl);
    result = pickBest(title, titleSearch?.songs?.data);
  }
  if (!result?.id) return null;

  const detailsUrl = `https://www.jiosaavn.com/api.php?__call=song.getDetails&pids=${encodeURIComponent(result.id)}&_format=json&_marker=0`;
  const details = (await requestJson(detailsUrl))?.[result.id];
  if (!details) return null;

  const decrypted = details.encrypted_media_url ? decryptMediaUrl(details.encrypted_media_url) : '';
  return {
    id,
    title: String(details.song || title)
      .replace(/\s*\(.*?\)\s*/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
    artist: String(details.primary_artists || details.singers || artist).trim(),
    album: String(details.album || album).trim(),
    coverUrl: coverUrl(details.image),
    audioUrl: decrypted
      ? decrypted.replace(/_\d+\.mp4$/, '_160.mp4')
      : details.media_preview_url || '',
    duration: Number(details.duration || 0) || 0,
  };
}

function formatSong(song) {
  return [
    '  {',
    `    id: '${escape(song.id)}',`,
    `    title: '${escape(song.title)}',`,
    `    artist: '${escape(song.artist)}',`,
    `    album: '${escape(song.album)}',`,
    `    coverUrl: '${escape(song.coverUrl)}',`,
    `    audioUrl: '${escape(song.audioUrl)}',`,
    `    duration: ${song.duration},`,
    '  },',
  ].join('\n');
}

async function main() {
  for (const playlist of PLAYLISTS) {
    const resolved = [];
    for (let index = 0; index < playlist.songs.length; index += 1) {
      const [title, artist] = playlist.songs[index];
      const song = await resolveSong(title, artist, `${playlist.id}-${index + 1}`, playlist.title);
      if (song?.audioUrl) resolved.push(song);
      console.log(
        `[${playlist.title}] ${index + 1}/${playlist.songs.length} ${song ? 'resolved' : 'unresolved'}: ${title}`
      );
    }

    const output = [
      "import { Song } from '@/types/music';",
      '',
      `export const ${playlist.key}Songs: Song[] = [`,
      resolved.map(formatSong).join('\n'),
      '];',
      '',
    ].join('\n');
    fs.writeFileSync(path.join(OUTPUT_DIR, `${playlist.id}.ts`), output);
    console.log(`Wrote ${resolved.length}/${playlist.songs.length} songs for ${playlist.title}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
