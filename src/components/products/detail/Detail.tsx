"use client";

import { notFound } from "next/navigation";
import { createClient } from "../../../../supabase/client";
import Image from "next/image";
import getProductDetail from "@/services/products/detail/productDetail.service";
import { useEffect, useState } from "react";
import useGetProductDetail from "@/hooks/useGetProductDetail";
import ReviewList from "./ReviewList";

interface detailProps {
  params: { id: string };
}

type CompoStateType = "상품정보" | "상품후기" | "상품문의";

export default function Detail({ params }: detailProps) {
  const { data } = useGetProductDetail({ id: params.id });
  const [compoState, setCompoState] = useState<CompoStateType>("상품정보");

  const cost = parseFloat(data?.cost);
  const price = parseFloat(data?.price);
  const discountPercentage = ((cost - price) / cost) * 100;
  const discountPercentageInteger = Math.floor(discountPercentage);
  const getClassNames = (state: any) => {
    return `w-[113px] p-4 flex justify-center items-center border-b-4 ${
      compoState === state ? "border-blue-500 text-blue-500" : "border-gray-200"
    }`;
  };

  return (
    <>
      <div className="flex flex-col h-svh mb-[250px]">
        <div className="flex justify-center w-full">
          <Image src={data?.main_img} alt={data?.title} width={500} height={375} />
        </div>
        <div className="my-[20px] mx-4">
          <p className="my-4 text-xl">{data?.title}</p>
          <p className="text-gray-300 line-through">{cost.toLocaleString()}</p>
          <p className="my-1">
            <span className="text-red-500">{discountPercentageInteger}%</span>
            <span className="text-lg font-semibold ml-2">{price.toLocaleString()} 원</span>
          </p>
          <p className="text-[#989C9F]">리뷰 05건</p>
        </div>
        <div className="border-[#F4F4F4] border-[6px] w-full mt-3" />
        <div className="m-4 mx-auto w-[343px] flex flex-col items-center">
          <div className="flex flex-col gap-[14px]">
            <p className="flex">
              <span className="w-[105px]">진행기간</span>
              <span>
                {data?.start} ~ {data?.end}
              </span>
            </p>
            <p className="flex">
              <span className="w-[105px]">배송 예정일</span>
              <span>08.07 순차적으로 출고</span>
            </p>
            <p className="flex">
              <span className="w-[105px]">택배사</span>
              <span>cj 대한통운</span>
            </p>
            <p className="flex">
              <span className="w-[105px]">배송비</span>
              <span>3,000 원</span>
            </p>

            <div className="w-[343px] h-[124px] rounded-lg bg-[#E1EEFE] flex flex-col justify-center mt-12 p-4">
              <p className="my-2 text-lg font-semibold text-[#0051B2]">주문 전 확인해주세요!</p>
              <p className="text-md text-[#4C4F52]">{data?.text}</p>
            </div>
          </div>
        </div>
        <div className="border-[#F4F4F4] border-[6px] w-full mt-3" />
        <div className="flex flex-col w-[343px] mx-auto bg-slate-300">
          <div className="flex justify-center items-center">
            <div onClick={() => setCompoState("상품정보")} className={getClassNames("상품정보")}>
              상품 정보
            </div>
            <div onClick={() => setCompoState("상품후기")} className={getClassNames("상품후기")}>
              상품 후기
            </div>
            <div onClick={() => setCompoState("상품문의")} className={getClassNames("상품문의")}>
              상품 문의
            </div>
          </div>
          {compoState === "상품정보" && <div>상품 정보 컴포넌트</div>}
          {compoState === "상품후기" && (
            <div>
              <ReviewList id={params.id} />
            </div>
          )}
          {compoState === "상품문의" && <div>상품 문의 컴포넌트</div>}
        </div>
      </div>
    </>
  );
}
