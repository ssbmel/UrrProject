import { create } from "zustand";
import { Dispatch, RefObject, SetStateAction } from "react"

import { Addr, PaymentData, ProductList } from "../../types/addr.type";
import { persist } from "zustand/middleware";

type refContent = RefObject<HTMLDivElement> | null; 

interface AddrStore {
  addrData: Addr | null;
  setAddrData: (data: Addr) => void;
  paymentData: PaymentData | null;
  setPaymentData: (data: PaymentData) => void;
  productList: ProductList[] | null;
  setProductList: (data: ProductList[]) => void;
  refContent : refContent
  setRefContent: (data: RefObject<HTMLDivElement> | null) => void;
  clearData: () => void;
}

export const useAddrStore = create(
  persist<AddrStore>(
    (set) => ({
      addrData: null,
      setAddrData: (data: Addr) => set({ addrData: data }),
      paymentData: null,
      setPaymentData: (data: PaymentData) => set({ paymentData: data }),
      productList: null,
      setProductList: (data: ProductList[]) => set({ productList: data }),
      refContent: null,
      setRefContent: (data: refContent) => set({ refContent: data }),
      clearData: () => set({ paymentData: null, productList: null }) // Implement clearData method
    }),
    {
      name: "AddrStore",
      //@ts-ignore
      partialize: (state) => ({
        addrData: state.addrData,
        paymentData: state.paymentData,
        productList: state.productList,
      }),
    }
  )
);

export const clearPaymentData = () => {
  localStorage.removeItem("AddrStore");
  useAddrStore.getState().clearData();
};
