import Image from "next/image";
import React from "react";
import { PublicUser } from "../../../../types/auth.type";
import SubscribeButton from "./SubscribeButton";
import StartChat from "@/components/chat/StartChat";
import YoutubeIcon from "../../../../public/icon/youtubeIcon.svg";
import InstaIcon from "../../../../public/icon/instaIcon.svg";
import Link from "next/link";
interface Props {
  user: PublicUser;
}

const IntroSection = ({ user }: Props) => {
  const { profile_url, intro, nickname, account_link, id } = user;

  let domainSrc = null;

  const domainCheck = (link: string) => {
    const YOUTUBE_DOMAIN = "youtube.com";
    const INSTAGRAM_DOMAIN = "instagram.com";

    if (link.includes(YOUTUBE_DOMAIN)) {
      domainSrc = <YoutubeIcon />;
    } else if (link.includes(INSTAGRAM_DOMAIN)) {
      domainSrc = <InstaIcon />;
    } else {
      domainSrc = "🌐";
    }
  };

  domainCheck(account_link ?? "");

  return (
    <section className="flex justify-start items-center text-[14px] gap-[12px] px-[16px] mt-[25px] mb-[45px]">
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
            <SubscribeButton inf={user} />
          </div>
          <p className="text-[14px] h-[21px] border-r-[8px] border-r-transparent scrollbar-hide text-[#4C4F52] whitespace-nowrap overflow-x-scroll">
            {intro || `안녕하세요 ${nickname}입니다!`}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <Link href={account_link || "#"} className="w-[20px] h-[20px] flex text-[#0068E5]">
            {domainSrc}
          </Link>
          <div className="">
            <StartChat owner_id={id} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
