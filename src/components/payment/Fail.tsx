import Link from "next/link";
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

  // if (!code || !message) {
  //   return <div className="flex justify-center items-center min-h-screen bg-gray-100">로딩 중...</div>;
  // }

  return (
    <div className="flex justify-center items-center w-full h-screen ">
      <div className="bg-white p-8 rounded-lg text-center mb-[80px]">
        <h2 className="text-red-500 text-2xl font-bold mb-4">결제에 실패하셨습니다</h2>
        <p className="text-gray-800 text-lg mb-2">
          <span className="font-semibold">에러 코드:</span> {code}
        </p>
        <p className="text-gray-800 text-lg">
          <span className="font-semibold">실패 사유:</span> {message}
        </p>
        <Link href={"/products/list"}>
          <button className="w-44 h-8 mt-2 rounded-md text-white bg-[#1A82FF]">다시 구매하러 가기</button>
        </Link>
      </div>
    </div>
  );
}
