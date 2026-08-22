import { useEffect } from 'react';

import { useWallpaper } from '../../hooks/useWallpaper';
import { colorPalette } from '@/theme/colors';
import { useDisplayPreferencesStore } from '@/store/displayPreferencesStore';

export const ThemeManager = () => {
  const { wallpaper, wallpaperPosition } = useWallpaper();
  const blurHomeBackground = useDisplayPreferencesStore((state) => state.blurHomeBackground);
  const homeBackgroundBlur = useDisplayPreferencesStore((state) => state.homeBackgroundBlur);
  const homeOverlayIntensity = useDisplayPreferencesStore((state) => state.homeOverlayIntensity);
  const otherPagesOverlayIntensity = useDisplayPreferencesStore(
    (state) => state.otherPagesOverlayIntensity
  );

  useEffect(() => {
    const root = document.documentElement;
    const isLightMode = wallpaper.theme.mode === 'light';
    const backgroundBlurPx = blurHomeBackground ? Math.round(homeBackgroundBlur / 5) : 0;
    const homeOverlayOpacity = homeOverlayIntensity / 100;
    const otherPagesOverlayOpacity = otherPagesOverlayIntensity / 100;

    root.style.setProperty('--roadtrip-wallpaper', `url("${wallpaper.src}")`);
    root.style.setProperty(
      '--roadtrip-wallpaper-position',
      `${wallpaperPosition.x}% ${wallpaperPosition.y}%`
    );
    root.style.setProperty(
      '--roadtrip-wallpaper-filter',
      backgroundBlurPx > 0 ? `blur(${backgroundBlurPx}px)` : 'none'
    );
    root.style.setProperty(
      '--roadtrip-wallpaper-transform',
      backgroundBlurPx > 0 ? 'scale(1.04)' : 'none'
    );

    root.style.setProperty(
      '--player-background',
      isLightMode ? '#EFF6F3' : wallpaper.theme.playerBackground
    );

    root.style.setProperty('--player-border', wallpaper.theme.playerBorder);

    root.style.setProperty('--player-accent', wallpaper.theme.accent);

    root.style.setProperty(
      '--player-text-primary',
      isLightMode ? '#173235' : wallpaper.theme.textPrimary
    );

    root.style.setProperty(
      '--player-text-secondary',
      isLightMode ? 'rgba(23, 50, 53, 0.72)' : wallpaper.theme.textSecondary
    );

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

    root.style.setProperty(
      '--player-surface',
      isLightMode ? 'rgba(239, 246, 243, 0.86)' : '#0000004f'
    );
    root.style.setProperty(
      '--player-surface-shadow',
      isLightMode
        ? '0 -10px 28px rgba(23, 50, 53, 0.16), inset 0 1px 0 rgba(255,255,255,0.74)'
        : '0 -10px 28px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255,255,255,0.08)'
    );

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
      '--header-glass-background',
      isLightMode
        ? 'linear-gradient(135deg, rgba(255,255,255,0.76), rgba(255,255,255,0.1)), rgba(255,255,255,0.32)'
        : 'linear-gradient(135deg, rgba(0,0,0,0.38), rgba(0,0,0,0.14)), var(--background-dark-transparent)'
    );
    root.style.setProperty(
      '--header-chip-background',
      isLightMode ? 'rgba(255,255,255,0.52)' : 'rgba(0,0,0,0.16)'
    );
    root.style.setProperty(
      '--header-glass-shadow',
      isLightMode
        ? '0 18px 42px rgba(36, 58, 62, 0.14), inset 0 1px 0 rgba(255,255,255,0.85)'
        : '0 18px 42px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.08)'
    );
    root.style.setProperty(
      '--home-page-overlay',
      isLightMode
        ? `rgba(255, 255, 255, ${homeOverlayOpacity})`
        : `rgba(20, 15, 12, ${homeOverlayOpacity})`
    );
    root.style.setProperty(
      '--other-pages-overlay',
      isLightMode
        ? `rgba(255, 255, 255, ${otherPagesOverlayOpacity})`
        : `rgba(20, 15, 12, ${otherPagesOverlayOpacity})`
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
  }, [
    blurHomeBackground,
    homeBackgroundBlur,
    homeOverlayIntensity,
    otherPagesOverlayIntensity,
    wallpaper,
    wallpaperPosition,
  ]);

  return null;
};
