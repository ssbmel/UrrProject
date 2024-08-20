import React, { useEffect, useState } from "react";
import Error from "../common/error/Error";
import Image from "next/image";
import TrashCan from "../../../public/icon/trashcanIcon.svg";
import { createClient } from "../../../supabase/client";
import { Review } from "../../../types/common";
import defaultImg from "../../../public/images/default.png";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import MoreReview from "./my-review/MoreReview";
import { PublicUser } from "../../../types/auth.type";
import { deleteReview } from "@/services/review/review.service";

const MyReviewList = ({ user }: { user: PublicUser }) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [reviewData, setReviewData] = useState<Review[]>([]);

  const supabase = createClient();

  const getReviewData = async () => {
    if (!user || !user.id) {
      console.error("User is not authenticated");
      return;
    }
    const { data, error } = await supabase.from("product_review").select("*").eq("userId", user.id).range(0, 4);
    if (error) {
      console.error("Error fetching review data:", error);
    } else {
      setReviewData(data);
    }
  };

  useEffect(() => {
    if (user?.id) {
      getReviewData();
    }
  }, [user]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().substring(0, 10);
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
    <div className="flex flex-col gap-[20px] p-[20px] xl:gap-[37px]">
      <div className="flex justify-between items-center">
        <h2 className="text-[20px] font-bold">리뷰 관리</h2>
        <button
          onClick={() => setIsClicked(true)}
          disabled={!!reviewData}
          className="transition-colors text-gray-400 hover:text-primarynormal disabled:hidden"
        >
          더보기
        </button>
        <MoreReview isClicked={isClicked} setIsClicked={setIsClicked} id={user.id} title="리뷰 관리" />
      </div>
      {reviewData.length > 0 ? (
        <div>
          <ul>
            {reviewData.map((item) => (
              <li
                key={item.id}
                className="py-[18px] text-[14px] border-b flex flex-col gap-[18px] xl:py-[36px] last:border-none"
              >
                <div className="flex justify-between items-center w-full">
                  <Link
                    href={`/products/detail/${item.product_id}`}
                    className="flex items-center xl:w-[calc(100%-250px)] w-[calc(100%-50px)]  xl:gap-[14px] gap-[12px]"
                  >
                    <div className="relative w-[68px] h-[68px] xl:w-[98px] xl:h-[98px] rounded-[6px]">
                      <Image
                        src={
                          (Array.isArray(item.review_images) ? item.review_images[0] : item.review_images) || defaultImg
                        }
                        alt="product_review_image"
                        fill
                        sizes="68px xl:98px"
                        priority
                        className="bg-slate-300 w-[68px] h-[68px] xl:w-[98px] xl:h-[98px] rounded-[6px] object-cover"
                      />
                    </div>
                    <div className="flex flex-col xl:gap-[10px] gap-[6px] w-[calc(100%-80px)] xl:w-[calc(100%-150px)] ">
                      <h3 className="font-[400] xl:text-[18px] overflow-hidden text-ellipsis whitespace-nowrap">
                        {item.title}
                      </h3>
                      <p className="text-[12px] xl:text-[14px] text-[#989C9F] truncate">{item.review_content}</p>
                      <p className="text-[12px] xl:text-[14px] text-[#B2B5B8]">{formatDate(item.created_at)}</p>
                    </div>
                  </Link>
                  <button
                    onClick={() => handleDelete(item)}
                    className="xl:w-[112px] xl:h-[44px] xl:py-[12px] xl:px-[28px] xl:bg-[#EAECEC] xl:rounded-[8px] xl:hover:bg-red-100 transition-colors"
                  >
                    <span className="text-[#0068E5] font-[600] hidden xl:block">삭제하기</span>
                    <span className="xl:hidden">
                      <TrashCan />
                    </span>
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
    </div>
  );
};

export default MyReviewList;
