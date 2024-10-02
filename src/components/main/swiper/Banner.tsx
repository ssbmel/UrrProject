"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles.css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import banner1 from "../../../../public/bgImg/banner1.jpg";
import banner2 from "../../../../public/bgImg/banner2.jpg";
import banner3 from "../../../../public/bgImg/banner3.jpg";
import minibanner1 from "../../../../public/bgImg/minibanner1.jpg";
import minibanner2 from "../../../../public/bgImg/minibanner2.jpg";
import minibanner3 from "../../../../public/bgImg/minibanner3.jpg";

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
        <div className="xl:w-full xl:h-[900px] relative">
          <Image src={banner1} alt="mainImg" fill sizes="(min-width:768px) 50vw 100vw" priority className="object-cover" />
        </div>
        <div className="w-full h-[328px] relative xl:hidden">
          <Image src={minibanner1} alt="mainImg" fill sizes="375px 328px" className="object-contain" />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="xl:w-full relative">
            <div className="xl:w-full xl:h-[900px] relative">
              <Image src={banner2} alt="mainImg" fill sizes="(min-width:768px) 50vw 100vw" priority className="object-contain" />
            </div>
        </div>

        <div className="w-full relative xl:hidden">
            <div className="w-full h-[328px] relative xl:hidden">
              <Image src={minibanner2} alt="mainImg" fill sizes="375px 328px" className="object-contain" />
            </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="xl:w-full xl:h-[900px] relative">
          <Image src={banner3} alt="mainImg" fill sizes="(min-width:768px) 50vw 100vw" priority className="object-cover" />
        </div>
        <div className="w-full h-[328px] relative xl:hidden">
          <Image src={minibanner3} alt="mainImg" fill sizes="375px 328px" className="object-contain" />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
