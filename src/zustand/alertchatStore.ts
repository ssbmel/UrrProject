import { create } from "zustand";
import { Dispatch, RefObject, SetStateAction } from "react"

import { ChatD } from "../../types/alertchat.type";
import { persist } from "zustand/middleware";

type refContent = RefObject<HTMLDivElement> | null; 

interface AlertchatStore {
  chatData: ChatD | null;
  setChatData: (data: ChatD) => void;
  isAlert: Boolean;
  setIsAlert: (data: Boolean) => void;
  refContent : refContent
  setRefContent: (data: RefObject<HTMLDivElement> | null) => void;
  clearData: () => void;
}

export const useAlertchatStore = create(
  persist<AlertchatStore>(
    (set) => ({
      chatData: null,
      setChatData: (data: ChatD) => set({ chatData: data }),
      isAlert: false,
      setIsAlert: (data: Boolean) => set({ isAlert: data }),
      
      refContent: null,
      setRefContent: (data: refContent) => set({ refContent: data }),

      clearData: () => set({ chatData: null, isAlert: false }) // Implement clearData method
    }),
    {
      name: "AddrStore",
      //@ts-ignore
      partialize: (state) => ({
        chatData: state.chatData,
        isAlert: state.isAlert,
      }),
    }
  )
);

export const clearAlertData = () => {
  localStorage.removeItem("AlertchatStore");
  useAlertchatStore.getState().clearData();
};
