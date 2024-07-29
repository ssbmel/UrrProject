import { useRouter } from "next/navigation";
import { useEffect, useCallback, useState } from "react";

export default function SuccessPage() {
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
        // 결제 실패 비즈니스 로직을 구현하세요.
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-green-500 text-2xl font-bold mb-4">결제 성공</h2>
        <p className="text-gray-800 text-lg mb-2">
          <span className="font-semibold">주문번호:</span> {orderId}
        </p>
        <p className="text-gray-800 text-lg mb-2">
          <span className="font-semibold">결제 금액:</span> {Number(amount).toLocaleString()}원
        </p>
        <p className="text-gray-800 text-lg">
          <span className="font-semibold">paymentKey:</span> {paymentKey}
        </p>
      </div>
    </div>
  );
}
