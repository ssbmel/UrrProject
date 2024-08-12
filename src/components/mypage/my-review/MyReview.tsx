"use client";

import { useUserData } from "@/hooks/useUserData";
import Image from "next/image";
import { createClient } from "../../../../supabase/client";
import { useEffect, useRef, useState } from "react";
import { OrderType, Product, Review } from "../../../../types/common";
import ReviewImage from "./ReviewImage";
import { useParams, useRouter } from "next/navigation";
import defaultImg from "../../../../public/images/default.png";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@tanstack/react-query";

export type ReviewImgGroup = { file: File | null; url: string };

export type ProductList = {
  amount: number;
  id: string;
  imgUrl: string;
  name: string;
  quantity: number;
};

const MyReview = () => {
  const { data: user } = useUserData();
  const [orderData, setOrderData] = useState<ProductList>();
  const [productsData, setProductsData] = useState<Product>();
  const [reviewImages, setReviewImages] = useState<ReviewImgGroup[]>([]);
  const [uploadedReviewImages, setUploadedReviewImages] = useState("");
  const Ids = useParams();
  const scoreRef = useRef<HTMLSelectElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      getOrderData();
    }
  }, [user]);

  const getOrderData = async () => {
    if (!user || !user.id) {
      console.error("User is not authenticated");
      return;
    }

    const { data, error } = await supabase
      .from("order")
      .select("*")
      .eq("delivery", "배송완료")
      .eq("paymentId", Ids.paymentId)
      .eq("userId", user.id)
      .single();
    if (error) {
      console.error("Error fetching review data:", error);
    } else {
      setOrderData(data.product_list.find((value) => value.id === Ids.id));
    }
  };

  useEffect(() => {
    if (user) {
      getProductsData();
    }
  }, [user]);

  const getProductsData = async () => {
    if (!user || !user.id) {
      console.error("User is not authenticated");
      return;
    }

    const { data, error } = await supabase.from("products").select("*").eq("id", Ids.id);
    if (error) {
      console.error("Error fetching review data:", error);
    } else {
      setProductsData(data.find((value) => value.id === Ids.id));
    }
  };

  const uploadImages = async (reviewId: string): Promise<string[] | null> => {
    if (!reviewImages.length) {
      return null;
    }
  
    const uploads = reviewImages.map(async (review) => {
      if (!review.file) return review.url;
  
      const ext = review.file.name.split(".").pop();
      const newFileName = `${uuidv4()}.${ext}`;
      console.log(`Uploading to path: ${reviewId}/reviewImages/${newFileName}`);
  
      const { data, error } = await supabase.storage
        .from("product_review")
        .upload(`${reviewId}/reviewImages/${newFileName}`, review.file);
  
      if (error) {
        console.error("File upload failed:", error);
        return null;
      }
  
      const res = await supabase.storage.from("product_review").getPublicUrl(data.path);
      console.log("Public URL response:", res);
  
      return res.data.publicUrl;
    });
  
    const resList = await Promise.all(uploads);
    return resList.filter((url): url is string => url !== null);
  };

  const saveReview = async (data: Review) => {
    const response = await fetch("/api/product_review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return response.json();
  };

  const { mutate: saveReviewMutation } = useMutation<Review, unknown, Review>({
    mutationFn: (data) => saveReview(data)
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      return;
    }
    const reviewId = uuidv4();
    const reviewImagesId = await uploadImages(reviewId);
    console.log(reviewImagesId);
    
    const newReviewData: Review = {
      id: reviewId,
      created_at: new Date().toDateString(),
      product_id: Ids.id as string,
      user_nickname: user.nickname,
      review_score: Number(scoreRef.current?.value),
      review_images: reviewImagesId,
      review_content: contentRef.current?.value as string,
      title: orderData?.name as string,
      inf_name: productsData?.nickname as string,
      payment_id: Ids.paymentId as string
    };

    const { data, error } = await supabase.from("product_review").insert([newReviewData]).select();
    if (error) {
      console.error("Error inserting data:", error);
    } else {
      alert("상품등록이 완료되었습니다.");
      console.log("Data inserted:", data);
      saveReviewMutation(newReviewData);
      router.push("/mypage");
    }
  };

  return (
    <div className="w-full xl:w-[60%] p-4 mx-auto">
      <div key={orderData?.id} className="w-full h-[100px] p-4 flex gap-3">
        <div className="w-[70px] h-[70px] rounded-md relative">
          <Image
            src={orderData?.imgUrl || defaultImg}
            alt="상품이미지"
            fill
            sizes="70px"
            className="object-cover rounded-md"
          />
        </div>
        <div className="grid">
          <p>{orderData && [orderData?.name.split("] ")[0] + "]", <br key="1" />, orderData?.name.split("] ")[1]]}</p>
          <p className="text-[14px] text-[#989C9F]">{orderData && orderData.amount * orderData.quantity}원 구매</p>
        </div>
      </div>

      <hr />
      <div className="w-full py-4">
        <p className="text-center text-xl text-[#1B1C1D] font-bold">상품은 어떠셨나요?</p>
        <p className="text-center text-[#4C4F52]">상품에 대한 전체적인 평점을 알려주세요</p>
      </div>
      <form className="w-full" onSubmit={onSubmit}>
        <div className="bg-[#E1EEFE] py-3 px-4 rounded-[12px]">
          <p className="font-bold mb-3">후기는 이렇게 작성해보세요!</p>
          <p className="text-[12px]">
            제품에 대한 <span className="text-[#0051B2] font-semibold">사용감, 맛, 향, 첫인상</span> 등을 설명해주세요
            <br />
            <span className="font-semibold">사진</span>을 통해 상품에 대한 감상을 같이 작성하면, 후기에 대한 신뢰도를 더
            높일 수 있습니다
          </p>
        </div>
        <div className="flex items-center my-4">
          <label className="font-bold mr-2">별점</label>
          <select className="p-2 rounded-md border" ref={scoreRef}>
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
          ref={contentRef}
        ></textarea>
        <ReviewImage
          reviewImages={reviewImages}
          setReviewImages={setReviewImages}
          uploadedReviewImages={uploadedReviewImages}
        />
        <button className="w-full h-[52px] mx-auto pl-[14px] bg-[#1A82FF] text-[#FFFFFE] rounded-[8px] text-center">
          등록하기
        </button>
      </form>
    </div>
  );
};

export default MyReview;
