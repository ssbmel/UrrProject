"use client";

import Image from "next/image";
import defaultImg from "../../../public/images/default.png";
import { InfSubscribe, User } from "../../../types/common";
import { useEffect, useState } from "react";
import { useUserData } from "@/hooks/useUserData";
import EmptyHeartIcon from "../../../public/icon/emptyheart.svg";
import FullHeartIcon from "../../../public/icon/fullheart.svg";
import Link from "next/link";

function SubInfluencer({ infUser }: { infUser: User[] }) {
  const { data: user } = useUserData();
  const [subscribeIds, setSubscribeIds] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      getSubscribeData();
    }
  }, [user]);

  const getSubscribeData = async () => {
    try {
      if (!user) return;

      const response = await fetch(`/api/subscribe?user_id=${user.id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSubscribeIds(data.map((d: InfSubscribe) => d.infuser_id));
    } catch (error) {
      console.log("Failed to fetch subscription data:", error);
    }
  };

  return (
    <div className="w-full h-[220px] xl:h-auto px-4 py-8">
      <h2 className="font-bold text-xl mb-5 xl:text-[22px] xl:my-8">내가 구독한 인플루언서</h2>
      <div className="flex flex-row overflow-x-auto flex-nowrap scrollbar">
        {subscribeIds.length === 0 ? (
          <p className="text-[#4C4F52] text-[16px] h-[142px] mx-auto mt-6 whitespace-nowrap">구독중인 인플루언서가 없습니다.</p>
        ) : (
          <div className="w-full flex overflow-x-auto gap-[3px] xl:gap-10 scrollbar-hide">
            {infUser?.filter(inf => subscribeIds.includes(inf.id)).map((inf) => (
              <div
                key={inf.id}
                className="flex-shrink-0 flex flex-col items-center justify-center text-center w-[100px] xl:w-[150px]"
              >
                <Link href={`influencer/profile/${inf.id}`}>
                  <div className="relative w-[85px] h-[85px] xl:w-[150px] xl:h-[150px] mb-2">
                    <Image
                      src={inf.profile_url || defaultImg}
                      alt="img"
                      fill
                      sizes="85px xl:150px"
                      className="rounded-md object-cover gradient-border"
                    />
                    <div className="absolute bottom-1 right-2">
                      {subscribeIds.includes(inf.id) ? (
                        <button>
                          <FullHeartIcon />
                        </button>
                      ) : (
                        <button>
                          <EmptyHeartIcon />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-[#4C4F52] mb-6 truncate xl:text-[16px]">{inf.nickname}</p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  
  
}

export default SubInfluencer;
