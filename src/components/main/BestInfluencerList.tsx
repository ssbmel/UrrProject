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
    <div className="mx-auto px-4 py-6 bg-[url('../../public/bgImg/influencerImg.png')] xl:bg-[url('../../public/bgImg/bestInf.png')] xl:bg-center bg-cover bg-no-repeat flex w-full xl:w-[1133px] xl:h-[572px] xl:justify-end">
      <div className="">
        <h2 className="font-bold mt-3 mb-5 text-xl text-white xl:text-[22px] xl:my-8 xl:hidden">현재 인기있는 인플루언서</h2>
        <div className="grid mt-4">
          {sortedInfUser.slice(0, 3).map((inf) => (
            <div
              key={inf.id}
              className="border-2 bg-[#ffffff] bg-opacity-[86%] border-[#FFFFFF] rounded-[12px] py-[8px] px-[10px] flex mb-4 min-w-[330px] h-[92px] xl:w-[484px] xl:h-[152px] items-center xl:mr-[55px]"
            >
              <div className="relative w-[80px] h-[77px] xl:w-[120px] xl:h-[120px] mr-2">
                <Image
                  src={inf.profile_url || defaultImg}
                  alt="인플루언서이미지"
                  fill
                  sizes="80px"
                  className="gradient-border object-cover"
                />
              </div>
              <div className="flex flex-col w-[60%]">
                <div className="flex">
                  <p className="xl:text-[20px] font-medium truncate">{inf.nickname}</p>
                  <span className="mx-2">|</span>
                  <p className="xl:text-[20px] font-medium">
                    {subscriptionCounts[inf.id] !== undefined ? `${subscriptionCounts[inf.id]}명` : "..."}
                  </p>
                </div>
                <p className="text-[#4C4F52] xl:text-[18px] font-light truncate mt-3 xl:mt-10">{inf.intro}</p>
              </div>
              <Link href={`influencer/profile/${inf.id}`} className="self-center ml-auto">
                <RightArrowIcon />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
}

export default BestInfluencerList;
