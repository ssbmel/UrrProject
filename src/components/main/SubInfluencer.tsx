"use client";

import Image from "next/image";
import defaultImg from "../../../public/images/default.png";
import { useUserData } from "@/hooks/useUserData";

function SubInfluencer() {
  const { data: user } = useUserData();

  return (
    <div className="w-full h-[200px] mx-auto p-5">
      <div className="flex mb-5">
        <h2 className="font-bold text-xl">내가 구독한 인플루언서</h2>
      </div>
      <div className="flex p-2 overflow-x-auto flex-nowrap scrollbar">
        <div className="flex flex-col justify-center flex-shrink-0 w-[100px] text-center">
          {/* {user.map((u)=>(
            <div key={u.id}>
              <Image src={defaultImg} alt="Influencer" width={100} height={100} />
              <p>{u.nickname}</p>
            </div>
          ))} */}
          <Image src={defaultImg} alt="Influencer" width={100} height={100} className="gradient-border"/>
          <p>인플루언서</p>
        </div>
      </div>
    </div>
  );
}

export default SubInfluencer;
