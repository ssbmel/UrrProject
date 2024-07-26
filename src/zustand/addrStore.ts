import { create } from "zustand";
import { Addr } from "../../types/addr.type";

interface AddrStore {
  addrData: Addr | null;
  setAddrData: (data: Addr) => void;
}

export const useAddrStore = create<AddrStore>((set) => ({
  addrData: null,
  setAddrData: (data: Addr) => set({ addrData: data })
}));
