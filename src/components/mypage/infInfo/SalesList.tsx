import React from "react";

const SalesList = () => {
  return (
    <div className="flex flex-col gap-[20px] pl-[16px] pr-[16px] pt-[32px] pb-[32px]">
      <div>
        <h2 className="text-[20px] font-bold">{"진행중인 공구" ? "진행중인 공구" : "진행했던 공구"}</h2>
      </div>
      <ul>
        <li className="flex flex-col gap-[8px] w-[88px]">
          <div className="w-[88px] h-[96px] bg-slate-300">
            <img src="" alt="상품 이미지" />
          </div>
          <div>
            <p className="text-[12px] text-gray-400">inf 이름</p>
            <h3 className="text-[16px] overflow-x-hidden whitespace-nowrap text-ellipsis">ddddd상품 이름</h3>
            <p className="text-[12px] flex gap-[4px]">
              <span>00%</span>
              <span>00,000원</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SalesList;
