"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles.css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import banner1 from "../../../../public/bgImg/banner1.jpg";
import banner2 from "../../../../public/bgImg/banner2.jpg";
import banner3 from "../../../../public/bgImg/banner3.jpg";
import banner4 from "../../../../public/bgImg/banner4.jpg";
import banner5 from "../../../../public/bgImg/banner5.jpg";
import minibanner1 from "../../../../public/bgImg/minibanner1.jpg";
import minibanner2 from "../../../../public/bgImg/minibanner2.jpg";
import minibanner3 from "../../../../public/bgImg/minibanner3.jpg";
import minibanner4 from "../../../../public/bgImg/minibanner4.jpg";
import minibanner5 from "../../../../public/bgImg/minibanner5.jpg";

export default function Banner() {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      speed={1500}
      autoplay={{
        delay: 2500,
        disableOnInteraction: true
      }}
      pagination={{
        clickable: true
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      loop={true}
    >
      <SwiperSlide>
        <div className="xl:w-full xl:h-[800px] relative">
          <Image src={banner1} alt="mainImg" fill sizes="1920px" priority className="object-contain" />
        </div>
        <div className="w-full h-[328px] relative lg:hidden">
          <Image src={minibanner1} alt="mainImg" fill sizes="375px 328px" className="object-contain" />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="xl:w-full xl:h-[800px] relative flex items-center justify-center">
          <div className="xl:w-full xl:h-[800px] relative">
            <Image src={banner2} alt="mainImg" fill sizes="1920px" priority className="object-contain" />
          </div>
          <Link href={"/products/detail/a291eb38-cdd7-4a97-87d0-314cec358b1f"}>
            <button className="absolute bottom-[15%] right-[15%] transform translate-x-1/2 translate-y-1/2 text-[18px] text-[#0068E5] font-semibold bg-[#FFFFFE] py-[14px] px-[36px] border border-[#EAECEC] rounded-lg w-[176px] hidden xl:block">
              상품보기
            </button>
          </Link>
        </div>
        <div className="w-full h-[328px] relative lg:hidden">
          <div className="w-full h-[328px] relative lg:hidden">
            <Image src={minibanner2} alt="mainImg" fill sizes="375px 328px" className="object-contain" />
          </div>
          <Link href={"/products/detail/a291eb38-cdd7-4a97-87d0-314cec358b1f"}>
            <button className="absolute bottom-[15%] right-[17%] transform translate-x-1/2 translate-y-1/2 text-[14px] text-[#0068E5] font-semibold bg-[#FFFFFE] py-[7px] px-[16px] border border-[#EAECEC] rounded-md w-[100px]">
              상품보기
            </button>
          </Link>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="xl:w-full xl:h-[800px] relative">
          <Image src={banner3} alt="mainImg" fill sizes="1920px" priority className="object-contain" />
        </div>
        <div className="w-full h-[328px] relative lg:hidden">
          <Image src={minibanner3} alt="mainImg" fill sizes="375px 328px" className="object-contain" />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="xl:w-full xl:h-[800px] relative">
          <Image src={banner4} alt="mainImg" fill sizes="1920px" priority className="object-contain" />
        </div>
        <div className="w-full h-[328px] relative lg:hidden">
          <Image src={minibanner4} alt="mainImg" fill sizes="375px 328px" className="object-contain" />
        </div>
      </SwiperSlide>

      <SwiperSlide>
      <div className="xl:w-full xl:h-[800px] relative flex items-center justify-center">
          <div className="xl:w-full xl:h-[800px] relative">
            <Image src={banner5} alt="mainImg" fill sizes="1920px" priority className="object-contain" />
          </div>
          <Link href={"/influencer"}>
            <button className="absolute bottom-[40%] right-[31%] transform translate-x-1/2 translate-y-1/2 text-[18px] text-[#0068E5] font-semibold bg-[#FFFFFE] py-[14px] px-[36px] border border-[#EAECEC] rounded-lg w-[176px] hidden xl:block">
              채팅하기
            </button>
          </Link>
        </div>
        <div className="w-full h-[328px] relative lg:hidden">
          <div className="w-full h-[328px] relative lg:hidden">
            <Image src={minibanner5} alt="mainImg" fill sizes="375px 328px" className="object-contain" />
          </div>
          <Link href={"/influencer"}>
            <button className="absolute bottom-[40%] right-[22%] transform translate-x-1/2 translate-y-1/2 text-[14px] text-[#0068E5] font-semibold bg-[#FFFFFE] py-[7px] px-[16px] border border-[#EAECEC] rounded-md w-[100px]">
              채팅하기
            </button>
          </Link>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
