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
    <div className="flex flex-col justify-center items-center w-full h-screen ">
      <div className="relative w-[96px] h-[142px]">
        <Image src={fail} alt="결제실패 이미지" fill sizes="96px" className=" object-cover" />
      </div>
      <div className="bg-white p-8 rounded-lg text-center mb-[80px]">
        <h2 className="text-red-500 text-2xl font-bold m-2">주문을 완료하지 못했어요</h2>
        <p className="text-[18px] text-[#4C4F52]">이용에 불편을 드려 죄송합니다</p>

        <Link href={"/products/list"}>
          <div className="w-[250px] h-[74px] border border-[#F2F2F2] rounded-md">
            <p className="text-gray-800 text-lg">
              <span className="font-semibold text-sm">실패 사유</span>
              <span>{message}</span>
            </p>
          </div>
          <button className="w-44 h-8 mt-2 rounded-md text-white bg-[#1A82FF]">다시 구매하러 가기</button>
        </Link>
      </div>
    </div>
  );
}
