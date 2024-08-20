"use client";

import Image from "next/image";
import defaultImg from "../../../public/images/default.png";
import { useEffect, useState } from "react";
import fullStar from "../../../public/icon/full_star.png";
import halfStar from "../../../public/icon/half_star.png";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "./style.css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Review } from "../../../types/common";
import "swiper/css/navigation";
import { createClient } from "../../../supabase/client";

function MainReviewList() {
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
    if (reviewData) {
      getReviewData();
    }
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${month}.${day}`;
  };

  return (
    <div className="w-full py-[28px] xl:mb-[100px]">
      <h2 className="font-bold text-lg xl:text-[22px] px-4 mb-[20px]">후기</h2>
      <div className="xl:hidden px-4">
        <div className="grid gap-3 scrollbar" style={{ height: "400px", overflowY: "auto", overflowX: "hidden" }}>
          {reviewData.length === 0 ? (
            <p>후기가 없습니다.</p>
          ) : (
            reviewData.map((review) => (
              <Link href={`/products/detail/${review.product_id}?tab=review`} key={review.id}>
                <div className="flex w-full">
                  <div className="w-[108px] h-[108px] mr-3 flex-shrink-0">
                    <div className="relative w-[108px] h-[108px]">
                      <Image
                        src={Array.isArray(review.review_images) ? review.review_images[0] : defaultImg}
                        alt="img"
                        fill
                        sizes="108px"
                        className="rounded-md object-cover"
                      />
                    </div>
                  </div>

                  <div className="w-[60%] h-[104px] grid grid-rows-[auto,1fr,auto]">
                    <div className="flex my-1">
                      {Array(Math.floor(review.review_score!))
                        .fill(1)
                        .map((_, index) => (
                          <div key={index} className="relative mr-[4px] w-[15px] h-[15px]">
                            <Image src={fullStar.src} fill sizes="15px" alt="fullStar" className="object-cover" />
                          </div>
                        ))}
                      {review.review_score! % 1 !== 0 && (
                        <div className="relative mr-[4px] w-[15px] h-[15px]">
                          <Image src={halfStar.src} fill sizes="15px" alt="halfStar" className="object-cover" />
                        </div>
                      )}
                    </div>
                    <div className="text-[#989C9F]">
                      <p className="truncate flex-1">{review.title}</p>
                      <p className="text-[#1B1C1D] font-medium line-clamp-2">{review.review_content}</p>
                    </div>
                    <div className="self-end">
                      <p className="text-xs text-gray-400 mt-1">
                        {review.user_nickname} <span className="text-[#E7E8E9]">|</span> {formatDate(review.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
      <div className="hidden xl:block">
        <Swiper
          slidesPerView={3}
          centeredSlides={false}
          spaceBetween={10}
          navigation={true}
          modules={[Pagination, Navigation, Autoplay]}
          speed={1500}
          loop={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false
          }}
        >
          {reviewData.length === 0 ? (
            <p>후기가 없습니다.</p>
          ) : (
            reviewData.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="grid w-[304px] h-[385px] mx-auto border rounded-[20px] p-3 shadow-sm">
                  <Link href={`/products/detail/${review.product_id}?tab=review`}>
                    <div className="flex justify-center">
                      <div className="w-[276px] h-[201px] relative mb-2">
                        <Image
                          src={Array.isArray(review.review_images) ? review.review_images[0] : defaultImg}
                          alt="img"
                          fill
                          sizes="276px"
                          className="rounded-md object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex gap-[4px] mb-2">
                        {Array(Math.floor(review.review_score!))
                          .fill(1)
                          .map((_, index) => (
                            <div key={index} className="relative mr-[4px] w-[20px] h-[20px]">
                              <Image
                                src={fullStar.src}
                                width={20}
                                height={20}
                                alt="fullStar"
                                className="object-cover"
                              />
                            </div>
                          ))}
                        {review.review_score! % 1 !== 0 && (
                          <div className="relative mr-[4px] w-[20px] h-[20px]">
                            <Image src={halfStar.src} width={20} height={20} alt="halfStar" className="object-cover" />
                          </div>
                        )}
                      </div>
                  </Link>
                  <div className="w-full h-[200px] mx-auto flex flex-col items-start">
                    <div className="text-[#989C9F] gap-1 text-left">
                      <p className="truncate xl:text-[16px] xl:mb-1 w-[276px]">
                        {review.inf_name} <span className="text-[#E7E8E9]">|</span> {review.title}
                      </p>
                    </div>
                    <p className="text-[#1B1C1D] font-medium mb-2 xl:text-[16px] xl:h-[25%] line-clamp-2 text-left">
                      {review.review_content}
                    </p>
                    <div className="">
                     
                      <p className="text-[14px] text-gray-400 text-left my-2">
                        {review.user_nickname} <span className="text-[#E7E8E9]">|</span> {formatDate(review.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </div>
  );
}

export default MainReviewList;
