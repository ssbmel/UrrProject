import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type LoginState = {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
};

export const useLoginStore = create<LoginState>((set) => ({
  isLogin: false,
  login: () => set({ isLogin: true }),
  logout: () => set({ isLogin: false })
}));
