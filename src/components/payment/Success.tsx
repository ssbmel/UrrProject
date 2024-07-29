import { useRouter } from "next/navigation";
import { useEffect, useCallback, useState } from "react";

export default function Success() {
  const router = useRouter();
  const [queryParams, setQueryParams] = useState({ orderId: "", amount: "", paymentKey: "" });

  const confirm = useCallback(
    async (requestData: any) => {
      const response = await fetch("/api/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
      });

      const json = await response.json();

      if (!response.ok) {
        //     // 결제 실패 비즈니스 로직을 구현하세요.
        router.push(`/payment/fail?message=${json.message}&code=${json.code}`);
        return;
      }

      // 결제 성공 비즈니스 로직을 구현하세요.
    },
    [router]
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const orderId = searchParams.get("orderId") || "";
    const amount = searchParams.get("amount") || "";
    const paymentKey = searchParams.get("paymentKey") || "";
    setQueryParams({ orderId, amount, paymentKey });
  }, []);

  const { orderId, amount, paymentKey } = queryParams;

  useEffect(() => {
    if (orderId && amount && paymentKey) {
      const requestData = { orderId, amount, paymentKey };
      confirm(requestData);
    }
  }, [orderId, amount, paymentKey, confirm]);

  if (!orderId || !amount || !paymentKey) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-100">로딩 중...</div>;
  }

  return (
    <div>
      <div className="bg-white  rounded-lg shadow-lg">
        <div className="p-8 text-center">
          <h2 className=" text-[20px] mb-[12px]">주문이 완료되었습니다</h2>
          <p className="text-gray-400 text-[16px]">
            <span>주문번호</span> {orderId}
          </p>
        </div>
        <div className="border-[#F4F4F4] border-[8px] w-full mt-3" />
        <div className="p-2 m-4">
          <p className="mb-4 text-[18px]">배송정보</p>
          <div className="flex flex-col items-start gap-[16px]">
            <p className="flex items-center gap-[93px] self-stretch  text-4 mb-2">
              <span className="text-[#4C4F52]">주문자</span>
              <span></span>
            </p>
            <p className="flex items-center gap-[107px] self-stretch  text-4 mb-2">
              <span className="text-[#4C4F52]">주소</span>
              <span>주소</span>
            </p>
            <p className="flex items-center gap-[48px] self-stretch  text-4 mb-2">
              <span className="text-[#4C4F52]">배송 요청 사항</span>
              <span>요청사항</span>
            </p>
          </div>
        </div>
        <div className="border-[#F4F4F4] border-[8px] w-full mt-3" />
        <div className="m-4">
          <p>주문상품</p>
          <div className="divide-y m">
            <div>상품</div>
            <div>상품</div>
          </div>
        </div>
        <div className="border-[#F4F4F4] border mx-3 " />
        <div className="m-4">
          <p className=" text-lg mb-2 flex justify-between">
            <span>최종 결제 금액</span>
            <span>{Number(amount).toLocaleString()}원</span>
          </p>
        </div>
      </div>
    </div>
  );
}
