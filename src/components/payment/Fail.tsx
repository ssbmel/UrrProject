import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import fail from "../../../public/images/orderFail.png";

export default function Fail() {
  const router = useRouter();
  const [queryParams, setQueryParams] = useState({ code: "", message: "" });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code") || "";
    const message = searchParams.get("message") || "";
    setQueryParams({ code, message });
  }, []);

  const { message } = queryParams;

  // if (!code || !message) {
  //   return <div className="flex justify-center items-center min-h-screen bg-gray-100">로딩 중...</div>;
  // }

  return (
    <div className="flex justify-center items-center w-full h-screen ">
      <div className="flex flex-col justify-center items-center mb-[80px]">
        <div className="relative w-[96px] h-[142px]">
          <Image src={fail} alt="결제실패 이미지" fill sizes="96px" priority className=" object-cover" />
        </div>
        <div className="bg-white p-8 rounded-lg text-center mb-[80px] items-center">
          <h2 className="text-black text-[24px] font-bold m-2">주문을 완료하지 못했어요</h2>
          <p className="text-[18px] text-[#4C4F52]">이용에 불편을 드려 죄송합니다</p>

          <div className="w-[300px] h-[110px] border border-[#F2F2F2] text-gray-800  flex flex-col rounded-2xl m-[24px] px-[16px] py-[12px]">
            <p className=" text-sm mb-1">주문 실패 이유</p>
            <div className="h-[60px] flex flex-col justify-center">
              <p className="text-md font-medium justify-center">{message}</p>
            </div>
          </div>
          <p className="text-[#4C4F52]">확인 후 다시 주문해주세요</p>
        </div>
      </div>
    </div>
  );
}
