"use client";

import Image from "next/image";
import defaultImg from "../../../public/images/default.png";
import Icon from "../../../public/icon/rightArrow.svg";
import InfluencerImg from "../../../public/bgImg/influencerImg.png";
import "./style.css";

function BestInfluencerList() {
  return (
    <div className="box w-full mx-auto p-5">
      <Image 
        src={InfluencerImg} 
        alt="bgImg" 
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="absolute -z-10"
        ></Image>
      <h2 className="font-bold my-5 text-xl text-white">현재 인기 인플루언서</h2>
      <div className="w-full h-[400px] overflow-y-auto scrollbar">
        <div className="border-2 bg-[#ffffff] bg-opacity-[86%] border-[#FFFFFF] rounded-[12px] w-full min-h-[100px] mx-auto py-[10px] px-[12px] grid grid-rows-1 grid-flow-col mb-4">
          <Image src={defaultImg} alt="인플루언서이미지" width={100} className="gradient-border"/>
          <div className="grid">
            <div className="flex py-4">
              <p className="text-[16px] font-bold">우르르</p>
              <span className="mx-2">|</span>
              <p className="text-[16px] font-bold">123k</p>
            </div>
            <p className="font-light">한줄소개</p>
          </div>
          <button className="self-center ml-auto">
            <Icon />
          </button>
        </div>
        <div className="border-2 bg-[#ffffff] bg-opacity-[86%] border-[#FFFFFF] rounded-[12px] w-full min-h-[100px] mx-auto py-[10px] px-[12px] grid grid-rows-1 grid-flow-col mb-4">
          <Image src={defaultImg} alt="인플루언서이미지" width={100} className="gradient-border"/>
          <div className="grid">
            <div className="flex py-4">
              <p className="text-[16px] font-bold">우르르</p>
              <span className="mx-2">|</span>
              <p className="text-[16px] font-bold">123k</p>
            </div>
            <p className="font-light">한줄소개</p>
          </div>
          <button className="self-center ml-auto">
            <Icon />
          </button>
        </div>
        <div className="border-2 bg-[#ffffff] bg-opacity-[86%] border-[#FFFFFF] rounded-[12px] w-full min-h-[100px] mx-auto py-[10px] px-[12px] grid grid-rows-1 grid-flow-col mb-4">
          <Image src={defaultImg} alt="인플루언서이미지" width={100} className="gradient-border"/>
          <div className="grid">
            <div className="flex py-4">
              <p className="text-[16px] font-bold">우르르</p>
              <span className="mx-2">|</span>
              <p className="text-[16px] font-bold">123k</p>
            </div>
            <p className="font-light">한줄소개</p>
          </div>
          <button className="self-center ml-auto">
            <Icon />
          </button>
        </div>
        <div className="border-2 bg-[#ffffff] bg-opacity-[86%] border-[#FFFFFF] rounded-[12px] w-full min-h-[100px] mx-auto py-[10px] px-[12px] grid grid-rows-1 grid-flow-col mb-4">
          <Image src={defaultImg} alt="인플루언서이미지" width={100} className="gradient-border"/>
          <div className="grid">
            <div className="flex py-4">
              <p className="text-[16px] font-bold">우르르</p>
              <span className="mx-2">|</span>
              <p className="text-[16px] font-bold">123k</p>
            </div>
            <p className="font-light">한줄소개</p>
          </div>
          <button className="self-center ml-auto">
            <Icon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default BestInfluencerList;