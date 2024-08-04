"use client";

import React, { useState } from "react";
import OrderedProduct from "./OrderedProduct";

const OrderedList = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <h3 className="text-[14px] border-b-2 pb-[8px]">00월 00일</h3>
      <ul>
        <li className="pt-[18px] pb-[18px] text-[14px] border-b flex flex-col gap-[18px]">
          <div className="flex justify-between items-center">
            <img src="" alt="이미지" className="w-[48px] h-[48px] bg-slate-300 rounded-[4px]" />
            <div className="flex justify-evenly gap-[18px] flex-shrink-0">
              <p>상품 이름</p>
              <p>배송 상태</p>
              <p>
                <span>00,000</span>원
              </p>
            </div>
            <button onClick={() => setIsOpen(!isOpen)} className="p-[9px]">
              {isOpen ? "🔺" : "🔻"}
            </button>
          </div>
          {isOpen ? <OrderedProduct /> : null}
        </li>
      </ul>
    </div>
  );
};

export default OrderedList;
