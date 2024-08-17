"use client";

import Image from "next/image";
import defaultImg from "../../../public/images/default.png";
import { useEffect, useState } from "react";
import fullStar from "../../../public/icon/full_star.png";
import halfStar from "../../../public/icon/half_star.png";
import InfluencerIcon from "../../../public/icon/maininfluencer.svg";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "./style.css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { createClient } from "../../../supabase/client";
import { Review } from "../../../types/common";
import 'swiper/css/navigation';

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
    <div className="w-full py-8">
      <h2 className="font-bold text-lg xl:text-[22px] xl:my-8 px-4">후기</h2>
      <div className="xl:hidden p-4">
        <div className="grid gap-4 scrollbar" style={{ height: "400px", overflowY: "auto", overflowX: "hidden" }}>
          {reviewData.length === 0 ? (
            <p>후기가 없습니다.</p>
          ) : (
            reviewData.map((review) => (
              <div key={review.id} className="flex w-full">
                <div className="w-[120px] h-[104px] mr-2 flex-shrink-0">
                  <Link href={`/products/detail/${review.product_id}`}>
                    <div className="relative w-[120px] h-[104px]">
                      <Image
                        src={Array.isArray(review.review_images) ? review.review_images[0] : defaultImg}
                        alt="img"
                        fill
                        sizes="120px"
                        className="rounded-md object-cover"
                      />
                    </div>
                  </Link>
                </div>

                <div className="w-[60%]">
                  <div className="flex text-[#989C9F] gap-1">
                    <div className="mt-[3px] flex-shrink-0">
                      <InfluencerIcon />
                    </div>
                    <p className="truncate flex-1">
                      {review.inf_name} <span className="text-[#E7E8E9]">|</span> {review.title}
                    </p>
                  </div>
                  <p className="text-[#1B1C1D] font-medium mb-2 line-clamp-2">{review.review_content}</p>
                  <div className="flex">
                    {Array(Math.floor(review.review_score!))
                      .fill(1)
                      .map((_, index) => (
                        <Image key={index} src={fullStar.src} width={20} height={20} alt="fullStar" />
                      ))}
                    {review.review_score! % 1 !== 0 && (
                      <Image src={halfStar.src} width={20} height={20} alt="halfStar" />
                    )}
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

      {/* Desktop Carousel */}
      <div className="hidden xl:block">
        <Swiper
          slidesPerView={3}
          centeredSlides={false}
          spaceBetween={30}
          navigation={true}
          modules={[Pagination, Navigation, Autoplay]}
          speed={1500}
          loop={false}
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
                  <Link href={`/products/detail/${review.product_id}`}>
                    <div className="flex justify-center">
                      <div className="w-[276px] h-[201px] relative">
                        <Image
                          src={Array.isArray(review.review_images) ? review.review_images[0] : defaultImg}
                          alt="img"
                          fill
                          sizes="276px"
                          className="rounded-md object-cover"
                        />
                      </div>
                    </div>
                  </Link>
                  <div className="w-full h-[200px] mx-auto flex flex-col items-start">
                    <div className="text-[#989C9F] gap-1 text-left">
                      <InfluencerIcon />
                      <p className="truncate xl:text-[16px] xl:mb-1">
                        {review.inf_name} <span className="text-[#E7E8E9]">|</span> {review.title}
                      </p>
                    </div>
                    <p className="text-[#1B1C1D] font-medium mb-2 xl:text-[16px] xl:h-[25%] line-clamp-2 text-left">
                      {review.review_content}
                    </p>
                    <div className="flex w-[20%]">
                      {Array(Math.floor(review.review_score!))
                        .fill(1)
                        .map((_, index) => (
                          <Image key={index} src={fullStar.src} width={20} height={20} alt="fullStar" />
                        ))}
                      {review.review_score! % 1 !== 0 && (
                        <Image src={halfStar.src} width={20} height={20} alt="halfStar" />
                      )}
                    </div>
                    <p className="text-[14px] text-gray-400 text-left my-2">
                      {review.user_nickname} <span className="text-[#E7E8E9]">|</span> {formatDate(review.created_at)}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))
          )}
          {/* Swiper가 기본으로 제공하는 네비게이션 버튼 요소 */}
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </Swiper>
      </div>
    </div>
  );
}

export default ReviewList;
