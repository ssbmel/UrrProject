"use client";

import useGetPayment from "@/hooks/useGetPayment";
import { clearPaymentData, useAddrStore } from "@/zustand/addrStore";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import loading from "../../../public/icon/loadingFrame.png";
import dot from "../../../public/icon/loadingDot.png";

const LoadingComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const paymentId = searchParams.get("paymentId");
  const { paymentData, productList } = useAddrStore();

  const paymentSupabase = async (req: any) => {
    console.log(productList);
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
          phoneNumber: req.phoneNumber,
          productList: productList,
          request: req.request
        })
      });
      console.log(res);
      clearPaymentData();

      return res;
    } catch (error) {
      console.error(error);
      alert("post 오류");
    }
  };

  useEffect(() => {
    if (code === "FAILURE_TYPE_PG") {
      alert("결제가 취소되었습니다.");
      router.push("/payment");
    } else if (!code) {
      // 성공 케이스
      if (paymentData) {
        paymentSupabase(paymentData);
        router.push(`/payment/complete?paymentId=${paymentId}`);
      }
    } else if (code === "PORTONE_ERROR") {
      router.push("/payment/fail");
    }
  }, [paymentData]);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="relative w-36 h-36 mb-[80px]">
          <Image src={loading} alt="로딩" fill sizes="144px" className="object-contain mt-2" />
          <div className="absolute inset-0 flex items-center p-2 m-5">
            <div className="relative w-3 h-3 flex space-x-3">
              <Image src={dot} alt="dot 1" width={12} height={12} className="dot-animation dot-1 " />
              <Image src={dot} alt="dot 2" width={12} height={12} className="dot-animation dot-2" />
              <Image src={dot} alt="dot 3" width={12} height={12} className="dot-animation dot-3" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingComponent;
