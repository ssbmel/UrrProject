"use client";

import { RefObject } from "react";

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
    <details open className="w-full px-5 contents-box">
      <summary className="font-bold text-lg">기간 및 가격 설정</summary>
      <hr />
      <div className="space-x-4 my-5">
        <span>기간</span>
        <input type="date" min={today.toISOString().substring(0, 10)} ref={startDateRef} className="w-[120px] border" />
        <span>-</span>
        <input type="date" min={today.toISOString().substring(0, 10)} ref={endDateRef} className="w-[120px] border" />
      </div>
      <div className="space-x-4 mb-5">
        <span>가격</span>
        <input
          type="number"
          className="w-[120px] border"
          placeholder="정가"
          ref={costRef}
          onKeyDown={preventInvalidInput}
          onInput={enforcePositiveValue}
        />
        <span>-</span>
        <input
          type="number"
          min={0}
          className="w-[120px] border"
          placeholder="판매가"
          ref={priceRef}
          onKeyDown={preventInvalidInput}
          onInput={enforcePositiveValue}
        />
      </div>
      <div className="space-x-4 mb-5">
        <span>수량</span>
        <input
          type="number"
          min={0}
          className="w-[120px] border"
          ref={productCountRef}
          onKeyDown={preventInvalidInput}
          onInput={enforcePositiveValue}
        />
      </div>
    </details>
  );
};

export default PricePeriod;
