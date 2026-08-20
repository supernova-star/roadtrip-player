import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserProfileState {
  userName: string | null;
  setUserName: (userName: string) => void;
  clearUserName: () => void;
}

export const useUserProfileStore = create<UserProfileState>()(
  persist(
    (set) => ({
      userName: null,
      setUserName: (userName) => set({ userName }),
      clearUserName: () => set({ userName: null }),
    }),
    {
      name: 'roadtrip-user-profile',
    }
  )
);
