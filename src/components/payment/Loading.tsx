"use client";

import useGetPayment from "@/hooks/useGetPayment";
import { clearPaymentData, useAddrStore } from "@/zustand/addrStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const LoadingComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const paymentId = searchParams.get("paymentId");
  const { paymentData } = useAddrStore();

  const paymentSupabase = async (req: any) => {
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: req.fullName,
          userId: req.userId,
          orderCount: req.orderCount, // 고칠것 수량
          paymentId: paymentId,
          price: req.price,
          orderName: req.orderName,
          address: req.address,
          phoneNumber: req.phoneNumber
        })
      });

      clearPaymentData();

      return res;
    } catch (error) {
      console.error(error);
      alert("post 오류");
    }
  };

  useEffect(() => {
    if (code === "FAILURE_TYPE_PG") {
      alert("결제 취소되었습니다.");
      router.push("/payment");
      return;
    } else if (!code) {
      console.log(paymentData);
      // 성공 케이스
      if (paymentData) {
        paymentSupabase(paymentData);
        router.push(`/payment/complete?paymentId=${paymentId}`);
      }
    } else if (code === "PORTONE_ERROR") {
      router.push("/payment/fail");
    }
  }, [paymentData]);

  return <div>This is Loading Component</div>;
};

export default LoadingComponent;
