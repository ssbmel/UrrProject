"use client";

import Image from "next/image";
import defaultImg from "../../../public/images/default.png";
import emptyImg from "../../../public/bgImg/emptyImg.png";
import { Product } from "../../../types/common";
import { useEffect } from "react";

function InfluencerList() {
  const getUserData = async () => {
    const response = await fetch("/api/auth/users/infuser/allinfuser");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Product[] = await response.json();
    console.log(data);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="w-full h-svh p-5">
      <div className="w-full min-h-[250px] h-[30%] p-2">
        <h1 className="font-bold text-lg">내가 구독중인 인플루언서</h1>
        <div className="flex overflow-x-auto mt-5">
          <div className="flex flex-col items-center mx-auto">
            <Image src={emptyImg} alt="empty" width={130} className="mx-auto my-5"></Image>
            <p className="text-[#4C4F52] text-[16px] mx-auto">현재 구독중인 인플루언서가 없습니다.</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="w-full h-[70%] p-2 my-5">
        <h1 className="font-bold text-lg">전체 인플루언서</h1>
        <div className="w-full grid grid-cols-3 gap-3">
          <div className="w-[1/3] text-center mt-2 overflow-y-auto">
            <Image src={defaultImg} alt="" width={120} className="gradient-border" />
            <p className="my-2 text-sm">인플루언서</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfluencerList;
