"use client";

import React, { useEffect, useState } from "react";
import Error from "../common/error/Error";
import { useUserData } from "@/hooks/useUserData";
import { Tables } from "../../../types/supabase";
import MyOrderCompo from "./MyOrderCompo";
import { getOrderList } from "@/services/order/order.service";

export type orderType = Tables<"order"> | null;
export type productListType = {
  id: string;
  name: string;
  imgUrl: string;
  amount: number;
  quantity: number;
};

const MyOrderedList = () => {
  const [items, setItems] = useState<orderType[] | null>(null);
  const { data: user } = useUserData();

  useEffect(() => {
    const fetchOrderList = async () => {
      const data = await getOrderList(user.id);
      setItems(data);
    };

    if (user?.id) {
      fetchOrderList();
    }
  }, [user]);

  return (
    <div>
      {items && items.length > 0 ? (
        <div>
          <div>
            {items.map((payment, index) => {
              return (
                <div key={index} className="mb-[18px] last:mb-0">
                  <h3 className="text-[14px] border-b-2 pb-[8px] xl:border-0 xl:mb-[21px] xl:p-0">{`${
                    payment?.created_at.split("-")[1]
                  }월 ${payment?.created_at.split("-")[2].slice(0, 2)}일 `}</h3>
                  <div className="w-full bg-[#EAECEC] h-[4px] rounded-full xl:block hidden"></div>
                  <ul className="hidden xl:flex py-[21px] text-[18px] font-[500] justify-between">
                    <li className="w-[220px] text-center">상품 이미지 / 상품명</li>
                    <li className="w-[142px] text-center">구매 수량</li>
                    <li className="w-[142px] text-center">배송 상태</li>
                    <li className="w-[142px] text-center">구매 가격</li>
                    <li className="w-[142px] text-center">배송 상세보기</li>
                  </ul>
                  <div className="w-full bg-[#EAECEC] h-[4px] rounded-full xl:block hidden"></div>
                  {payment?.product_list?.map((item) => {
                    const test = item as productListType;
                    return (
                      <MyOrderCompo
                        key={test?.id}
                        item={item as productListType}
                        delivery={payment?.delivery!}
                        paymentId={payment?.paymentId}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <Error>
          <span>주문 내역이 없습니다.</span>
        </Error>
      )}
    </div>
  );
};

export default MyOrderedList;
