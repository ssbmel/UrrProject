import { create } from 'zustand';

interface userState {
  userInfo: users | null;
  setUserInfo: (info: users) => void;
}

export const userDataStore = create((set) => ({
  userInfo: {},
  setUserInfo: (info) => set({ userInfo: info })
}));
