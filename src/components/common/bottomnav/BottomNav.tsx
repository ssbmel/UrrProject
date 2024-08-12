"use client";

import Link from "next/link";
import HomeIcon from "../../../../public/icon/homeIcon.svg";
import MypageIcon from "../../../../public/icon/mypageIcon.svg";
import StoreIcon from "../../../../public/icon/storeIcon.svg";
import InfluencerIcon from "../../../../public/icon/influencerIcon.svg";
import ChatIcon from "../../../../public/icon/chatIcon.svg";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();
  const liStyle = "font-[600] flex justify-center px-[6px] w-[44px] text-[14px] whitespace-nowrap transition-colors";

  if (
    (pathname.startsWith("/chatlist/") && pathname.split("/").length === 3) ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup")
  ) {
    return null;
  }

  return (
    <>
      <div className="bg-[#FAFAFF] pb-[42px] h-[93px] pt-[8px] w-full sticky bottom-0 shrink-0">
        <div className="flex justify-between items-center mx-[20px]">
          <Link href={"/"}>
            <div className={liStyle}>
              <div className="flex flex-col items-center px-[6px]">
                <div className="p-[6px]">
                  <HomeIcon />
                </div>
                <p>홈</p>
              </div>
            </div>
          </Link>

          <Link href={"/mypage"}>
            <div className={liStyle}>
              <div className="flex flex-col items-center gap-[4px] px-[6px]">
                <div className="p-[6px]">
                  <MypageIcon />
                </div>
                <p>마이페이지</p>
              </div>
            </div>
          </Link>

          <Link href={"/products/list"}>
            <div className={liStyle}>
              <div className="flex flex-col items-center gap-[4px] px-[6px]">
                <div className="p-[6px]">
                  <StoreIcon />
                </div>
                <p>스토어</p>
              </div>
            </div>
          </Link>

          <Link href={"/influencer"}>
            <div className={liStyle}>
              <div className="flex flex-col items-center gap-[4px] px-[6px]">
                <div className="p-[6px]">
                  <InfluencerIcon />
                </div>
                <p>인플루언서</p>
              </div>
            </div>
          </Link>

          <Link href={"/chatlist"}>
            <div className={liStyle}>
              <div className="flex flex-col items-center gap-[4px] px-[6px]">
                <div className="p-[6px]">
                  <ChatIcon />
                </div>
                <p>채팅</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
