import { create } from "zustand";

interface AlertchatStore {
  isAlert: Boolean;
  setIsAlert: (data: Boolean) => void;
  isChatModalOpen: Boolean;
  setIsChatModalOpen: (data: Boolean) => void;
  clearData: () => void;
}

export const useAlertchatStore = create<AlertchatStore>((set) => ({
  isAlert: false,
  setIsAlert: (data: Boolean) => set({ isAlert: data }),
  isChatModalOpen: false,
  setIsChatModalOpen: (data: Boolean) => set({ isChatModalOpen: data }),
  clearData: () => set({ isAlert: false }) // Implement clearData method
}));