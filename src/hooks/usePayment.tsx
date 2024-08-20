"use client";

import PortOne from "@portone/browser-sdk/v2";
import { useUserData } from "./useUserData";
import { uuid } from "uuidv4";
import { useCallback } from "react";
import { useAddrStore } from "@/zustand/addrStore";
import { ProductList } from "../../types/addr.type";

interface paymentType {
  fullName: string;
  orderCount: number;
  orderName: string;
  price: number;
  address: string;
  phoneNumber: string;
  productList: ProductList[];
  request: string;
}

const usePayment = () => {
  const { data } = useUserData();
  const { setPaymentData } = useAddrStore();

  const makePayment = useCallback(
    async (req: paymentType) => {
      const paymentId = uuid();
      const email = data.email;
      const customerId = data.id;

      setPaymentData({
        fullName: req.fullName,
        userId: customerId,
        orderCount: req.orderCount,
        price: req.price,
        orderName: req.orderName,
        address: req.address,
        phoneNumber: req.phoneNumber,
        productList: req.productList,
        request: req.request
      });

      const response = await PortOne.requestPayment({
        storeId: "store-094c2470-d0a2-4f20-b350-87b98f1e345c",

        channelKey: "channel-key-bcf487fd-75d7-4863-977c-cf468a354a86",
        paymentId,
        customer: {
          customerId,
          fullName: req.fullName,
          email,
          phoneNumber: req.phoneNumber
        },
        orderName: req.orderName,
        totalAmount: req.price + 3000,
        currency: "CURRENCY_KRW",
        products: req.productList,
        payMethod: "CARD",
        redirectUrl: "https://urr-final.vercel.app/payment/loading"
      });

      return response;
    },
    [data, setPaymentData]
  );

  return makePayment;
};

export default usePayment;
