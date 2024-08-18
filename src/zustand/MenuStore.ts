import { create } from "zustand";

interface MenuStore {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

export const useMenuStore = create<MenuStore>((set) => ({
  activeMenu: "/",
  setActiveMenu: (menu) => set({ activeMenu: menu })
}));
