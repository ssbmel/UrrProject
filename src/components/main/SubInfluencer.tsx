"use client";

import Image from "next/image";
import defaultImg from "../../../public/images/default.png";
import { User } from "../../../types/common";

function SubInfluencer({ infUser }: { infUser: User[] }) {
  
  return (
    <div className="w-full h-[200px] mx-auto p-5">
      <h2 className="font-bold text-xl mb-5">내가 구독한 인플루언서</h2>
      <div className="flex flex-row p-1 overflow-x-auto flex-nowrap scrollbar">
        {infUser.map((inf) => (
          <div key={inf.id} className="flex flex-col justify-center w-[100px] text-center mr-[18px]">
            <div className="relative w-[100px] h-[100px] mb-[8px]">
            <Image
              src={inf?.profile_url || defaultImg}
              alt="Influencer"
              fill
              sizes="100px"
              className="gradient-border object-cover"
            />
            </div>
            <p className="text-[#4C4F52] font-medium">{inf.nickname}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubInfluencer;
