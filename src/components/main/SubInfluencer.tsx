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
          <div key={inf.id} className="flex flex-col justify-center w-[100px] text-center mx-2">
            <div className="relative w-[100px] h-[100px]">
            <Image
              src={inf?.profile_url || defaultImg}
              alt="Influencer"
              fill
              sizes="100px"
              className="gradient-border object-cover"
            />
            </div>
            <p>{inf.nickname}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubInfluencer;
