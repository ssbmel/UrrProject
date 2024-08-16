"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Error from "../common/error/Error";
import { PublicUser } from "../../../types/auth.type";
import { getProductDetailByUserId } from "@/services/products/detail/productDetail.service";
import { Product } from "../../../types/common";
import Image from "next/image";
import WriteIcon from "../../../public/icon/writeIcon.svg";
import TrashCanIcon from "../../../public/icon/trashcanIcon.svg";

interface Props {
  user: PublicUser;
}

const InfSaleList = ({ user }: Props) => {
  const [items, setItems] = useState<Product[]>([]);
  const onGoingStyle =
    "min-w-[58px] text-center bg-[#80BAFF] rounded-[50px] text-[12px] px-[8px] py-[2px] text-[#FFFFFE]";
  const endStyle = "min-w-[58px] text-center bg-[#CDCFD0] rounded-[50px] text-[12px] px-[8px] py-[2px] text-[#FFFFFE]";

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProductDetailByUserId(user.id);
      setItems(data);
    };
    if (user?.id) {
      fetchData();
    }
  }, []);

  return (
    <>
      {items?.length > 0 ? (
        <div>
          <ul>
            {items.map((item, index) => (
              <li key={index} className="pt-[18px] pb-[18px] text-[14px] border-b flex flex-col gap-[18px]">
                <div className="flex justify-between items-center">
                  <div className="flex gap-[12px] items-center w-[calc(100%-80px)]">
                    <div className="relative w-[56px] h-[56px]">
                      <Image
                        src={item.main_img || ""}
                        alt={item.title || "product_main_img"}
                        sizes="56px"
                        fill
                        priority
                        className="bg-slate-300 rounded-[6px] object-cover"
                      />
                    </div>
                    <div className="flex flex-col w-[calc(100%-68px)]">
                      <div className="flex items-center w-full gap-[4px]">
                        <span className="whitespace-nowrap text-ellipsis overflow-hidden font-[400]">
                          {item.title?.split("]")[1]}
                        </span>
                        <span className="min-w-[58px] text-center bg-[#80BAFF] rounded-[50px] text-[12px] px-[8px] py-[2px] text-[#FFFFFE]">
                          {new Date() > new Date(item.end) ? "종료" : "진행 중"}
                        </span>
                      </div>
                      <p className="text-[12px] text-[#B2B5B8]">
                        ~ {`${item.end.split("-")[0].slice(2)}.${item.end.split("-")[1]}.${item.end.split("-")[2]}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {new Date() > new Date(item.end) ? null : (
                      <button className="">
                        <WriteIcon />
                      </button>
                    )}
                    <button className="">
                      <TrashCanIcon />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Error>
          <div className="flex flex-col text-center justify-center items-center gap-[20px]">
            <div className="flex flex-col text-center justify-center items-center">
              <span>등록된 상품이 없습니다.</span>
            </div>
            <Link
              href="/products/upload/new"
              className="border p-[7px] pr-[14px] pl-[14px] text-[14px] rounded-[4px] text-[#0068E5]"
            >
              상품 등록하러 가기
            </Link>
          </div>
        </Error>
      )}
    </>
  );
};

export default InfSaleList;
