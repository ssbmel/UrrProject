import { create } from "zustand";
import { Dispatch, RefObject, SetStateAction } from "react"


import { persist } from "zustand/middleware";

interface AlertchatStore {
  isAlert: Boolean;
  setIsAlert: (data: Boolean) => void;
  clearData: () => void;
}

export const useAlertchatStore = create<AlertchatStore>((set) => ({
  isAlert: false,
  setIsAlert: (data: Boolean) => set({ isAlert: data }),

  clearData: () => set({ isAlert: false }) // Implement clearData method
}));