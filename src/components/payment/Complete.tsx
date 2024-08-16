"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { createClient } from "../../../supabase/client";
import orderCom from "../../../public/icon/orderComplete.png";
import { refundPayment } from "@/services/payment/payment.service";
import { useUserData } from "@/hooks/useUserData";
import { OrderType } from "../../../types/common";

type productList = {
  id: string;
  name: string;
  imgUrl: string;
  amount: number;
  quantity: number;
};

export default function Complete() {
  const [products, setProducts] = useState<OrderType>(null);
  const supabase = createClient();
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("paymentId");
  const { data: userData } = useUserData();
  const userId = userData?.id;
  console.log(userId);

  useEffect(() => {
    const getProducts = async () => {
      if (paymentId) {
        await refundPayment(paymentId);
      } else {
        console.error("PaymentId is null");
      }

      if (paymentId) {
        const { data } = await supabase.from("order").select("*").eq("paymentId", paymentId).single();
        setProducts(data as OrderType);
        const productList = (data?.product_list as productList[]) || [];
        const productId = productList.map<string>((item) => item.id);
        if (userId && productId) {
          await supabase.from("cart").delete().eq("user_id", userId).in("product_id", productId);
        }
      }
    };

    getProducts();
  }, [paymentId, supabase, userId]);

  return (
    <div className="w-100vw overflow-hidden">
      <div className="bg-white rounded-lg mb-[10px]">
        <div className="border-[#F4F4F4] border-[6px] w-full mt-3 hidden xl:block" />
        <div className="p-8 text-center">
          <h2 className="text-[16px] mb-[12px] text-red-600">저희 프로젝트에서 결제한 내역은 즉시 환불됩니다</h2>
          <div className="flex justify-center">
            <Image
              src={orderCom}
              alt="주문완료"
              width={24}
              height={24}
              style={{ width: 24, height: 24 }}
              className=""
            />
            <h2 className="text-[18px] py-3">주문이 완료되었습니다</h2>
          </div>
          <p className="text-gray-400 text-[16px]">
            <span>주문번호 </span>
            <span>{paymentId}</span>
          </p>
        </div>
        <div className="border-[#F4F4F4] border-[6px] w-full mt-3" />

        <div className="flex flex-col mx-auto  xl:w-[1130px]">
          <div className="p-2 m-4 xl:my-4 xl:mx-2 xl:w-[450px]">
            <p className="mb-4 text-[18px] xl:text-[20px]">배송정보</p>
            <div className="grid grid-cols-[30%_70%] gap-y-5 gap-x-10 w-[343px] xl:w-[480px] xl:text-[18px]">
              <div className="text-[#4C4F52]">주문자</div>
              <div>{products?.name}</div>

              <div className="text-[#4C4F52]">주소</div>
              <div>{products?.address}</div>

              <div className="text-[#4C4F52]">배송 요청 사항</div>
              <div>{products?.request}</div>

              <div className="text-[#4C4F52]">택배사 정보</div>
              <div>cj 대한통운</div>
            </div>
          </div>

          <div className="border-[#F4F4F4] border-[6px] w-full mt-3 xl:hidden" />
          <div className="xl:w-full xl:mt-8 xl:rounded-2xl xl:shadow-[0px_1px_2px_0px_rgba(0,_0,_0,_0.25),_0px_0px_4px_0px_rgba(0,_0,_0,_0.08),_0px_0px_1px_0px_rgba(0,_0,_0,_0.08)]">
            <div className="m-4">
              <p className="m-3 text-lg xl:text-[240x] xl:p-2">주문상품</p>
              <div className="flex flex-col divide-y xl:divide-y-2">
                {products?.product_list &&
                  (products.product_list as productList[]).map((product, index) => (
                    <div key={index} className="bg-white rounded-md p-2 flex">
                      <div className="flex justify-center">
                        <div className="relative w-[72px] h-[72px] md:w-[124px] md:h-[124px] cursor-pointer mb-2">
                          <Image
                            src={product.imgUrl}
                            alt={product.name}
                            fill
                            sizes="72px xl:124px"
                            className="rounded-md object-cover"
                          />
                        </div>
                      </div>
                      <div className="ml-4 flex flex-col justify-between text-[14px] xl:text-[18px] ">
                        <div>
                          <p className="text-[#4C4F52]">{product.name}</p>
                          <p className="font-semibold">{product.amount} 원</p>
                        </div>
                        <div>
                          <p className=" text-[#989C9F]">{String(product.quantity).padStart(2, "0")} 개</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="border-[#F4F4F4] border mx-3 xl:border-2" />
            <div className="p-5 flex justify-between bottom-[80px] w-full text-lg xl:text-[20px] xl:px-8 xl:pt-[28px] xl:pb-[50px]">
              <div>최종 결제 금액</div>
              <div>{products?.price.toLocaleString()} 원</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
