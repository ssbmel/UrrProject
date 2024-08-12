"use client";

import Link from "next/link";

const OrderedProduct = ({ id, paymentId }: { id : string, paymentId : string}) => {
  const active = "text-[#0068E5]";

  return (
    <div className="w-full h-[194px] rounded-[4px] bg-blue-100 p-[16px] text-[12px] flex flex-col gap-[18px]">
      <div>
        <div className="flex justify-between pt-[6px] pb-[6px]">
          <div className="flex gap-[12px]">
            <span className="text-[#4C4F52]">운송장 번호</span>
            <span className="font-bold">0000000000</span>
          </div>
          <Link href={`/mypage/review/${paymentId}/${id}`}>
            <span className="text-gray-400">후기 쓰기 &gt;</span>
          </Link>
        </div>
        <div className="text-[14px] text-gray-400 border border-[#596473] bg-[#fffffe] rounded-[4px] p-[6px] w-full flex justify-center items-center gap-[4px]">
          <span className={active}>상품 발송</span>
          <span>&gt;</span>
          <span>택배사 도착</span>
          <span>&gt;</span>
          <span>배송중</span>
          <span>&gt;</span>
          <span>배송완료</span>
        </div>
      </div>
      <ul className="text-[14px] flex flex-col gap-[8px]">
        <li className="flex gap-[16px] text-left">
          <span className="text-[#4C4F52] block w-[75px]">배송 예정일</span>
          <span className="font-bold">0000.00.00</span>
        </li>
        <li className="flex gap-[16px] text-left">
          <span className="text-[#4C4F52] block w-[75px]">도착 예정일</span>
          <span className="font-bold">0000.00.00</span>
        </li>
        <li className="flex gap-[16px] text-left">
          <span className="text-[#4C4F52] block w-[75px]">택배사</span>
          <span className="font-bold">cj 대한통운</span>
        </li>
      </ul>
    </div>
  );
};

export default OrderedProduct;
