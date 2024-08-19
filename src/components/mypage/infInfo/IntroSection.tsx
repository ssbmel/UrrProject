"use client";

import Image from "next/image";
import React from "react";
import { PublicUser } from "../../../../types/auth.type";
import SubscribeButton from "./SubscribeButton";
import StartChat from "@/components/chat/StartChat";
import Link from "next/link";
import Internet from "../../../../public/icon/internet.png";
import DefaultImage from "../../../../public/images/default.png";
interface Props {
  user: PublicUser | null;
}

const IntroSection = ({ user }: Props) => {
  return (
    <section className="flex flex-col justify-center xl:justify-between items-center text-[14px] gap-[12px] xl:gap-0 mx-[16px] mt-[25px] mb-[32px] xl:w-[1132px] xl:h-[278px] xl:my-0 xl:mx-auto xl:shadow-md xl:rounded-[24px]">
      <div className="xl:block hidden h-[25px] w-full bg-contain indent-[-99999px] bg-[url('../../public/images/lineBg.png')] rounded-t-[24px]">
        데스크탑용배경
      </div>
      <div className="flex justify-between items-center w-full xl:w-[calc(100%-72px)] xl:mx-[36px]">
        <div className="w-[104px] h-[104px] xl:w-[156px] xl:h-[156px] rounded-[16px] relative">
          <Image
            src={user?.profile_url || DefaultImage}
            alt="profile_image"
            sizes="104px xl:156px"
            fill
            priority
            className="absolute w-[104px] h-[104px] xl:w-[156px] xl:h-[156px] border border-transparent p-[4px] object-cover gradient-border"
          />
        </div>
        <div className="w-[calc(100%-116px)] xl:w-[calc(100%-172px)] flex flex-col justify-between gap-[11px] xl:gap-[51px]">
          <div className="flex flex-col">
            <div className="flex w-full justify-between items-center xl:justify-start xl:gap-[8px] h-[38px]">
              <p className="text-[20px] font-[700]">{user?.nickname || ""}</p>
              <SubscribeButton inf={user} />
            </div>
            <p className="text-[14px] xl:text-[18px] h-[21px] border-r-[8px] border-r-transparent scrollbar-hide text-[#4C4F52] whitespace-nowrap overflow-x-scroll">
              {user?.intro || `안녕하세요 ${user?.nickname || ""}입니다!`}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <Link
              href={user?.account_link ? user?.account_link : "#"}
              className="w-[20px] h-[20px] xl:w-[28px] xl:h-[28px] flex text-[#0068E5] rounded-[4px] border relative"
            >
              <Image
                src={
                  user?.account_link
                    ? `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${user.account_link}&size=32`
                    : Internet
                }
                alt="domain_favicon"
                fill
                sizes="20px xl:28px"
                priority
                className="object-cover p-[1px]"
              />
            </Link>
            <div>
              <StartChat owner_id={user?.id!} />
            </div>
          </div>
        </div>
      </div>
      <div className="xl:block hidden h-[25px] w-full bg-contain indent-[-99999px] bg-[url('../../public/images/lineBg.png')] rounded-b-[24px]">
        데스크탑용배경
      </div>
    </section>
  );
};

export default IntroSection;
