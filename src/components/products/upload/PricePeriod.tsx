"use client";

import { RefObject } from "react";
import ArrowRight from "../../../../public/icon/arrowR.svg"

interface PricePeriodProps {
  startDateRef: RefObject<HTMLInputElement>;
  endDateRef: RefObject<HTMLInputElement>;
  costRef: RefObject<HTMLInputElement>;
  priceRef: RefObject<HTMLInputElement>;
  productCountRef: RefObject<HTMLInputElement>;
}

const PricePeriod: React.FC<PricePeriodProps> = ({ startDateRef, endDateRef, costRef, priceRef, productCountRef }) => {
  const today = new Date();

  const preventInvalidInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["-", "+", "e", "E", "."].includes(e.key)) {
      e.preventDefault();
    }
  };

  const enforcePositiveValue = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    if (input.value && parseFloat(input.value) < 0) {
      input.value = Math.abs(parseFloat(input.value)).toString();
    }
  };

  return (
    <details open className="w-full px-4 contents-box">
      <summary className="font-bold text-xl">기간 및 가격 설정</summary>
      <hr />
      <div className="my-5 mx-auto flex gap-2 items-center">
        <span className="whitespace-nowrap w-[70px]">진행 기간</span>
        <input type="date" min={today.toISOString().substring(0, 10)} ref={startDateRef} className="w-[110px] border" />
        <span className="mx-1">~</span>
        <input type="date" min={today.toISOString().substring(0, 10)} ref={endDateRef} className="w-[110px] border" />
      </div>
      <div className="my-5 mx-auto flex gap-2 items-center">
        <span className="whitespace-nowrap w-[70px]">가격</span>
        <input
          type="number"
          className="w-[110px] border"
          placeholder="원가"
          ref={costRef}
          onKeyDown={preventInvalidInput}
          onInput={enforcePositiveValue}
        />
        <ArrowRight/>
        <input
          type="number"
          min={0}
          className="w-[110px] border"
          placeholder="판매가"
          ref={priceRef}
          onKeyDown={preventInvalidInput}
          onInput={enforcePositiveValue}
        />
      </div>
      <div className="my-5 mx-auto flex gap-2 items-center">
        <span className="whitespace-nowrap w-[70px]">수량</span>
        <input
          type="number"
          min={0}
          className="w-[110px] border"
          ref={productCountRef}
          onKeyDown={preventInvalidInput}
          onInput={enforcePositiveValue}
        />
      </div>
    </details>
  );
};

export default PricePeriod;
