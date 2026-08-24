import type { VercelRequest, VercelResponse } from '@vercel/node';

type SearchSong = {
  id: string;
  title: string;
  artist: string;
  album: string;
  imageUrl: string;
  audioUrl: string;
};

const getRecord = (value: unknown): Record<string, unknown> | null =>
  value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;

const getString = (...values: unknown[]): string => {
  const value = values.find((candidate) => typeof candidate === 'string');
  return typeof value === 'string' ? value : '';
};

const getArtistNames = (...values: unknown[]): string => {
  const directValue = getString(...values);
  if (directValue) {
    return directValue;
  }

  const artists = values.find(Array.isArray);
  if (!artists) {
    return '';
  }

  return artists
    .map((artist) => getString(getRecord(artist)?.name))
    .filter(Boolean)
    .join(', ');
};

const toStaticAudioUrl = (audioUrl: string) => {
  if (!audioUrl) {
    return '';
  }

  try {
    const url = new URL(audioUrl);
    url.protocol = 'https:';
    url.hostname = 'aac.saavncdn.com';
    url.search = '';
    url.hash = '';
    url.pathname = url.pathname.replace(/_\d+\.mp4$/, '_160.mp4');

    return url.toString();
  } catch {
    return audioUrl.replace(/_\d+\.mp4$/, '_160.mp4');
  }
};

const getAuthorizedAudioUrl = async (encryptedMediaUrl: string) => {
  const searchParams = new URLSearchParams({
    __call: 'song.generateAuthToken',
    url: encryptedMediaUrl,
    bitrate: '320',
    api_version: '4',
    _format: 'json',
    _marker: '0',
    ctx: 'web6dot0',
  });
  const response = await fetch(
    `https://www.jiosaavn.com/api.php?${searchParams}`,
  );

  if (!response.ok) {
    return '';
  }

  return toStaticAudioUrl(
    getString(getRecord(await response.json())?.auth_url),
  );
};

const getAudioUrl = async (
  moreInfo: Record<string, unknown> | null,
  songAudioUrl: unknown,
) => {
  const encryptedMediaUrl = getString(moreInfo?.encrypted_media_url);

  if (encryptedMediaUrl) {
    return getAuthorizedAudioUrl(encryptedMediaUrl);
  }

  return toStaticAudioUrl(getString(moreInfo?.media_url, songAudioUrl));
};

const transformResults = async (payload: unknown): Promise<SearchSong[]> => {
  const payloadRecord = getRecord(payload);
  const results = payloadRecord?.results;

  if (!Array.isArray(results)) {
    return [];
  }

  return Promise.all(
    results.map(async (result) => {
      const song = getRecord(result);
      const moreInfo = getRecord(song?.more_info);
      const artistMap = getRecord(moreInfo?.artistMap);

      return {
        id: getString(song?.id),
        title: getString(song?.title),
        artist: getArtistNames(
          song?.primary_artists,
          moreInfo?.primary_artists,
          artistMap?.primary_artists,
        ),
        album: getString(song?.album, moreInfo?.album),
        imageUrl: getString(song?.image, moreInfo?.image),
        audioUrl: await getAudioUrl(moreInfo, song?.audio_url),
      };
    }),
  );
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const query = Array.isArray(req.query.q) ? req.query.q[0] : req.query.q;
  const searchQuery = query?.trim();

  if (!searchQuery) {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }

  try {
    const searchParams = new URLSearchParams({
      __call: 'search.getResults',
      q: searchQuery,
      n: '10',
      p: '1',
      _format: 'json',
      _marker: '0',
      ctx: 'web6dot0',
      api_version: '4',
    });
    const response = await fetch(
      `https://www.jiosaavn.com/api.php?${searchParams}`,
    );

    if (!response.ok) {
      throw new Error(`JioSaavn search request failed with ${response.status}`);
    }

    return res.status(200).json({
      results: await transformResults(await response.json()),
    });
  } catch {
    return res.status(500).json({ error: 'Unable to search JioSaavn songs' });
  }
}
