import { create } from 'zustand';
import { User } from '../../types/common';

interface userState {
  userInfo: User | null;
  setUserInfo: (info: User | null) => void;
}

export const userDataStore = create<userState>((set) => ({
  userInfo: null,
  setUserInfo: (info) => { console.log(info);
   set({ userInfo: info })}
}));
