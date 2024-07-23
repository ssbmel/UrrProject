"use client";

import React, { useRef, useState } from 'react';

function PricePeriod({startDateRef, endDateRef, costRef, priceRef, productCountRef}) {

  return (
    <details open className="border w-full px-5">
      <summary className="font-bold text-lg">기간 및 가격 설정</summary>
      <hr />
      <div className="space-x-5 my-5">
        <span>기간</span>
        <input type="date" ref={startDateRef} className="w-[120px] border"/>
        <span>-</span>
        <input type="date" ref={endDateRef} className="w-[120px] border"/>
      </div>
      <div className="space-x-5 mb-5">
        <span>가격</span>
        <input type="number" className="w-[120px] border" placeholder="정가" ref={costRef}/>
        <span>-</span>
        <input type="number" className="w-[120px] border" placeholder="판매가" ref={priceRef}/>
      </div>
      <div className="space-x-5 mb-5">
        <span>수량</span>
        <input type="number" className="w-[120px] border" ref={productCountRef}/>
      </div>
    </details>
  );
}

export default PricePeriod;
