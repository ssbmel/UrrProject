"use client";

import Image from "next/image";
import defaultImg from "../../../public/images/default.png";
import { Review } from "../../../types/common";
import { useEffect, useState } from "react";
import { createClient } from "../../../supabase/client";
import fullStar from "../../../public/icon/full_star.png";
import halfStar from "../../../public/icon/half_star.png";
import InfluencerIcon from "../../../public/icon/influencer.svg";
import Link from "next/link";

function ReviewList() {
  const [reviewData, setReviewData] = useState<Review[]>([]);

  const getReviewData = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from("product_review").select("*");
    if (error) {
      console.error("Error fetching review data:", error);
    } else {
      setReviewData(data);
    }
  };

  useEffect(() => {
    getReviewData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = String(date.getFullYear()).slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  return (
    <div className="w-full mx-auto p-5">
      <h2 className="font-bold mb-5 text-xl">후기</h2>
      <div className="w-full h-[400px] overflow-y-auto flex flex-col gap-y-4 scrollbar">
        {reviewData.length === 0 ? (
          <p>후기가 없습니다.</p>
        ) : (
          reviewData.map((review) => (
            <div key={review.id} className="flex gap-3">
              <Link href={`/products/detail/${review.product_id}`}>
                <div className="w-[120px] h-[120px] relative">
                  <Image
                    src={Array.isArray(review.review_images) ? review.review_images[0] : defaultImg}
                    alt="img"
                    fill
                    sizes="120px"
                    className="rounded-md object-cover"
                  />
                </div>
              </Link>
              <div className="flex-col w-[60%]">
                <div className="flex text-[#989C9F] gap-1">
                  <div className="mt-[2px]">
                    <InfluencerIcon />
                  </div>
                  <p className="w-[100%] truncate">
                    {review.inf_name} <span className="text-[#E7E8E9]">|</span> {review.title}
                  </p>
                </div>
                <p className="text-[#1B1C1D] font-medium mb-2">{review.review_content}</p>
                <div className="flex items-center">
                  {Array(Math.floor(review.review_score!))
                    .fill(1)
                    .map((_, index) => (
                      <Image key={index} src={fullStar.src} width={20} height={20} alt="fullStar" />
                    ))}
                  {review.review_score! % 1 !== 0 && <Image src={halfStar.src} width={20} height={20} alt="halfStar" />}
                </div>
                <p className="text-xs text-gray-400">
                  {review.user_nickname} <span className="text-[#E7E8E9]">|</span> {formatDate(review.created_at)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ReviewList;
