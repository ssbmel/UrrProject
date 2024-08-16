"use client";

import Image from "next/image";
import React from "react";
import { PublicUser } from "../../../../types/auth.type";
import SubscribeButton from "./SubscribeButton";
import StartChat from "@/components/chat/StartChat";
import Link from "next/link";
import Internet from "../../../../public/icon/internet.png";
interface Props {
  user: PublicUser;
}

const IntroSection = ({ user }: Props) => {
  const { profile_url, intro, nickname, account_link, id } = user;

  return (
    <section className="flex justify-start items-center text-[14px] gap-[12px] mx-[16px] mt-[25px] mb-[32px]">
      <div className="min-w-[104px] h-[104px] rounded-[16px] relative">
        <Image
          src={profile_url || ""}
          alt="profile_image"
          sizes="104px"
          fill
          priority
          className="absolute border border-transparent p-[4px] object-cover gradient-border"
        />
      </div>
      <div className="w-[calc(100%-116px)] flex flex-col justify-between gap-[11px]">
        <div className="flex flex-col">
          <div className="flex w-full justify-between items-center h-[38px]">
            <p className="text-[20px] font-bold">{nickname || ""}</p>
            <SubscribeButton inf={user!} />
          </div>
          <p className="text-[14px] h-[21px] border-r-[8px] border-r-transparent scrollbar-hide text-[#4C4F52] whitespace-nowrap overflow-x-scroll">
            {intro || `안녕하세요 ${nickname}입니다!`}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <Link
            href={account_link || "#"}
            className="w-[20px] h-[20px] flex text-[#0068E5] rounded-[4px] border relative"
          >
            <Image
              src={
                account_link
                  ? `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${account_link}&size=32`
                  : Internet
              }
              alt="domain_favicon"
              fill
              sizes="20px"
              priority
              className="object-cover p-[1px]"
            />
          </Link>
          <div>
            <StartChat owner_id={id} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
