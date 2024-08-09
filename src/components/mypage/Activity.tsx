import React from "react";
import MyReviewList from "./MyReviewList";
import { useUserData } from "@/hooks/useUserData";
import InfSaleList from "./InfSaleList";

const Activity = () => {
  const { data: user } = useUserData();

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col gap-[20px] p-[20px]">
        <h2 className="text-[20px] font-bold">리뷰 관리</h2>
        <MyReviewList />
      </div>
      {user?.role === "인플루언서" && user?.approve === true ? (
        <>
          <hr className="border-4" />
          <div className="flex flex-col gap-[20px] p-[20px]">
            <h2 className="text-[20px] font-bold">상품 등록 관리</h2>
            <InfSaleList />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Activity;
