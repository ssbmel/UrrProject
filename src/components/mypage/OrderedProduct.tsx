"use client";

import Link from "next/link";
import RightArrowB from "../../../public/icon/rightArrowB.svg";

const OrderedProduct = ({ id, paymentId, delivery }: { id: string; paymentId: string; delivery: string }) => {
  let active1 = "";
  let active2 = "";
  let active3 = "";
  let active4 = "";

  switch (delivery) {
    case "상품 발송":
      active1 = "text-[#0068E5]";
      active2 = "";
      active3 = "";
      active4 = "";
      break;
    case "택배사 도착":
      active1 = "";
      active2 = "text-[#0068E5]";
      active3 = "";
      active4 = "";
      break;
    case "배송중":
      active1 = "";
      active2 = "";
      active3 = "text-[#0068E5]";
      active4 = "";
      break;
    case "배송완료":
      active1 = "";
      active2 = "";
      active3 = "";
      active4 = "text-[#0068E5]";
      break;
  }

  return (
    <div className="w-full h-[194px] rounded-[4px] bg-blue-100 p-[16px] text-[12px] flex flex-col gap-[18px]">
      <div>
        <div className="flex justify-between pt-[6px] pb-[6px]">
          <div className="flex gap-[12px]">
            <span className="text-[#4C4F52]">운송장 번호</span>
            <span className="font-bold">0000000000</span>
          </div>
          <Link
            href={delivery === "배송완료" ? `/mypage/review/${paymentId}/${id}` : ""}
            className="flex items-center gap-[4px]"
          >
            <span className={delivery === "배송완료" ? "text-[#0068E5]" : "text-[#CDCFD0]"}>후기 쓰기</span>
            <RightArrowB color={delivery === "배송완료" ? "#0068E5" : "#CDCFD0"} />
          </Link>
        </div>
        <div className="text-[14px] text-gray-400 border border-[#596473] bg-[#fffffe] rounded-[4px] p-[6px] w-full flex justify-evenly items-center">
          <span className={active1}>상품 발송</span>
          <RightArrowB color="#CDCFD0" />
          <span className={active2}>택배사 도착</span>
          <RightArrowB color="#CDCFD0" />
          <span className={active3}>배송중</span>
          <RightArrowB color="#CDCFD0" />
          <span className={active4}>배송완료</span>
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
          <span className="font-bold">XX택배</span>
        </li>
      </ul>
    </div>
  );
};

export default OrderedProduct;
