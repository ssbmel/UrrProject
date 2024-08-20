import React from "react";
import MyReviewList from "./MyReviewList";
import { useUserData } from "@/hooks/useUserData";
import InfSaleList from "./InfSaleList";
import Link from "next/link";
import LoadingUrr from "../common/loading/LoadingUrr";

const Activity = () => {
  const data = useUserData();

  const { data: user } = data;

  if (data.isPending) {
    return <LoadingUrr />;
  }

  return (
    <div className="flex flex-col gap-[20px]">
      <MyReviewList user={user} />
      {user?.role === "인플루언서" && user?.approve === true ? (
        <>
          <hr className="border-4 border-[#F4F4F4]" />
          <div className="flex flex-col gap-[20px] p-[20px] xl:gap-[37px]">
            <div className="xl:flex xl:gap-[28px] xl:items-center">
              <h2 className="text-[20px] font-bold">상품 등록 관리</h2>
              <Link
                href="/products/upload/new"
                className="border p-[7px] pr-[14px] pl-[14px] text-[14px] rounded-[4px] text-[#0068E5] hidden xl:block xl:hover:bg-primarylightness xl:transition-colors"
              >
                상품 등록하기
              </Link>
            </div>
            <InfSaleList user={user} />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Activity;
