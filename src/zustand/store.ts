import { create } from 'zustand';
import { User } from '../../types/common';
import { persist } from 'zustand/middleware';

interface userState {
  userInfo: User | null;
  setUserInfo: (info: User | null) => void;
}

export const userDataStore = create(
  persist<userState>(
    (set) => ({
      userInfo: null,
      setUserInfo: (info) => set({ userInfo: info })
    }),
    {
      name: 'userStorage'
    }
  )
);
