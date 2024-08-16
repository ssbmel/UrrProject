"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles.css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import banner1 from "../../../../public/bgImg/banner1.png";
import banner2 from "../../../../public/bgImg/banner2.png";
import banner3 from "../../../../public/bgImg/banner3.png";
import banner4 from "../../../../public/bgImg/banner4.png";
import banner5 from "../../../../public/bgImg/banner5.png";
import minibanner1 from "../../../../public/bgImg/minibanner1.png";
import minibanner2 from "../../../../public/bgImg/minibanner2.png";
import minibanner3 from "../../../../public/bgImg/minibanner3.png";
import minibanner4 from "../../../../public/bgImg/minibanner4.png";
import minibanner5 from "../../../../public/bgImg/minibanner5.png";

export default function Banner() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper xl:w-full xl:h-[900px] w-full h-[328px]"
      >
        <SwiperSlide>
        <div className="xl:w-full xl:h-[900px] relative hidden xl:block">
            <Image src={banner1} alt="mainImg" fill sizes="1280px" priority className="object-contain" />
          </div>
          <div className="w-full h-[328px] relative xl:hidden ">
            <Image src={minibanner1} alt="mainImg" fill sizes="375px 328px" className="object-contain" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="xl:w-full xl:h-[900px] relative">
            <Link href={"products/detail/a291eb38-cdd7-4a97-87d0-314cec358b1f"}>
              <Image src={banner2} alt="mainImg" fill sizes="1280px" priority className="object-contain" />
            </Link>
          </div>
          <div className="w-full h-[328px] relative xl:hidden">
            <Link href={"products/detail/a291eb38-cdd7-4a97-87d0-314cec358b1f"}>
              <Image src={minibanner2} alt="mainImg" fill sizes="375px 328px" className="object-contain" />
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="xl:w-full xl:h-[900px] relative">
            <Image src={banner3} alt="mainImg" fill sizes="1280px" priority className="object-contain" />
          </div>
          <div className="w-full h-[328px] relative xl:hidden">
            <Image src={minibanner3} alt="mainImg" fill sizes="375px 328px" className="object-contain" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="xl:w-full xl:h-[900px] relative">
            <Image src={banner4} alt="mainImg" fill sizes="1280px" priority className="object-contain" />
          </div>
          <div className="w-full h-[328px] relative xl:hidden">
            <Image src={minibanner4} alt="mainImg" fill sizes="375px 328px" className="object-contain" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="xl:w-full xl:h-[900px] relative">
            <Link href={"/influencer"}>
              <Image src={banner5} alt="mainImg" fill sizes="1280px" priority className="object-contain" />
            </Link>
          </div>
          <div className="w-full h-[328px] relative xl:hidden">
            <Link href={"/influencer"}>
              <Image src={minibanner5} alt="mainImg" fill sizes="375px 328px" className="object-contain" />
            </Link>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}