"use client";

import Image from "next/image";
import defaultImg from "../../../public/images/default.png";
import RightArrowIcon from "../../../public/icon/rightArrow.svg";
import "./style.css";
import { User } from "../../../types/common";
import { useEffect, useState } from "react";
import Link from "next/link";

function BestInfluencerList({ infUser }: { infUser: User[] }) {
  const [subscriptionCounts, setSubscriptionCounts] = useState<{ [key: string]: number }>({});

  const getSubscribeCount = async (infuserId: string) => {
    try {
      const response = await fetch(`/api/subscribe/subscribe-count?infuser_id=${infuserId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.count;
    } catch (error) {
      console.log("Failed to fetch subscription count:", error);
      return 0;
    }
  };

  useEffect(() => {
    const fetchSubscriptionCounts = async () => {
      const counts: { [key: string]: number } = {};
      for (const inf of infUser) {
        const count = await getSubscribeCount(inf.id);
        counts[inf.id] = count;
      }
      setSubscriptionCounts(counts);
    };

    fetchSubscriptionCounts();
  }, [infUser]);

  const sortedInfUser = [...infUser].sort((a, b) => {
    const countA = subscriptionCounts[a.id] || 0;
    const countB = subscriptionCounts[b.id] || 0;
    return countB - countA;
  });

  return (
    <div className="w-full mx-auto px-4 py-8 bg-[url('../../public/bgImg/influencerImg.png')] bg-center bg-cover">
      <h2 className="font-bold mt-3 mb-5 text-xl text-white xl:text-[22px] xl:my-8">현재 인기있는 인플루언서</h2>
      <div className="xl:w-[50%] grid">
        {sortedInfUser.slice(0, 3).map((inf) => (
          <div
            key={inf.id}
            className="border-2 bg-[#ffffff] bg-opacity-[86%] border-[#FFFFFF] rounded-[12px] w-full mx-auto py-[8px] px-[10px] flex mb-4"
          >
            <div className="relative w-[90px] h-[87px] xl:w-[120px] xl:h-[120px] mr-2">
              <Image
                src={inf.profile_url || defaultImg}
                alt="인플루언서이미지"
                fill
                sizes="90px xl:120px"
                className="gradient-border object-cover"
              />
            </div>
            <div className="w-[60%] flex">
              <div className="flex flex-col">
                <div className="flex py-2">
                  <p className="text-[16px] font-bold text-left truncate">{inf.nickname}</p>
                  <span className="mx-2">|</span>
                  <p className="text-[16px] font-bold text-left truncate">
                    {subscriptionCounts[inf.id] !== undefined ? `${subscriptionCounts[inf.id]}명` : "..."}
                  </p>
                </div>
                <p className="w-[100%] text-[#989C9F] text-[14px]">{inf.intro}</p>
              </div>
            </div>
            <button className="self-center ml-auto">
              <Link href={`influencer/profile/${inf.id}`}>
                <RightArrowIcon />
              </Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BestInfluencerList;
