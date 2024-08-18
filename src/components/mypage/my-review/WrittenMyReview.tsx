"use client";

import { useUserData } from "@/hooks/useUserData";
import Image from "next/image";
import { createClient } from "../../../../supabase/client";
import { useEffect, useRef, useState } from "react";
import { Product, Review } from "../../../../types/common";
import { useParams, useRouter } from "next/navigation";
import defaultImg from "../../../../public/images/default.png";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@tanstack/react-query";
import Rating from "./star/Rating";
import Link from "next/link";
import Button from "@/components/common/button/Button";
import UploadReviewImage from "./UploadReviewImage";
import swal from "sweetalert";

export type ReviewImgGroup = { file: File | null; url: string };

export type ProductList = {
  amount: number;
  id: string;
  imgUrl: string;
  name: string;
  quantity: number;
};

const WrittenMyReview = () => {
  const { data: user } = useUserData();
  const [orderData, setOrderData] = useState<ProductList | null>(null);
  const [productsData, setProductsData] = useState<Product | null>(null);
  const [reviewImages, setReviewImages] = useState<ReviewImgGroup[]>([]);
  const [uploadedReviewImages, setUploadedReviewImages] = useState("");
  const [rating, setRating] = useState<number>(0);
  const Ids = useParams();
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const supabase = createClient();
  const router = useRouter();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (user) {
      getOrderData();
      getProductsData();
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
      return;
    }
    const handledJsonData = data.product_list.map((value) => {
      const stringified = JSON.stringify(value);
      const result = JSON.parse(stringified);
      return result;
    });
    const matchedProduct = handledJsonData.find((value) => value.id === Ids.id);
    setOrderData(matchedProduct);
  };

  const getProductsData = async () => {
    if (!user || !user.id) {
      console.error("User is not authenticated");
      return;
    }

    const { data, error } = await supabase.from("products").select("*").eq("id", Ids.id);
    if (error) {
      console.error("Error fetching review data:", error);
    } else {
      setProductsData(data.find((value) => value.id === Ids.id) || null);
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
      body: JSON.stringify(data),
    });
    return response.json();
  };

  const { mutate: saveReviewMutation } = useMutation<Review, unknown, Review>({
    mutationFn: (data) => saveReview(data),
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      return;
    }
    const reviewId = uuidv4();
    const reviewImagesId = await uploadImages(reviewId);
    const reviewContent = contentRef.current?.value.trim();

    if (!rating) {
      swal("별점을 선택해 주세요.");
      return;
    }
  
    if (!reviewContent) {
      swal("후기 내용을 입력해 주세요.");
      return;
    }
  
    if (!reviewImagesId) {
      swal("후기 사진을 넣어주세요.");
      return;
    }


    const newReviewData: Review = {
      id: reviewId,
      created_at: new Date().toDateString(),
      product_id: Ids.id as string,
      user_nickname: user.nickname,
      review_score: rating,
      review_images: reviewImagesId,
      review_content: reviewContent as string,
      title: orderData?.name as string,
      inf_name: productsData?.nickname as string,
      payment_id: Ids.paymentId as string,
      userId: user.id,
    };

    const { data, error } = await supabase.from("product_review").insert([newReviewData]).select();
    if (error) {
      console.error("Error inserting data:", error);
    } else {
      swal("후기가 등록되었습니다.");
      saveReviewMutation(newReviewData);
      router.push("/mypage");
    }
  };

  const content = (
    <div className="xl:p-3">
      <h1 className="hidden xl:block text-[20px] font-bold mt-[12px]">후기 작성</h1>
      <div key={orderData?.id} className={`w-full h-[${isDesktop ? "150px" : "100px"}] p-4 flex gap-3 ${isDesktop ? "mt-[12px]" : ""}`}>
        <div className={`w-[70px] xl:w-[124px] h-[${isDesktop ? "124px" : "70px"}] rounded-md relative`}>
          <Image
            src={orderData?.imgUrl || defaultImg}
            alt="상품이미지"
            fill
            sizes="70px xl:w-[124px]"
            className="object-cover rounded-md"
          />
        </div>
        <div className="grid">
          <p className={isDesktop ? "text-[18px]" : ""}>
            {orderData && [orderData?.name.split("] ")[0] + "]", <br key="1" />, orderData?.name.split("] ")[1]]}
          </p>
          <p className={`text-[14px] text-[#989C9F] ${isDesktop ? "mt-auto" : ""}`}>
            {orderData && orderData.amount * orderData.quantity}원 구매
          </p>
        </div>
      </div>

      <hr />
      <div className="w-full py-6">
        <p className="text-center text-xl text-[#1B1C1D] font-bold">상품은 어떠셨나요?</p>
        <Rating value={rating} onChange={setRating} />
        <p className="text-center text-[#4C4F52] xl:text-[18px]">상품에 대한 전체적인 평점을 알려주세요</p>
      </div>
      <form className="w-full" onSubmit={onSubmit}>
        <div className={`bg-[#E1EEFE] ${isDesktop ? "py-5 px-6" : "py-3 px-4"} rounded-[12px] mb-8 xl:mb-10`}>
          <p className={`font-bold mb-3 ${isDesktop ? "text-[20px]" : ""}`}>후기는 이렇게 작성해보세요!</p>
          <p className={isDesktop ? "text-[16px]" : "text-[14px]"}>
            제품에 대한 <span className="text-[#0051B2] font-semibold">사용감, 맛, 향, 첫인상</span> 등을 설명해주세요
            <br />
            <span className="font-semibold">사진</span>을 통해 상품에 대한 감상을 같이 작성하면, 후기에 대한 신뢰도를 더 높일 수 있습니다
          </p>
        </div>
        <textarea
          name="review-text"
          className="resize-none border w-full h-[300px] rounded-md p-3"
          placeholder="상품에 맞는 후기를 작성해주세요 (최소10자) 예) 식품-맛, 포장 상태 등"
          ref={contentRef}
        ></textarea>
        <UploadReviewImage
          reviewImages={reviewImages}
          setReviewImages={setReviewImages}
          uploadedReviewImages={uploadedReviewImages}
        />
        {isDesktop ? (
          <div className="flex justify-center gap-5 my-4">
            <Link href={"/mypage"}>
              <button className="w-[174px] h-[52px] border border-[#0068E5] bg-[#FFFFFE] text-[#0068E5] rounded-[8px]
                 hover:bg-[#F2F2F2] hover:text-[#004BB8] active:bg-[#F2F2F2] active:text-[#003E91] transition-all duration-200">
                돌아가기
              </button>
            </Link>
            <Button>등록하기</Button>
          </div>
        ) : (
          <button className="w-full h-[52px] mx-auto pl-[14px] bg-[#1A82FF] text-[#FFFFFE] rounded-[8px] text-center text-[18px]">
            등록하기
          </button>
        )}
      </form>
    </div>
  );

  return (
    <div>
      {!isDesktop ? (
        <div className="w-full xl:w-[60%] p-4 mx-auto xl:hidden">
          {content}
        </div>
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 w-[726px] bg-white rounded-lg shadow-lg">{content}</div>
        </div>
      )}
    </div>
  );
};

export default WrittenMyReview;
