"use client";

import React from "react";
import XIcon from "../../../../public/icon/XIcon.svg";
import TrashCan from "../../../../public/icon/trashcanIcon.svg";
import defaultImg from "../../../../public/images/default.png";
import { useLoadReviews } from "@/hooks/useInfiniteData";
import Link from "next/link";
import Image from "next/image";
import { deleteReview } from "@/services/review/review.service";
import { useMutation } from "@tanstack/react-query";
import { Review } from "../../../../types/common";

interface Props {
  title: string;
  isClicked: boolean;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
  id?: string;
}

const MoreReview = ({ title, isClicked, setIsClicked, id }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useLoadReviews(id!);

  const closeWithBg = () => {
    setIsClicked(false);
  };

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
    <div
      className={`${isClicked ? "block" : "hidden"} fixed top-0 left-0 bg-[#3436378C] w-full h-full xl:shadow-2xl z-50`}
    >
      <div className="absolute gap-[24px] xl:top-1/2 xl:left-1/2 w-full h-full xl:w-[450px] xl:h-[550px] xl:ml-[-225px] xl:mt-[-275px] bg-[#fffffe] xl:shadow-md xl:rounded-[24px] flex flex-col p-[24px]">
        <div className="flex justify-between">
          <h3 className="text-[20px] font-[700]">{title}</h3>
          <button onClick={closeWithBg}>
            <XIcon />
          </button>
        </div>
        <section className="xl:h-[calc(600px-112px)] overflow-y-auto scrollbar-hide">
          <div className="flex flex-col gap-[8px]">
            {data?.pages.map((page, pageIdx) => (
              <div key={pageIdx}>
                {page.flat().map((item) => (
                  <li
                    key={item.id}
                    className="pb-[18px] text-[14px] border-b flex flex-col gap-[18px] last:border-none"
                  >
                    <div className="flex justify-between items-center w-full">
                      <Link
                        href={`/products/detail/${item.product_id}`}
                        className="flex items-center w-[calc(100%-50px)] gap-[12px]"
                      >
                        <div className="relative w-[68px] h-[68px] rounded-[6px]">
                          <Image
                            src={
                              (Array.isArray(item.review_images) ? item.review_images[0] : item.review_images) ||
                              defaultImg
                            }
                            alt="product_review_image"
                            fill
                            sizes="68px"
                            priority
                            className="bg-slate-300 w-[68px] h-[68px] rounded-[6px] object-cover"
                          />
                        </div>
                        <div className="flex flex-col gap-[6px] w-[calc(100%-80px)]">
                          <h3 className="font-[400] overflow-hidden text-ellipsis whitespace-nowrap">{item.title}</h3>
                          <p className="text-[12px] text-[#989C9F] truncate">{item.review_content}</p>
                          <p className="text-[12px] text-[#B2B5B8]">{formatDate(item.created_at)}</p>
                        </div>
                      </Link>
                      <button onClick={() => handleDelete(item)}>
                        <span>
                          <TrashCan />
                        </span>
                      </button>
                    </div>
                  </li>
                ))}
              </div>
            ))}
            <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
              {isFetchingNextPage ? (
                <div className="bg-gray-100 text-gray-400 w-full py-[20px] text-[12px] rounded-t-[12px]">
                  목록을 가져오는 중...
                </div>
              ) : hasNextPage ? (
                <div className="bg-gray-100 text-gray-400 w-full py-[20px] text-[12px] rounded-t-[12px]">더 보기</div>
              ) : (
                ""
              )}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MoreReview;
