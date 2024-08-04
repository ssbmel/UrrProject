"use client";

import Link from "next/link";
import HomeIcon from "../../../../public/icon/homeIcon.svg";
import MypageIcon from "../../../../public/icon/mypageIcon.svg";
import StoreIcon from "../../../../public/icon/storeIcon.svg";
import InfluencerIcon from "../../../../public/icon/influencerIcon.svg";
import ChatIcon from "../../../../public/icon/chatIcon.svg";

export default function BottomNav() {
  const liStyle = "flex justify-center w-16 h-7 text-sm whitespace-nowrap";

  return (
    <>
      <div className="bg-[#FAFAFF] h-[80px] w-full sticky bottom-0 shrink-0">
        <div className="flex justify-between items-center pt-2 mx-5">
          <Link href={"/"}>
            <div className={liStyle}>
              <div className="flex flex-col items-center gap-1">
                <div className="w-5">
                  <HomeIcon />
                </div>
                <p>홈</p>
              </div>
            </div>
          </Link>
          <Link href={"/mypage"}>
            <div className={liStyle}>
              <div className="flex flex-col items-center gap-1">
                <div className="w-5">
                  <MypageIcon />
                </div>
                <p>마이페이지</p>
              </div>
            </div>
          </Link>
          <Link href={"/products/list"}>
            <div className={liStyle}>
              <div className="flex flex-col items-center gap-1">
                <div className="w-5">
                  <StoreIcon />
                </div>
                <p>스토어</p>
              </div>
            </div>
          </Link>
          <Link href={"/influencer"}>
            <div className={liStyle}>
              <div className="flex flex-col items-center gap-1">
                <div className="w-5">
                  <InfluencerIcon />
                </div>
                <p>인플루언서</p>
              </div>
            </div>
          </Link>
          <Link href={"/chatlist"}>
            <div className={liStyle}>
              <div className="flex flex-col items-center gap-1">
                <div className="w-5">
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
