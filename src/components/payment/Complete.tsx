"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { createClient } from "../../../supabase/client";
import { Tables } from "../../../types/supabase";

interface Product {
  imgUrl: string;
  name: string;
  amount: number;
  quantity: number;
}

type orderType = Tables<"order"> | null;

export default function Complete() {
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<orderType>(null);
  const supabase = createClient();
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("paymentId");

  useEffect(() => {
    const getProducts = async () => {
      if (paymentId) {
        const { data } = await supabase.from("order").select("*").eq("paymentId", paymentId).single();

        setProducts(data as orderType);
      }
    };

    getProducts();
  }, []);

  return (
    <div>
      <div className="bg-white  rounded-lg shadow-lg">
        <div className="p-8 text-center">
          <h2 className=" text-[20px] mb-[12px]">주문이 완료되었습니다</h2>
          <p className="text-gray-400 text-[16px]">
            <span>주문번호 </span>
            <span>{paymentId}</span>
          </p>
        </div>
        <div className="border-[#F4F4F4] border-[8px] w-full mt-3" />
        <div className="p-2 m-4">
          <p className="mb-4 text-[18px]">배송정보</p>
          <div className="flex flex-col items-start gap-[16px]">
            <p className="flex items-center gap-[93px] self-stretch  text-4 mb-2">
              <span className="text-[#4C4F52]">주문자</span>
              <span>{products?.name}</span>
            </p>
            <p className="flex items-center gap-[107px] self-stretch  text-4 mb-2">
              <span className="text-[#4C4F52]">주소</span>
              <span>{products?.address}</span>
            </p>
            <p className="flex items-center gap-[48px] self-stretch  text-4 mb-2">
              <span className="text-[#4C4F52]">배송 요청 사항</span>
              <span>요청사항</span>
            </p>
          </div>
        </div>
        <div className="border-[#F4F4F4] border-[8px] w-full mt-3" />
        <div className="m-4">
          <p className="m-3 text-lg">주문상품</p>
          <div className="flex flex-col divide-y">
            {products?.product_list &&
              products?.product_list.map((product, index) => (
                <div key={index} className="bg-white rounded-md p-2 flex ">
                  <div className="flex justify-center ">
                    <div className="relative w-[72px] h-[72px] md:w-[220px] md:h-[230px] cursor-pointer mb-2">
                      <Image
                        src={product.imgUrl}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                  </div>
                  <div className="ml-2">
                    <div className="flex flex-col">
                      <p className="text-sm text-[#4C4F52]">{product.name}</p>
                      <p className="text-md font-semibold">{product.amount} 원</p>
                      <p className="text-sm text-[#989C9F]">{String(product.quantity).padStart(2, "0")} 개</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="border-[#F4F4F4] border mx-3 " />
        <div className="m-4 p-3">
          <p className=" text-lg mb-2 flex justify-between">
            <span>최종 결제 금액</span>
            <span>{products?.price.toLocaleString()} 원</span>
          </p>
        </div>
      </div>
    </div>
  );
}
