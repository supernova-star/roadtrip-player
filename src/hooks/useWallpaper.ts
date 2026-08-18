import { useWallpaperStore, type WallpaperPosition } from '@/store/wallpaperStore';
import { wallpapers } from '../constants/wallpapers';

export const useWallpaper = () => {
  const wallpaperId = useWallpaperStore((state) => state.wallpaperId);

  const setWallpaper = useWallpaperStore((state) => state.setWallpaper);
  const wallpaperPosition = useWallpaperStore((state) => state.wallpaperPositions[wallpaperId]);
  const setWallpaperPosition = useWallpaperStore((state) => state.setWallpaperPosition);

  const wallpaper = wallpapers.find((item) => item.id === wallpaperId) ?? wallpapers[0];

  const isLightMode = wallpaper.theme.mode === 'light';

  return {
    wallpaper,
    wallpapers,
    setWallpaper,
    wallpaperPosition: wallpaperPosition ?? ({ x: 50, y: 50 } satisfies WallpaperPosition),
    setWallpaperPosition,
    isLightMode,
  };
};
