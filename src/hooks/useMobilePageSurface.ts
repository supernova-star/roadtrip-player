import type { CSSProperties } from 'react';
import { useDisplayPreferencesStore } from '@/store/displayPreferencesStore';

export const useMobilePageSurface = (): CSSProperties => {
  const useSolidMobilePageBackground = useDisplayPreferencesStore(
    (state) => state.useSolidMobilePageBackground
  );
  const mobilePageBlur = useDisplayPreferencesStore((state) => state.mobilePageBlur);

  return {
    backgroundColor: useSolidMobilePageBackground ? 'var(--surface-panel-strong)' : 'transparent',
    backdropFilter: `blur(${useSolidMobilePageBackground ? 24 : mobilePageBlur}px)`,
  };
};
