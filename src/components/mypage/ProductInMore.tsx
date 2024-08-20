"use client";

import Link from "next/link";
import RightArrowB from "../../../public/icon/rightArrowB.svg";

const ProductInMore = ({ id, paymentId, delivery }: { id: string; paymentId: string; delivery: string }) => {
  let active1 = "";
  let active2 = "";
  let active3 = "";
  let active4 = "";

  switch (delivery) {
    case "상품발송":
      active1 = "text-[#0068E5] font-[500]";
      active2 = "";
      active3 = "";
      active4 = "";
      break;
    case "택배사도착":
      active1 = "";
      active2 = "text-[#0068E5] font-[500]";
      active3 = "";
      active4 = "";
      break;
    case "배송중":
      active1 = "";
      active2 = "";
      active3 = "text-[#0068E5] font-[500]";
      active4 = "";
      break;
    case "배송완료":
      active1 = "";
      active2 = "";
      active3 = "";
      active4 = "text-[#0068E5] font-[500]";
      break;
  }

  return (
    <div className="relative w-full rounded-[4px] bg-primarylightness p-[16px] text-[12px] flex flex-col gap-[18px] border">
      <div>
        <div className="flex justify-between pt-[6px] pb-[6px] ">
          <h3 className="text-[20px] text-center w-full font-[700] hidden">배송 조회</h3>
          <div className="flex gap-[12px]">
            <span className="text-[#4C4F52]">운송장 번호</span>
            <span className="font-bold">0000000000</span>
          </div>
          <Link
            href={delivery === "배송완료" ? `/mypage/review/${paymentId}/${id}` : ""}
            className={delivery === "배송완료" ? "flex items-center gap-[4px]" : "hidden"}
          >
            <span className={delivery === "배송완료" ? "text-[#0068E5] font-[600]" : "text-[#4C4F52]"}>
              후기 작성하기
            </span>
            <div>
              <span>
                <RightArrowB color={delivery === "배송완료" ? "#0068E5" : "#4C4F52"} />
              </span>
            </div>
          </Link>
        </div>
        <div className="w-full bg-transparent">
          <div className="text-[14px] text-[#4C4F52] border border-primarystrong bg-[#fffffe] rounded-[4px] p-[6px] w-full flex justify-evenly items-center">
            <span className={active1}>상품 발송</span>
            <RightArrowB color="#4C4F52" />
            <span className={active2}>택배사 도착</span>
            <RightArrowB color="#4C4F52" />
            <span className={active3}>배송중</span>
            <RightArrowB color="#4C4F52" />
            <span className={active4}>배송완료</span>
          </div>
        </div>
      </div>
      <ul className="text-[14px] flex flex-col gap-[8px]">
        <li className="hidden gap-[16px] text-left">
          <span className="text-[#4C4F52] block w-[75px]">운송장 번호</span>
          <span className="font-bold">0000000000</span>
        </li>
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

export default ProductInMore;
