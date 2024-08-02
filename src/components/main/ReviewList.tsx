"use client";

import Image from "next/image";
import defaultImg from "../../../public/images/default.png";
import { Review } from "../../../types/common";
import { useEffect, useState } from "react";
import { createClient } from "../../../supabase/client";

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
    <div className="w-full mx-auto p-5 ">
      <h2 className="font-bold mb-5 text-xl">후기</h2>
      <div className="w-full h-[400px] overflow-y-auto flex flex-col gap-y-4 scrollbar">
        {reviewData.length === 0 ? (
          <p>후기가 없습니다.</p>
        ) : (
          reviewData.map((review) => (
            <div key={review.id} className="flex gap-3">
              <Image src={defaultImg} alt="img" width={130} height={130} />
              <div className="flex flex-col w-1/2">
                <p className="font-bold">{review.title}</p>
                <p>{review.review_content}</p>
                <p className="text-xs text-gray-400 mt-auto">
                  {review.user_nickname} | {formatDate(review.created_at)}
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
