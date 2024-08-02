import usePayment from "@/hooks/usePayment";
import { useUserData } from "@/hooks/useUserData";
import { useAddrStore } from "@/zustand/addrStore";
import PortOne from "@portone/browser-sdk/v2";
import { useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";

export default function Payment() {
  const paymentFunc = usePayment();
  const router = useRouter();
  const { productList } = useAddrStore();
  const [fullName, setFullName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [request, setRequest] = useState<string>("");
  const price = productList?.reduce((acc: any, cur: any) => {
    return acc + cur.amount * cur.quantity;
  }, 0);

  const handleSubmit = async () => {
    try {
      if (productList) {
        const response = await paymentFunc({
          fullName: fullName,
          orderCount: 2,
          orderName: "sample test", // 주문상품 이름
          price: price, // 상품 전체 가격
          address: address,
          phoneNumber: phoneNumber,
          productList: productList,
          request: request
        });

        if (response?.paymentId) {
          // alert("결제가 성공적으로 완료되었습니다.");
          router.push(`/payment/loading?paymentId=${response.paymentId}`);
        } else {
          alert("결제 중 오류가 발생했습니다.");
        }
      }
    } catch (error) {
      console.error(error);
      alert("결제 요청 중 오류가 발생했습니다.");
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
            value={request}
            onChange={(e) => setRequest(e.target.value)}
          />
          <button className="w-full h-[52px] rounded-md bg-[#1A82FF] text-white mt-[20px]" onClick={handleSubmit}>
            구매하기
          </button>
        </div>
      </div>
    </>
  );
}
