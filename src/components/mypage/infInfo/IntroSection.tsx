"use client";

import Image from "next/image";
import React from "react";
import { PublicUser } from "../../../../types/auth.type";
import SubscribeButton from "./SubscribeButton";
import StartChat from "@/components/chat/StartChat";
import Link from "next/link";
import Internet from "../../../../public/icon/internet.png";
import DefaultImage from "../../../../public/images/default.png";
import { Inter } from "next/font/google";
interface Props {
  user: PublicUser | null;
}

const IntroSection = ({ user }: Props) => {
  return (
    <section className="flex justify-start items-center text-[14px] gap-[12px] mx-[16px] mt-[25px] mb-[32px]">
      <div className="min-w-[104px] h-[104px] rounded-[16px] relative">
        <Image
          src={user?.profile_url || DefaultImage}
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
            <p className="text-[20px] font-bold">{user?.nickname || ""}</p>
            <SubscribeButton inf={user} />
          </div>
          <p className="text-[14px] h-[21px] border-r-[8px] border-r-transparent scrollbar-hide text-[#4C4F52] whitespace-nowrap overflow-x-scroll">
            {user?.intro || `안녕하세요 ${user?.nickname || ""}입니다!`}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <Link
            href={user?.account_link ? user?.account_link : "#"}
            className="w-[20px] h-[20px] flex text-[#0068E5] rounded-[4px] border relative"
          >
            <Image
              src={
                user?.account_link
                  ? `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${user.account_link}&size=32`
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
            <StartChat owner_id={user?.id!} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
