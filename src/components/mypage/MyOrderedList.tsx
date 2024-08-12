"use client";

import React, { useEffect, useState } from "react";
import OrderedProduct from "./OrderedProduct";
import Error from "../common/error/Error";
import { useUserData } from "@/hooks/useUserData";
import { createClient } from "../../../supabase/client";
import { Tables } from "../../../types/supabase";
import MyOrderCompo from "./MyOrderCompo";

export type orderType = Tables<"order"> | null;
export type productListType = {
  id: string;
  name: string;
  imgUrl: string;
  amount: number;
  quantity: number;
};

const MyOrderedList = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [items, setItems] = useState<orderType[] | null>(null); /* 사용자가 주문한 상품 목록 */
  const supabase = createClient();
  const { data: user } = useUserData();

  useEffect(() => {
    const getOrderList = async () => {
      try {
        if (user && user.id) {
          const { data, error } = await supabase.from("order").select("*").eq("userId", user.id);
          if (error) {
            throw error;
          }

          setItems(data);
        }
      } catch (error) {
        console.error("Error fetching order list:", error);
      }
    };

    getOrderList();
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
                      return <MyOrderCompo key={test?.id} item={item as productListType} delivery={payment.delivery} paymentId = {payment.paymentId}/>;
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
