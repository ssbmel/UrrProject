import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Fail() {
  const router = useRouter();
  const [queryParams, setQueryParams] = useState({ code: "", message: "" });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code") || "";
    const message = searchParams.get("message") || "";
    setQueryParams({ code, message });
  }, []);

  const { code, message } = queryParams;

  if (!code || !message) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-100">로딩 중...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-red-500 text-2xl font-bold mb-4">결제 실패</h2>
        <p className="text-gray-800 text-lg mb-2">
          <span className="font-semibold">에러 코드:</span> {code}
        </p>
        <p className="text-gray-800 text-lg">
          <span className="font-semibold">실패 사유:</span> {message}
        </p>
      </div>
    </div>
  );
}
