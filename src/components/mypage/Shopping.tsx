import React from "react";
import MyOrderedList from "./MyOrderedList";

const Shopping = () => {
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col gap-[20px] p-[20px] xl:gap-[37px]">
        <div className="flex justify-between items-center">
          <h2 className="text-[20px] font-bold">주문 내역</h2>
          <span>더보기</span>
        </div>
        <MyOrderedList />
      </div>
    </div>
  );
};

export default Shopping;
