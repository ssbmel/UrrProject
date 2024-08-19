import React, { useEffect, useState } from "react";
import Error from "../common/error/Error";
import Image from "next/image";
import TrashCan from "../../../public/icon/trashcanIcon.svg";
import { useUserData } from "@/hooks/useUserData";
import { createClient } from "../../../supabase/client";
import { Review } from "../../../types/common";
import defaultImg from "../../../public/images/default.png";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";

const MyReviewList = () => {
  const [reviewData, setReviewData] = useState<Review[]>([]);
  const { data: user } = useUserData();
  const supabase = createClient();

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
  }, [reviewData]);

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
    const result = await swal("해당 리뷰를 삭제하시겠습니까?", {
      buttons: ["아니오", "예"]
    });

    if (!result) return;
    deleteReviewMutation(review);
  };

  return (
    <>
      {reviewData.length > 0 ? (
        <div>
          <ul>
            {reviewData.map((item) => (
              <li
                key={item.id}
                className="pb-[18px] text-[14px] border-b flex flex-col gap-[18px] xl:pb-[36px] last:border-none"
              >
                <div className="flex justify-between items-center w-full">
                  <Link
                    href={`/products/detail/${item.product_id}`}
                    className="flex items-center w-[calc(100%-58px)] gap-[12px]"
                  >
                    <div className="relative w-[68px] h-[68px] rounded-[6px]">
                      <Image
                        src={
                          (Array.isArray(item.review_images) ? item.review_images[0] : item.review_images) || defaultImg
                        }
                        alt="product_review_image"
                        fill
                        sizes="68px"
                        priority
                        className="bg-slate-300 rounded-[6px] object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-[6px] w-[calc(100%-90px)]">
                      <h3 className="font-[400] overflow-hidden text-ellipsis whitespace-nowrap">{item.title}</h3>
                      <p className="text-[12px] text-[#989C9F] truncate">{item.review_content}</p>
                      <p className="text-[12px] text-[#B2B5B8]">{formatDate(item.created_at)}</p>
                    </div>
                  </Link>
                  <button onClick={() => handleDelete(item)} className="p-[9px]">
                    <TrashCan />
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
