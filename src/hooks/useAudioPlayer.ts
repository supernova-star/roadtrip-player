import { useEffect, useRef } from 'react';
import { usePlayerStore } from '../store/playerStore';
import { getCachedAudioUrl } from '../utils/audioPlaylistCache';

const getResolvedAudioUrl = (audioUrl: string) =>
  new URL(audioUrl, window.location.href).href;

export function useAudioPlayer() {
  const currentSong = usePlayerStore((state) => state.currentSong);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const currentTime = usePlayerStore((state) => state.currentTime);
  const queue = usePlayerStore((state) => state.queue);
  const currentIndex = usePlayerStore((state) => state.currentIndex);
  const currentPlaylistId = usePlayerStore((state) => state.currentPlaylistId);
  const play = usePlayerStore((state) => state.play);
  const pause = usePlayerStore((state) => state.pause);
  const next = usePlayerStore((state) => state.next);
  const setCurrentTime = usePlayerStore((state) => state.setCurrentTime);
  const setDuration = usePlayerStore((state) => state.setDuration);
  const previous = usePlayerStore((state) => state.previous);
  const setIsBuffering = usePlayerStore((state) => state.setIsBuffering);

  const audioRef = useRef<HTMLAudioElement>(new Audio());

  useEffect(() => {
    const audio = audioRef.current;
    let cachedAudioUrl: string | null = null;
    let isCurrent = true;
    if ('mediaSession' in navigator && currentSong) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentSong.title,
        artist: currentSong.artist,
        album: currentSong.album ?? 'Roadtrip Player',
        artwork: currentSong.coverUrl
          ? [
              {
                src: currentSong.coverUrl,
                sizes: '512x512',
                type: 'image/png',
              },
            ]
          : [],
      });
    }
    if (!currentSong) {
      audio.pause();
      setIsBuffering(false);
      return;
    }

    const setAudioSource = (audioUrl: string) => {
      if (audio.src !== audioUrl) {
        audio.src = audioUrl;
        setCurrentTime(0);
        setDuration(currentSong.duration ?? 0);
      }
    };

    setAudioSource(getResolvedAudioUrl(currentSong.audioUrl));
    void getCachedAudioUrl(currentPlaylistId, currentSong.id).then(
      (audioUrl) => {
        if (!isCurrent || !audioUrl) {
          return;
        }

        cachedAudioUrl = audioUrl;
        setAudioSource(audioUrl);
      },
    );

    return () => {
      isCurrent = false;
      if (cachedAudioUrl) {
        URL.revokeObjectURL(cachedAudioUrl);
      }
    };
  }, [
    currentPlaylistId,
    currentSong,
    setCurrentTime,
    setDuration,
    setIsBuffering,
  ]);

  useEffect(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      const startPlayback = () => {
        audio
          .play()
          .then(() => {
            setIsBuffering(false);
          })
          .catch(() => {
            setIsBuffering(false);
            // Autoplay may be blocked; maintain state and allow user interactions later.
          });
      };

      if (audio.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        startPlayback();
      } else {
        setIsBuffering(true);
        audio.addEventListener('canplay', startPlayback, { once: true });
      }

      return () => {
        audio.removeEventListener('canplay', startPlayback);
      };
    } else {
      audio.pause();
      setIsBuffering(false);
    }
  }, [currentSong, isPlaying, setIsBuffering]);

  useEffect(() => {
    if (!('mediaSession' in navigator)) {
      return;
    }

    navigator.mediaSession.setActionHandler('play', play);
    navigator.mediaSession.setActionHandler('pause', pause);
    navigator.mediaSession.setActionHandler('nexttrack', next);
    navigator.mediaSession.setActionHandler('previoustrack', previous);

    return () => {
      navigator.mediaSession.setActionHandler('play', null);
      navigator.mediaSession.setActionHandler('pause', null);
      navigator.mediaSession.setActionHandler('nexttrack', null);
      navigator.mediaSession.setActionHandler('previoustrack', null);
    };
  }, [play, pause, next, previous]);

  useEffect(() => {
    const audio = audioRef.current;
    if (Math.abs(audio.currentTime - currentTime) > 0.5) {
      audio.currentTime = currentTime;
    }
  }, [currentTime]);

  useEffect(() => {
    const audio = audioRef.current;
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleBuffering = () => {
      if (usePlayerStore.getState().isPlaying) {
        setIsBuffering(true);
      }
    };

    const handlePlaybackReady = () => {
      setIsBuffering(false);
    };

    const handleEnded = () => {
      const hasNext = queue.length > 0 && currentIndex < queue.length - 1;
      if (hasNext) {
        next();
      } else {
        setIsBuffering(false);
        pause();
      }
    };

    audio.addEventListener('loadstart', handleBuffering);
    audio.addEventListener('waiting', handleBuffering);
    audio.addEventListener('stalled', handleBuffering);
    audio.addEventListener('canplay', handlePlaybackReady);
    audio.addEventListener('playing', handlePlaybackReady);
    audio.addEventListener('pause', handlePlaybackReady);
    audio.addEventListener('error', handlePlaybackReady);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadstart', handleBuffering);
      audio.removeEventListener('waiting', handleBuffering);
      audio.removeEventListener('stalled', handleBuffering);
      audio.removeEventListener('canplay', handlePlaybackReady);
      audio.removeEventListener('playing', handlePlaybackReady);
      audio.removeEventListener('pause', handlePlaybackReady);
      audio.removeEventListener('error', handlePlaybackReady);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [
    currentIndex,
    queue.length,
    next,
    pause,
    setCurrentTime,
    setDuration,
    setIsBuffering,
  ]);
}
