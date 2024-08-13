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
    <>
      {items && items.length > 0 ? (
        <div>
          <h3 className="text-[14px] border-b-2 pb-[8px]">00월 00일</h3>
          <ul>
            {items &&
              items.map((payment, index) => {
                return (
                  <div key={index}>
                    {payment?.product_list?.map((item) => {
                      const test = item as productListType;
                      return (
                        <MyOrderCompo
                          key={test?.id}
                          item={item as productListType}
                          delivery={payment.delivery!}
                          paymentId={payment.paymentId}
                        />
                      );
                    })}
                  </div>
                );
              })}
          </ul>
        </div>
      ) : (
        <Error>
          <span>주문 내역이 없습니다.</span>
        </Error>
      )}
    </>
  );
};

export default MyOrderedList;
