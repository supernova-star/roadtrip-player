import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface PlayerPreferencesState {
  showMiniPlayer: boolean;
  showQueueShortcut: boolean;
  showProgressBar: boolean;
  setShowMiniPlayer: (showMiniPlayer: boolean) => void;
  setShowQueueShortcut: (showQueueShortcut: boolean) => void;
  setShowProgressBar: (showProgressBar: boolean) => void;
}

export const usePlayerPreferencesStore = create<PlayerPreferencesState>()(
  devtools(
    persist(
      (set) => ({
        showMiniPlayer: true,
        showQueueShortcut: true,
        showProgressBar: true,
        setShowMiniPlayer: (showMiniPlayer) => set({ showMiniPlayer }),
        setShowQueueShortcut: (showQueueShortcut) => set({ showQueueShortcut }),
        setShowProgressBar: (showProgressBar) => set({ showProgressBar }),
      }),
      {
        name: 'roadtrip-player-preferences',
      },
    ),
    { name: 'player-preferences-store' },
  ),
);
