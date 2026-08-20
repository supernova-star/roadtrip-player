import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PlayerPreferencesState {
  showMiniPlayer: boolean;
  showQueueShortcut: boolean;
  setShowMiniPlayer: (showMiniPlayer: boolean) => void;
  setShowQueueShortcut: (showQueueShortcut: boolean) => void;
}

export const usePlayerPreferencesStore = create<PlayerPreferencesState>()(
  persist(
    (set) => ({
      showMiniPlayer: true,
      showQueueShortcut: true,
      setShowMiniPlayer: (showMiniPlayer) => set({ showMiniPlayer }),
      setShowQueueShortcut: (showQueueShortcut) => set({ showQueueShortcut }),
    }),
    {
      name: 'roadtrip-player-preferences',
    }
  )
);