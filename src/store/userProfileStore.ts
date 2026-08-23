import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserProfileState {
  userName: string | null;
  isAdmin: boolean;
  setUserName: (userName: string) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  clearUserName: () => void;
}

export const useUserProfileStore = create<UserProfileState>()(
  persist(
    (set) => ({
      userName: null,
      isAdmin: false,
      setUserName: (userName) => set({ userName }),
      setIsAdmin: (isAdmin) => set({ isAdmin }),
      clearUserName: () => set({ userName: null }),
    }),
    {
      name: 'roadtrip-user-profile',
    }
  )
);
