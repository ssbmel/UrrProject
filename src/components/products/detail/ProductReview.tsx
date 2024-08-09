"use client";

import { useUserData } from "@/hooks/useUserData";
import Image from "next/image";
import { createClient } from "../../../../supabase/client";
import { useEffect, useState } from "react";
import { OrderType } from "../../../../types/common";

const ProductReview = () => {
  const { data: user } = useUserData();
  const [orderData, setOrderData] = useState<OrderType[]>([]);

  const getOrderData = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from("order").select("*");
    if (error) {
      console.error("Error fetching review data:", error);
    } else {
      // setOrderData(data.map((d)=>d.userId === user.id));
    }
  };

  useEffect(() => {
    getOrderData();
  }, []);

  console.log(orderData);
  



  return (
    <div className="border w-full p-4">
      <div className="w-full h-[100px] p-4 flex gap-3">
        <div className="w-[70px] h-[70px] bg-slate-500">{/* <Image src={} alt="상품이미지"/> */}</div>
        <div className="">
          <p>상품명</p>
          <p className="text-[14px] text-[#989C9F]">000원 구매</p>
        </div>
      </div>
      <hr />
      <div className="w-full p-4">
        <p className="text-center">상품은 어떠셨나요?</p>
        <div>{/* <Image src={} alt="score"/> */}</div>
        <p className="text-center">상품에 대한 전체적인 평점을 알려주세요</p>
      </div>
      <form action="">
        <div className="grid gap-6">
          <div className="bg-[#E1EEFE] p-4 rounded-[12px]">
            <p className="font-bold mb-3">후기는 이렇게 작성해보세요!</p>
            <p className="text-[12px]">
              제품에 대한 <span className="text-[#0051B2] font-semibold">사용감, 맛, 향, 첫인상</span> 등을 설명해주세요
              <br />
              <span className="font-semibold">사진</span>을 통해 상품에 대한 감상을 같이 작성하면, 후기에 대한 신뢰도를
              더 높일 수 있습니다
            </p>
          </div>

          <div className="flex items-center">
            <label className="font-bold mr-2">별점</label>
            <select className="p-2 rounded-md border">
              <option value="1">1</option>
              <option value="1.5">1.5</option>
              <option value="2">2</option>
              <option value="2.5">2.5</option>
              <option value="3">3</option>
              <option value="3.5">3.5</option>
              <option value="4">4</option>
              <option value="4.5">4.5</option>
              <option value="5">5</option>
            </select>
          </div>
          <textarea
            name="review-text"
            className="resize-none border w-full h-[300px] rounded-md"
            placeholder="상품에 맞는 후기를 작성해주세요 (최소10자) 예) 식품-맛, 포장 상태 등"
          ></textarea>
          <input type="file" />
          <button className="w-[342px] h-[52px] pl-[14px] mx-auto bg-[#1A82FF] text-[#FFFFFE] rounded-[8px] text-center">
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductReview;
