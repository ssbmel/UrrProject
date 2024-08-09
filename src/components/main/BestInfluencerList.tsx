"use client";

import Image from "next/image";
import defaultImg from "../../../public/images/default.png";
import RightArrowIcon from "../../../public/icon/rightArrow.svg";
import InfluencerImg from "../../../public/bgImg/influencerImg.png";
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
    <div className="w-full mx-auto p-5 h-[550px] bg-[url('../../public/bgImg/influencerImg.png')]">
      <h2 className="font-bold my-5 text-xl text-white">현재 인기 인플루언서</h2>
      <div className="w-full h-[450px]">
        {sortedInfUser.slice(0, 3).map((inf) => (
          <Link key={inf.id} href={`influencer/profile/${inf.id}`}>
            <div className="border-2 bg-[#ffffff] bg-opacity-[86%] border-[#FFFFFF] rounded-[12px] w-full min-h-[100px] mx-auto py-[10px] px-[12px] flex mb-4">
              <div className="relative min-w-[100px] h-[100px] mr-2">
                <Image
                  src={inf.profile_url || defaultImg}
                  alt="인플루언서이미지"
                  fill
                  sizes="100px"
                  className="gradient-border object-cover"
                />
                
              </div>
              <div className="flex">
                <div className="flex flex-col">
                  <div className="flex py-4">
                    <p className="text-[16px] font-bold text-left">{inf.nickname}</p>
                    <span className="mx-2">|</span>
                    <p className="text-[16px] font-bold text-left">
                      {subscriptionCounts[inf.id] !== undefined ? `${subscriptionCounts[inf.id]}명` : "Loading..."}
                    </p>
                  </div>
                  <p className="w-[100%] text-[#989C9F]">{inf.intro}</p>
                </div>
              </div>
              <button className="self-center ml-auto">
                <RightArrowIcon />
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BestInfluencerList;
