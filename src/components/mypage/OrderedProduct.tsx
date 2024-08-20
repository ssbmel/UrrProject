"use client";

import Link from "next/link";
import RightArrowB from "../../../public/icon/rightArrowB.svg";

const OrderedProduct = ({ id, paymentId, delivery }: { id: string; paymentId: string; delivery: string }) => {
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
    <div className="xl:relative w-full xl:h-[325px] rounded-[4px] xl:rounded-[12px] bg-primarylightness p-[16px] text-[12px] flex flex-col xl:items-center gap-[18px] xl:gap-[32px] border">
      <div className="xl:flex xl:flex-col xl:justify-between xl:items-center xl:gap-[28px] xl:py-[16px]">
        <div className="flex justify-between pt-[6px] pb-[6px] xl:w-[590px]">
          <h3 className="text-[20px] text-center w-full font-[700] hidden xl:block">배송 조회</h3>
          <div className="flex gap-[12px] xl:hidden">
            <span className="text-[#4C4F52]">운송장 번호</span>
            <span className="font-bold">0000000000</span>
          </div>
          <Link
            href={delivery === "배송완료" ? `/mypage/review/${paymentId}/${id}` : ""}
            className={
              delivery === "배송완료"
                ? "flex items-center gap-[4px] xl:absolute xl:top-0 xl:right-0 xl:h-full xl:bg-[#FFFFFE] xl:border-l xl:rounded-r-[12px] xl:w-[212px] xl:justify-center xl:flex-col-reverse xl:gap-[14px] xl:hover:bg-gray-50 xl:transition-colors"
                : "items-center gap-[4px] hidden"
            }
          >
            <span className={delivery === "배송완료" ? "text-[#0068E5] xl:text-[18px] font-[600]" : "text-[#4C4F52]"}>
              후기 작성하기
            </span>
            <div className="xl:w-[40px] xl:h-[40px] xl:rounded-full xl:bg-[#F0F4FA] xl:flex xl:justify-center xl:items-center">
              <span>
                <RightArrowB color={delivery === "배송완료" ? "#0068E5" : "#4C4F52"} />
              </span>
            </div>
          </Link>
        </div>
        <div className="xl:w-[1087px] w-full xl:bg-primarystrong bg-transparent xl:h-[27px] xl:flex  xl:justify-center xl:items-center">
          <div className="text-[14px] text-[#4C4F52] xl:w-[590px] xl:h-[55px] xl:text-[18px] border xl:border-x-0 border-primarystrong bg-[#fffffe] rounded-[4px] xl:rounded-none p-[6px] w-full flex justify-evenly items-center">
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
      <ul className="text-[14px] flex flex-col gap-[8px] xl:items-start xl:w-[590px] xl:text-[16px]">
        <li className="hidden gap-[16px] text-left xl:flex">
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

export default OrderedProduct;
