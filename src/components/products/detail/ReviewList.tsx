"use client";

import useGetProductReview from "@/hooks/useGetProductReview";
import Review from "./Review";
import Image from "next/image";
import emptyReview from "../../../../public/icon/emptyImg.png";

const ReviewList = ({ id }: { id: string }) => {
  const { data } = useGetProductReview({ id });

  return (
    <div className="divide-y flex flex-col items-center">
      {data && data.length > 0 ? (
        data.map((value: any, index: number) => {
          return (
            <div key={index} className="flex items-center">
              <div className="hidden xl:flex xl:w-[48px] xl:h-[48px] xl:mr-[40px] xl:text-[16px] xl:text-[#4C4F52] xl:bg-[#E1EEFE] xl:rounded-lg xl:justify-center xl:items-center">
                <p className="text-[#80BAFF]">{index + 1}</p>
              </div>
              <Review props={value} />
            </div>
          );
        })
      ) : (
        <div className="flex flex-col justify-center items-center p-[105px] gap-[12px]">
          <div className="relative w-[141px] h-[92px] xl:w-[200px] xl:h-[150px]">
            <Image src={emptyReview} alt="빈 리뷰" fill sizes="141px xl:200px" className="object-contain" />
          </div>
          <p className="py-2 text-[16px] xl:text-[20px] text-[#4C4F52]">아직 상품 후기가 없습니다</p>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
