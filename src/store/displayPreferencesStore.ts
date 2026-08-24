import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type ClockDateFormat = 'long' | 'numeric' | 'short';

interface DisplayPreferencesState {
  blurHomeBackground: boolean;
  homeBackgroundBlur: number;
  homeOverlayIntensity: number;
  otherPagesOverlayIntensity: number;
  useSolidMobilePageBackground: boolean;
  mobilePageBlur: number;
  showClockCard: boolean;
  showClockDate: boolean;
  clockDateFormat: ClockDateFormat;
  showHeaderCard: boolean;
  showHeaderNowPlaying: boolean;
  showHeaderQuote: boolean;
  showHeaderClock: boolean;
  setBlurHomeBackground: (blurHomeBackground: boolean) => void;
  setHomeBackgroundBlur: (homeBackgroundBlur: number) => void;
  setHomeOverlayIntensity: (homeOverlayIntensity: number) => void;
  setOtherPagesOverlayIntensity: (otherPagesOverlayIntensity: number) => void;
  setUseSolidMobilePageBackground: (
    useSolidMobilePageBackground: boolean,
  ) => void;
  setMobilePageBlur: (mobilePageBlur: number) => void;
  setShowClockCard: (showClockCard: boolean) => void;
  setShowClockDate: (showClockDate: boolean) => void;
  setClockDateFormat: (clockDateFormat: ClockDateFormat) => void;
  setShowHeaderCard: (showHeaderCard: boolean) => void;
  setShowHeaderNowPlaying: (showHeaderNowPlaying: boolean) => void;
  setShowHeaderQuote: (showHeaderQuote: boolean) => void;
  setShowHeaderClock: (showHeaderClock: boolean) => void;
}

const clampPercentage = (value: number) => Math.max(0, Math.min(value, 100));
const clampBlur = (value: number) => Math.max(1, Math.min(value, 100));

export const useDisplayPreferencesStore = create<DisplayPreferencesState>()(
  devtools(
    persist(
      (set) => ({
        blurHomeBackground: false,
        homeBackgroundBlur: 0,
        homeOverlayIntensity: 0,
        otherPagesOverlayIntensity: 0,
        useSolidMobilePageBackground: true,
        mobilePageBlur: 20,
        showClockCard: false,
        showClockDate: false,
        clockDateFormat: 'short',
        showHeaderCard: true,
        showHeaderNowPlaying: true,
        showHeaderQuote: true,
        showHeaderClock: true,
        setBlurHomeBackground: (blurHomeBackground) =>
          set({ blurHomeBackground }),
        setHomeBackgroundBlur: (homeBackgroundBlur) =>
          set({ homeBackgroundBlur: clampPercentage(homeBackgroundBlur) }),
        setHomeOverlayIntensity: (homeOverlayIntensity) =>
          set({ homeOverlayIntensity: clampPercentage(homeOverlayIntensity) }),
        setOtherPagesOverlayIntensity: (otherPagesOverlayIntensity) =>
          set({
            otherPagesOverlayIntensity: clampPercentage(
              otherPagesOverlayIntensity,
            ),
          }),
        setUseSolidMobilePageBackground: (useSolidMobilePageBackground) =>
          set({ useSolidMobilePageBackground }),
        setMobilePageBlur: (mobilePageBlur) =>
          set({ mobilePageBlur: clampBlur(mobilePageBlur) }),
        setShowClockCard: (showClockCard) => set({ showClockCard }),
        setShowClockDate: (showClockDate) => set({ showClockDate }),
        setClockDateFormat: (clockDateFormat) => set({ clockDateFormat }),
        setShowHeaderCard: (showHeaderCard) => set({ showHeaderCard }),
        setShowHeaderNowPlaying: (showHeaderNowPlaying) =>
          set({ showHeaderNowPlaying }),
        setShowHeaderQuote: (showHeaderQuote) => set({ showHeaderQuote }),
        setShowHeaderClock: (showHeaderClock) => set({ showHeaderClock }),
      }),
      {
        name: 'roadtrip-display-preferences',
        merge: (persistedState, currentState) => {
          const persisted =
            persistedState as Partial<DisplayPreferencesState> & {
              pageOverlayIntensity?: number;
            };
          const legacyOverlayIntensity = persisted.pageOverlayIntensity;

          return {
            ...currentState,
            ...persisted,
            homeOverlayIntensity:
              persisted.homeOverlayIntensity ??
              legacyOverlayIntensity ??
              currentState.homeOverlayIntensity,
            otherPagesOverlayIntensity:
              persisted.otherPagesOverlayIntensity ??
              legacyOverlayIntensity ??
              currentState.otherPagesOverlayIntensity,
          };
        },
      },
    ),
    { name: 'display-preferences-store' },
  ),
);
