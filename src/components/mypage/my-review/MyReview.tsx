"use client";

import { useUserData } from "@/hooks/useUserData";
import Image from "next/image";
import { createClient } from "../../../../supabase/client";
import { useEffect, useState } from "react";
import { OrderType } from "../../../../types/common";
import ReviewImage from "./ReviewImage";

export type ReviewImgGroup = { file: File | null; url: string };

const MyReview = () => {
  const { data: user } = useUserData();
  const [orderData, setOrderData] = useState<OrderType[]>([]);
  const [reviewImages, setReviewImages] = useState<ReviewImgGroup[]>([]);
  const [uploadedReviewImages, setUploadedReviewImages] = useState("");

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

  return (
    <div className="w-full p-4 mx-auto">
      <div className="w-full h-[100px] p-4 flex gap-3">
        <div className="w-[70px] h-[70px] bg-slate-500 rounded-md">{/* <Image src={} alt="상품이미지"/> */}</div>
        <div className="grid">
          <p>상품명</p>
          <p className="text-[14px] text-[#989C9F]">000원 구매</p>
        </div>
      </div>
      <hr />
      <div className="w-full py-4">
        <p className="text-center text-xl text-[#1B1C1D] font-bold">상품은 어떠셨나요?</p>
        <div>{/* <Image src={} alt="score"/> */}</div>
        <p className="text-center text-[#4C4F52]">상품에 대한 전체적인 평점을 알려주세요</p>
      </div>
        <form className="w-full">
          <div className="bg-[#E1EEFE] py-3 px-4 rounded-[12px]">
            <p className="font-bold mb-3">후기는 이렇게 작성해보세요!</p>
            <p className="text-[12px]">
              제품에 대한 <span className="text-[#0051B2] font-semibold">사용감, 맛, 향, 첫인상</span> 등을 설명해주세요
              <br />
              <span className="font-semibold">사진</span>을 통해 상품에 대한 감상을 같이 작성하면, 후기에 대한 신뢰도를
              더 높일 수 있습니다
            </p>
          </div>
          <div className="flex items-center my-4">
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
            className="resize-none border w-full h-[300px] rounded-md p-3"
            placeholder="상품에 맞는 후기를 작성해주세요 (최소10자) 예) 식품-맛, 포장 상태 등"
          ></textarea>
          <ReviewImage reviewImages={reviewImages} setReviewImages={setReviewImages} uploadedReviewImages={uploadedReviewImages} />
          <button className="w-[330px] h-[52px] pl-[14px] mx-auto bg-[#1A82FF] text-[#FFFFFE] rounded-[8px] text-center">
            등록하기
          </button>
        </form>
    </div>
  );
};

export default MyReview;
