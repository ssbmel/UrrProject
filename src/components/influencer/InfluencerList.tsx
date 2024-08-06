"use client";

import Image from "next/image";
import defaultImg from "../../../public/images/default.png";
import emptyImg from "../../../public/bgImg/emptyImg.png";
import { User } from "../../../types/common";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import EmptyHeartIcon from "../../../public/icon/emptyheart.svg";
import FullHeartIcon from "../../../public/icon/fullheart.svg";

function InfluencerList() {
  const [isLiked, setIsLiked] = useState(false);
  const getUserData = async () => {
    try {
      const response = await fetch("/api/auth/users/infuser/allinfuser");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const user: User[] = await data.data;
      return user;
    } catch (error) {
      console.log("Failed to fetch user data:", error);
    }
  };

  const { data: infUser } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserData()
  });

  useEffect(() => {
    getUserData();
  }, []);

  const handleHeartChange = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };

  return (
    <div className="w-full bg-[#F4F4F4] mx-auto">
      <div className="w-full min-h-[250px] h-[30%] p-4 bg-[#FFFFFE]">
        <h1 className="font-bold text-lg">내가 구독중인 인플루언서</h1>
        <div className="flex overflow-x-auto mt-5">
          <div className="flex flex-col items-center mx-auto">
            <div className="relative w-[150px] h-[100px] my-3">
              <Image src={emptyImg} alt="empty" fill sizes="100px" className="mx-auto my-5 object-cover" />
            </div>
            <p className="text-[#4C4F52] text-[16px] my-5">현재 구독중인 인플루언서가 없습니다.</p>
          </div>
        </div>
      </div>
      <div className="w-full h-[70%] p-4 my-5 bg-[#FFFFFE]">
        <h1 className="font-bold text-lg mb-3">인플루언서</h1>
        <div className="w-full gap-1 grid grid-cols-3 auto-rows-max overflow-y-auto scrollbar mx-auto">
          {infUser?.map((inf) => (
            <div key={inf.id} className="flex flex-col items-center justify-center w-[100px] text-center mx-auto">
              <div className="relative w-[120px] h-[120px] mb-2">
                <Image
                  src={inf.profile_url || defaultImg}
                  alt="img"
                  fill
                  sizes="120px"
                  className="rounded-md object-cover gradient-border"
                />
                {isLiked ? (
                  <div className="absolute bottom-1 right-2">
                    <button onClick={handleHeartChange}>
                      <FullHeartIcon />
                    </button>
                  </div>
                ) : (
                  <div className="absolute bottom-1 right-2">
                    <button onClick={handleHeartChange}>
                      <EmptyHeartIcon />
                    </button>
                  </div>
                )}
              </div>
              <p className="text-sm">{inf.nickname}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InfluencerList;
