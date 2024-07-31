"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function Complete() {
  const products = [
    {
      influencer: "임현아",
      name: "기초 탄탄 세트",
      discount: "20%",
      price: "50,000",
      image: "/images/화장품.jpg"
    },
    {
      influencer: "박수미",
      name: "데이식스가 착용한 비니",
      discount: "10%",
      price: "34,000",
      image: "/images/비니.jpg"
    }
  ];

  const totalAmount = products.reduce((sum, product) => sum + parseInt(product.price.replace(/,/g, "")), 0);
  return (
    <div>
      <div className="bg-white  rounded-lg shadow-lg">
        <div className="p-8 text-center">
          <h2 className=" text-[20px] mb-[12px]">주문이 완료되었습니다</h2>
          <p className="text-gray-400 text-[16px]">
            <span>주문번호</span>
          </p>
        </div>
        <div className="border-[#F4F4F4] border-[8px] w-full mt-3" />
        <div className="p-2 m-4">
          <p className="mb-4 text-[18px]">배송정보</p>
          <div className="flex flex-col items-start gap-[16px]">
            <p className="flex items-center gap-[93px] self-stretch  text-4 mb-2">
              <span className="text-[#4C4F52]">주문자</span>
              <span></span>
            </p>
            <p className="flex items-center gap-[107px] self-stretch  text-4 mb-2">
              <span className="text-[#4C4F52]">주소</span>
              <span>주소</span>
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
            {products.map((product, index) => (
              <div key={index} className="bg-white rounded-md p-2 flex ">
                <div className="flex justify-center ">
                  <div className="relative w-[72px] h-[72px] md:w-[220px] md:h-[230px] cursor-pointer mb-2">
                    <Image
                      src={product.image}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                </div>
                <div className="ml-2">
                  <h2 className="text-sm text-gray-400">[{product.influencer}]의</h2>
                  <p className="text-sm text-gray-600">{product.name}</p>
                  <div className="flex items-center">
                    <p className="text-md font-bold ml-1">{product.price} 원</p>
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
            <span>{totalAmount.toLocaleString()} 원</span>
          </p>
        </div>
      </div>
    </div>
  );
}
