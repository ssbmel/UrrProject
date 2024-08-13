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

  useEffect(() => {
    const fetchSubscriptionCounts = async () => {
      const counts = await Promise.all(
        infUser.map(async (inf) => {
          const response = await fetch(`/api/subscribe/subscribe-count?infuser_id=${inf.id}`);
          if (response.ok) {
            const data = await response.json();
            return { [inf.id]: data.count };
          }
          console.error(`Failed to fetch subscription count for ${inf.id}`);
          return { [inf.id]: 0 };
        })
      );
      setSubscriptionCounts(Object.assign({}, ...counts));
    };

    fetchSubscriptionCounts();
  }, [infUser]);

  const sortedInfUser = infUser.sort((a, b) => (subscriptionCounts[b.id] || 0) - (subscriptionCounts[a.id] || 0));

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
                className="gradient-border object-cover"
              />
            </div>
            <div className="flex flex-col w-[60%]">
              <div className="flex items-center py-2">
                <p className="text-[16px] font-bold truncate">{inf.nickname}</p>
                <span className="mx-2">|</span>
                <p className="text-[16px] font-bold">
                  {subscriptionCounts[inf.id] !== undefined ? `${subscriptionCounts[inf.id]}명` : "..."}
                </p>
              </div>
              <p className="text-[#989C9F] text-[14px]">{inf.intro}</p>
            </div>
            <Link href={`influencer/profile/${inf.id}`} className="self-center ml-auto">
              <RightArrowIcon />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BestInfluencerList;
