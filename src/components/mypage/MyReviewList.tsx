import React, { useEffect, useState } from "react";
import Error from "../common/error/Error";
import Image from "next/image";
import TrashCan from "../../../public/icon/trashcanIcon.svg";
import { useUserData } from "@/hooks/useUserData";
import { createClient } from "../../../supabase/client";
import { Review } from "../../../types/common";
import defaultImg from "../../../public/images/default.png";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

const MyReviewList = () => {
  const [reviewData, setReviewData] = useState<Review[]>([]);
  const { data: user } = useUserData();
  const supabase = createClient();
  const { id } = useParams();

  const getReviewData = async () => {
    if (!user || !user.id) {
      console.error("User is not authenticated");
      return;
    }

    const { data, error } = await supabase.from("product_review").select("*").eq("userId", user.id);
    if (error) {
      console.error("Error fetching review data:", error);
    } else {
      setReviewData(data);
    }
  };

  useEffect(() => {
    if (user) {
      getReviewData();
    }
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().substring(0, 10);
  };

  const deleteReview = async (data: Review) => {
    const response = await fetch("/api/product_review", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  };

  const { mutate: deleteReviewMutation } = useMutation<Review, unknown, Review>({
    mutationFn: (data) => deleteReview(data)
  });

  const handleDelete = async (review: Review) => {
    if (!window.confirm("해당 리뷰를 삭제하시겠습니까?")) return;
    deleteReviewMutation(review);
  };

  return (
    <>
      {reviewData?.length > 0 ? (
        <div>
          <ul>
            {reviewData.map((review) => (
              <li
                key={review.id}
                className="pb-[18px] text-[14px] border-b flex flex-col gap-[18px] xl:pb-[36px] last:border-none"
              >
                <div className="flex justify-between items-center w-full">
                  <Link
                    href={`/products/detail/${review.product_id}`}
                    className="flex items-center w-[calc(100%-58px)] gap-[12px]"
                  >
                    <div className="relative w-[68px] h-[68px] xl:w-[100px] xl:h-[100px] rounded-[6px]">
                      <Image
                        src={
                          (Array.isArray(review.review_images) ? review.review_images[0] : review.review_images) ||
                          defaultImg
                        }
                        alt="product_review_image"
                        fill
                        sizes="68px xl:100px"
                        priority
                        className="rounded-[6px] w-[68px] h-[68px] xl:w-[100px] xl:h-[100px] object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-[6px] w-[calc(100%-90px)]">
                      <h3 className="font-[400] overflow-hidden text-ellipsis whitespace-nowrap xl:text-[18px]">
                        {review.title}
                      </h3>
                      <p className="text-[12px] text-[#989C9F] truncate xl:text-[16px]">
                        {review.review_content || "내용이 없습니다"}
                      </p>
                      <p className="text-[12px] text-[#B2B5B8] xl:text-[16px]">{formatDate(review.created_at)}</p>
                    </div>
                  </Link>
                  <button
                    onClick={() => handleDelete(review)}
                    className="p-[9px] xl:w-[112px] xl:h-[44px] xl:py-[12px] xl:px-[28px] xl:bg-[#F2F2F2] xl:rounded-[8px] xl:hover:bg-red-100 transition-colors"
                  >
                    <span className="xl:hidden">
                      <TrashCan />
                    </span>
                    <span className="text-[#0068E5] font-[600] hidden xl:block">삭제하기</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Error>
          <span>리뷰 작성 내역이 없습니다.</span>
        </Error>
      )}
    </>
  );
};

export default MyReviewList;
