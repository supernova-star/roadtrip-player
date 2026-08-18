import { useEffect } from 'react';

import { useWallpaper } from '../../hooks/useWallpaper';
import { colorPalette } from '@/theme/colors';

export const ThemeManager = () => {
  const { wallpaper, wallpaperPosition } = useWallpaper();

  useEffect(() => {
    const root = document.documentElement;
    const isLightMode = wallpaper.theme.mode === 'light';

    root.style.setProperty('--roadtrip-wallpaper', `url("${wallpaper.src}")`);
    root.style.setProperty(
      '--roadtrip-wallpaper-position',
      `${wallpaperPosition.x}% ${wallpaperPosition.y}%`
    );

    root.style.setProperty('--player-background', wallpaper.theme.playerBackground);

    root.style.setProperty('--player-border', wallpaper.theme.playerBorder);

    root.style.setProperty('--player-accent', wallpaper.theme.accent);

    root.style.setProperty('--player-text-primary', wallpaper.theme.textPrimary);

    root.style.setProperty('--player-text-secondary', wallpaper.theme.textSecondary);

    root.style.setProperty('--player-text-disabled', wallpaper.theme.textDisabled);

    root.style.setProperty('--blur-text-accent', wallpaper.theme.blurTextAccent);

    root.style.setProperty(
      '--background-transparent',
      isLightMode ? 'rgba(255, 255, 255, 0.48)' : colorPalette.backgroundTransparent
    );

    root.style.setProperty(
      '--background-selected',
      isLightMode ? 'rgba(255, 255, 255, 0.72)' : colorPalette.backgroundSelected
    );

    root.style.setProperty(
      '--background-dark-transparent',
      isLightMode ? 'rgba(36, 58, 62, 0.08)' : colorPalette.backgroundDarkTransparent
    );

    root.style.setProperty(
      '--background-dark-selected',
      isLightMode ? 'rgba(36, 58, 62, 0.14)' : colorPalette.backgroundDarkSelected
    );

    root.style.setProperty(
      '--surface-panel',
      isLightMode ? 'rgba(255, 255, 255, 0.58)' : 'rgba(255, 255, 255, 0.07)'
    );

    // root.style.setProperty(
    //   '--surface-panel-strong',
    //   isLightMode ? 'rgba(255, 255, 255, 0.82)' : wallpaper.theme.playerBackground
    // );

    root.style.setProperty(
      '--surface-panel-strong',
      isLightMode ? wallpaper.theme.playerBackground : wallpaper.theme.playerBackground
    );

    root.style.setProperty(
      '--surface-selected',
      isLightMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.16)'
    );
    root.style.setProperty(
      '--surface-chip',
      isLightMode ? 'rgba(255, 255, 255, 0.62)' : 'rgba(255, 255, 255, 0.08)'
    );
    root.style.setProperty(
      '--surface-chip-border',
      isLightMode ? 'rgba(183, 206, 204, 0.95)' : 'rgba(255,255,255,0.25)'
    );
    root.style.setProperty(
      '--page-overlay',
      isLightMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(20, 15, 12, 0.42)'
    );
    root.style.setProperty(
      '--surface-shadow',
      isLightMode
        ? '0 12px 28px rgba(90, 110, 115, 0.16), inset 0 1px 0 rgba(255,255,255,0.65)'
        : '0 10px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.06)'
    );
    root.style.setProperty(
      '--surface-shadow-selected',
      isLightMode
        ? '0 16px 32px rgba(90, 110, 115, 0.2), inset 0 1px 0 rgba(255,255,255,0.8)'
        : '0 14px 26px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255,255,255,0.12)'
    );
  }, [wallpaper, wallpaperPosition]);

  return null;
};
