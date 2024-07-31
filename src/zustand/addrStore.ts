import { create } from "zustand";
import { Addr, PaymentData } from "../../types/addr.type";
import { persist } from "zustand/middleware";

interface AddrStore {
  addrData: Addr | null;
  setAddrData: (data: Addr) => void;
  paymentData: PaymentData | null;
  setPaymentData: (data: PaymentData) => void;
  clearData: () => void;
}

export const useAddrStore = create(
  persist<AddrStore>(
    (set) => ({
      addrData: null,
      setAddrData: (data: Addr) => set({ addrData: data }),
      paymentData: null,
      setPaymentData: (data: PaymentData) => set({ paymentData: data }),
      clearData: () => set({ paymentData: null }) // Implement clearData method
    }),
    {
      name: "AddrStore"
    }
  )
);

export const clearPaymentData = () => {
  localStorage.removeItem("AddrStore");
  useAddrStore.getState().clearData();
};
