import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface WallpaperState {
  wallpaperId: string;
  wallpaperPositions: Record<string, WallpaperPosition>;
  setWallpaper: (wallpaperId: string) => void;
  setWallpaperPosition: (
    wallpaperId: string,
    position: WallpaperPosition,
  ) => void;
}

export interface WallpaperPosition {
  x: number;
  y: number;
}

export const useWallpaperStore = create<WallpaperState>()(
  devtools(
    persist(
      (set) => ({
        wallpaperId: 'road-trip',
        wallpaperPositions: {},

        setWallpaper: (wallpaperId) => {
          set({
            wallpaperId,
          });
        },
        setWallpaperPosition: (wallpaperId, position) => {
          set((state) => ({
            wallpaperPositions: {
              ...state.wallpaperPositions,
              [wallpaperId]: position,
            },
          }));
        },
      }),
      {
        name: 'roadtrip-wallpaper',
      },
    ),
    { name: 'wallpaper-store' },
  ),
);
