import React from "react";
import MyOrderedList from "./MyOrderedList";
import { useUserData } from "@/hooks/useUserData";

const Shopping = () => {
  const { data: user } = useUserData();

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col gap-[20px] p-[20px]">
        <h2 className="text-[20px] font-bold">주문 내역</h2>
        <MyOrderedList />
      </div>
    </div>
  );
};

export default Shopping;
