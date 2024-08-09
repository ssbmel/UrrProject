"use client";

import React, { useState } from "react";
import Error from "../common/error/Error";

const MyReviewList = () => {
  const [items, setItems] = useState<string[] | null>(null); /* 사용자가 주문한 상품 목록 */

  const handleDelete = async () => {};

  return (
    <>
      {items ? (
        <div>
          <h3 className="text-[14px] border-b-2 pb-[8px]">00월 00일</h3>
          <ul>
            {items
              ? items.map((item, index) => (
                  <li key={index} className="pt-[18px] pb-[18px] text-[14px] border-b flex flex-col gap-[18px]">
                    <div className="flex justify-between items-center">
                      <img src="" alt="이미지" className="w-[48px] h-[48px] bg-slate-300 rounded-[4px]" />
                      <div className="flex justify-evenly gap-[18px] flex-shrink-0">
                        <p>상품 이름</p>
                        <p>배송 상태</p>
                        <p>
                          <span>00,000</span>원
                        </p>
                      </div>
                      <button onClick={handleDelete} className="p-[9px]">
                        🗑️
                      </button>
                    </div>
                  </li>
                ))
              : null}
          </ul>
        </div>
      ) : (
        <Error>
          <span>리뷰 작성 내역이 없습니다.</span>
        </Error>
      )}
    </>
  );
};

export default MyReviewList;
