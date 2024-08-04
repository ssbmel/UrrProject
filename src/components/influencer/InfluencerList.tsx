"use client";

import Image from "next/image";
import defaultImg from "../../../public/images/default.png";
import emptyImg from "../../../public/bgImg/emptyImg.png";
import { User } from "../../../types/common";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

function InfluencerList() {
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
        <h1 className="font-bold text-lg mb-3">전체 인플루언서</h1>
        <div className="w-full gap-3 grid grid-cols-3 auto-rows-max overflow-y-auto scrollbar mx-auto">
          {infUser?.map((inf) => (
            <div key={inf.id} className="flex flex-col items-center justify-center w-[100px] text-center mx-auto">
              <div className="relative w-[100px] h-[100px] mb-2">
                <Image
                  src={inf.profile_url || defaultImg}
                  alt="img"
                  fill
                  sizes="100px"
                  className="rounded-md object-cover gradient-border"
                />
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
