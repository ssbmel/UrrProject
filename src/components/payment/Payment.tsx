import { useUserData } from "@/hooks/useUserData";
import PortOne from "@portone/browser-sdk/v2";
import { useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";
import { uuid } from "uuidv4";

export default function Payment() {
  const { data } = useUserData();
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const searchParams = useSearchParams();
  const pathName = searchParams.get("path_name");

  const handlePayment = async () => {
    const paymentId = `payment-${Math.random()}`;
    const email = data.email;
    const customerId = data.id;
    const code = searchParams.get("code");
    const customerFullName = data.nickname;

    if (code === "FAILURE_TYPE_PG") {
      alert("결제 취소되었습니다.");
      router.push("/payment");
      return;
    }
    const response = await PortOne.requestPayment({
      // Store ID 설정
      storeId: "store-094c2470-d0a2-4f20-b350-87b98f1e345c",
      // 채널 키 설정
      channelKey: "channel-key-bcf487fd-75d7-4863-977c-cf468a354a86",
      paymentId,
      customer: {
        customerId,
        fullName: customerFullName,
        email,
        phoneNumber
      },
      orderName: "나이키 와플 트레이너 2 SD",
      totalAmount: 100,
      currency: "CURRENCY_KRW",
      payMethod: "CARD",
      redirectUrl: "http://localhost:3000/payment/complete"
    });

    if (response && response.paymentId) {
      try {
        await fetch("/api/payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: uuid,
            name: fullName,
            user_id: customerId,
            price: 1000,
            title: "나이키 와플 트레이너 2 SD",
            address,
            phonenum: phoneNumber
          })
        });
      } catch (error) {
        console.error(error);
        alert("post 오류");
      }
    }
  };
  return (
    <>
      <div className="bg-gray-100 flex justify-center">
        <div className="w-full flex flex-col items-start gap-[20px] bg-white p-[16px] shadow-md">
          <p className="text-[20px] mb-[4px]">주문자 정보</p>
          <p>
            <span>주문자</span>
            <span className="text-red-600">*</span>
          </p>
          <input
            className="border border-gray-200 rounded-md w-full h-[48px] p-[8px]"
            type="text"
            placeholder="이름"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <p>
            <span>휴대폰</span>
            <span className="text-red-600">*</span>
          </p>
          <input
            className="border border-gray-200 rounded-md w-full h-[48px] p-[8px]"
            type="text"
            placeholder="휴대폰 번호"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <p>
            <span>주소</span>
            <span className="text-red-600">*</span>
            <button className="w-12 ml-4 border border-blue-400 rounded-md">검색</button>
          </p>
          <input className="border border-gray-200 rounded-md w-full h-[48px] p-[8px]" type="text" />
          <input
            className="border border-gray-200 rounded-md w-full h-[48px] p-[8px]"
            type="text"
            placeholder="상세주소를 입력하세요"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <p>배송 요청사항</p>
          <input
            className="border border-gray-200 rounded-md w-full h-[48px] p-[8px]"
            type="text"
            placeholder="부재시, 경비실에 놔주세요"
          />
          <button className="w-full h-[52px] rounded-md bg-[#1A82FF] text-white mt-[20px]" onClick={handlePayment}>
            구매하기
          </button>
        </div>
      </div>
    </>
  );
}
