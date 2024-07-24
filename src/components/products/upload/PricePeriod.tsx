"use client";

import { RefObject } from 'react';

interface PricePeriodProps {
  startDateRef: RefObject<HTMLInputElement>;
  endDateRef: RefObject<HTMLInputElement>;
  costRef: RefObject<HTMLInputElement>;
  priceRef: RefObject<HTMLInputElement>;
  productCountRef: RefObject<HTMLInputElement>;
}

const PricePeriod: React.FC<PricePeriodProps> = ({ startDateRef, endDateRef, costRef, priceRef, productCountRef }) => {
  return (
    <details open className="border w-full px-5">
      <summary className="font-bold text-lg">기간 및 가격 설정</summary>
      <hr />
      <div className="space-x-4 my-5">
        <span>기간</span>
        <input type="date" ref={startDateRef} className="w-[120px] border" />
        <span>-</span>
        <input type="date" ref={endDateRef} className="w-[120px] border" />
      </div>
      <div className="space-x-4 mb-5">
        <span>가격</span>
        <input type="number" className="w-[120px] border" placeholder="정가" ref={costRef} />
        <span>-</span>
        <input type="number" className="w-[120px] border" placeholder="판매가" ref={priceRef} />
      </div>
      <div className="space-x-4 mb-5">
        <span>수량</span>
        <input type="number" className="w-[120px] border" ref={productCountRef} />
      </div>
    </details>
  );
};

export default PricePeriod;
