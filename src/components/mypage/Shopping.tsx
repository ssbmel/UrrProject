import React from "react";
import MyOrderedList from "./MyOrderedList";
import { useUserData } from "@/hooks/useUserData";
import InfOngoingSalesList from "./InfOngoingSalesList";

const Shopping = () => {
  const { data: user } = useUserData();

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col gap-[20px] p-[20px]">
        <h2 className="text-[20px] font-bold">주문 내역</h2>
        <MyOrderedList />
      </div>
      {user?.role === "인플루언서" ? (
        <>
          <hr className="border-4" />
          <div className="flex flex-col gap-[20px] p-[20px]">
            <h2 className="text-[20px] font-bold">상품 등록 관리</h2>
            <InfOngoingSalesList />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Shopping;
