"use client";

import Link from "next/link";
import React, { useState } from "react";
import Error from "../common/error/Error";

const InfOngoingSalesList = () => {
  const [items, setItems] = useState<string[] | null>(null);

  return (
    <>
      {items ? (
        <div>
          <h3 className="text-[14px] border-b-2 pb-[8px]">00월 00일</h3>
          <ul>
            {items
              ? items.map((item) => (
                  <li className="pt-[18px] pb-[18px] text-[14px] border-b flex flex-col gap-[18px]">
                    <div className="flex justify-between items-center">
                      <img src="" alt="이미지" className="w-[48px] h-[48px] bg-slate-300 rounded-[4px]" />
                      <div className="flex justify-evenly gap-[18px]">
                        <p>상품 이름</p>
                        <p>
                          ~<span>00.00.00</span>
                        </p>
                        <p>
                          <span>00</span> / <span>00</span>
                        </p>
                        <p>
                          <span>00,000</span>원
                        </p>
                      </div>
                    </div>
                  </li>
                ))
              : null}
          </ul>
        </div>
      ) : (
        <Error>
          <div className="flex flex-col text-center justify-center items-center gap-[20px]">
            <div className="flex flex-col text-center justify-center items-center">
              <span>진행중인 공동구매가 없습니다.</span>
            </div>
            <Link
              href="/products/upload/new"
              className="border p-[7px] pr-[14px] pl-[14px] text-[14px] rounded-[4px] text-[#0068E5]"
            >
              상품 등록하러 가기
            </Link>
          </div>
        </Error>
      )}
    </>
  );
};

export default InfOngoingSalesList;
