"use client";

import { clearPaymentData, useAddrStore } from "@/zustand/addrStore";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import loading from "../../../public/icon/loadingFrame.png";
import dot from "../../../public/icon/loadingDot.png";
import useGetSinglePayment from "@/hooks/useGetSinglePayment";

const LoadingComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const paymentId = searchParams.get("paymentId");
  const message = searchParams.get("message") || "";
  const { paymentData, productList } = useAddrStore();
  const { data: portonePaymentData } = useGetSinglePayment({ paymentId });

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
          orderCount: req.orderCount,
          paymentId: paymentId,
          price: req.price,
          orderName: req.orderName,
          address: req.address,
          phoneNumber: req.phoneNumber,
          productList: productList,
          request: req.request
        })
      });
      clearPaymentData();

      return res;
    } catch (error) {
      console.error(error);
      swal("post 오류");
    }
  };

  useEffect(() => {
    if (portonePaymentData) {
      if (portonePaymentData.status === "FAILED") {
        router.push(`/payment/fail?message=${message ? message : "알 수 없는 이유로 실패하였습니다."}`);
      } else {
        if (paymentData) {
          paymentSupabase(paymentData);
          router.push(`/payment/complete?paymentId=${paymentId}`);
        }
      }
    }
  }, [paymentData, portonePaymentData]);

  return (
    <>
      <div className="flex justify-center items-center min-h-[calc(100vh-143px)] xl:min-h-[calc(100vh-358px)]">
        <div className="relative w-36 h-36 ">
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
