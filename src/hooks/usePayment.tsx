"use client";

import PortOne from "@portone/browser-sdk/v2";
import { useUserData } from "./useUserData";
import { uuid } from "uuidv4";
import { useCallback } from "react";

interface paymentType {
  fullName: string;
  orderCount: number;
  orderName: string; // 주문상품 이름
  totalAmount: number; // 전체 금액
  price: number; // 상품 하나 가격
  address: string;
  phoneNumber: string;
}

const usePayment = () => {
  const { data } = useUserData();

  const makePayment = useCallback(
    async (req: paymentType) => {
      const paymentId = uuid(); // 주문 번호 uuid 고유값, primary key
      const email = data.email;
      const customerId = data.id;

      const response = await PortOne.requestPayment({
        // Store ID 설정
        storeId: "store-094c2470-d0a2-4f20-b350-87b98f1e345c",
        // 채널 키 설정
        channelKey: "channel-key-bcf487fd-75d7-4863-977c-cf468a354a86",
        paymentId,
        customer: {
          customerId,
          fullName: req.fullName,
          email,
          phoneNumber: req.phoneNumber
        },
        orderName: req.orderName,
        totalAmount: req.totalAmount,
        currency: "CURRENCY_KRW",
        products: [{ id: "dd", name: "apple", amount: 400, quantity: 3 }], // 상품 목록
        payMethod: "CARD",
        redirectUrl: "http://localhost:3000/payment/loading",
        customData: {
          message: "i dont know"
        }
      });

      console.log(response);

      if (response && response.paymentId) {
        try {
          const res = await fetch("/api/payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              name: req.fullName,
              userId: customerId,
              orderCount: req.orderCount, // 고칠것 수량
              paymentId: response.paymentId,
              price: req.price,
              orderName: req.orderName,
              address: req.address,
              phoneNumber: req.phoneNumber
            })
          });
          return res;
        } catch (error) {
          console.error(error);
          alert("post 오류");
        }
      }
    },
    [data]
  );

  return makePayment;
};

export default usePayment;
