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
    <div className="mx-auto h-[433px] px-4 pt-6 bg-[url('../../public/bgImg/influencerImg.png')] xl:bg-[url('../../public/bgImg/bestInf.png')] xl:bg-center bg-cover bg-no-repeat flex flex-col xl:flex-row w-full xl:w-[1133px] xl:h-[572px] xl:justify-between">
      <div className="xl:w-[40%] flex flex-col justify-center xl:mb-auto xl:mt-[68px] xl:mr-[185px]">
        <div className="xl:justify-start xl:ml-[100px]">
          <h1 className="font-bold mt-[4px] text-xl text-white xl:text-[28px] whitespace-nowrap xl:text-[#020303] xl:mb-2">
            현재 인기있는 인플루언서
          </h1>
          <h3 className="text-[20px] text-[#4C4F52] hidden xl:block">
            인기 많은 인플루언서와 소통하며
            <br />
            즐거운 하루를 보내봐요!
          </h3>
        </div>
      </div>
      <div className="xl:w-[60%] grid mt-3 overflow-y-auto h-[380px] xl:h-[500px] scrollbar-hide">
        {sortedInfUser.map((inf) => (
          <div
            key={inf.id}
            className="border-[1.4px] bg-[#fffffe] bg-opacity-[86%] border-[#FFFFFF] backdrop-blur-[2px] rounded-[12px] px-[10px] py-[10px] flex mb-4 min-w-[330px] h-[92px] xl:w-[484px] xl:h-[152px] items-center xl:mr-[55px]"
          >
            <div className="relative w-[80px] h-[77px] xl:w-[120px] xl:h-[120px] mr-3">
              <Image
                src={inf.profile_url || defaultImg}
                alt="인플루언서이미지"
                fill
                sizes="80px xl:w-[120px]"
                className="gradient-border object-cover"
              />
            </div>
            <div className="flex flex-col w-[60%]">
              <div className="flex">
                <p className="xl:text-[20px] font-medium truncate">
                  {inf.nickname}
                </p>
                <span className="mx-1 text-[#989C9F] font-semibold">|</span>
                <p className="xl:text-[20px] font-medium">
                  {subscriptionCounts[inf.id] !== undefined
                    ? `${subscriptionCounts[inf.id]}명`
                    : "..."}
                </p>
              </div>
              <p className="text-[#4C4F52] xl:text-[18px] font-light truncate mt-3 xl:mt-10">
                {inf.intro}
              </p>
            </div>
            <Link
              href={`influencer/profile/${inf.id}`}
              className="self-center ml-auto"
            >
              <RightArrowIcon />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
  
  
}

export default BestInfluencerList;
