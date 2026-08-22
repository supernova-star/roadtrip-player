import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PlayerPreferencesState {
  showMiniPlayer: boolean;
  showQueueShortcut: boolean;
  showProgressBar: boolean;
  setShowMiniPlayer: (showMiniPlayer: boolean) => void;
  setShowQueueShortcut: (showQueueShortcut: boolean) => void;
  setShowProgressBar: (showProgressBar: boolean) => void;
}

export const usePlayerPreferencesStore = create<PlayerPreferencesState>()(
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
    }
  )
);
