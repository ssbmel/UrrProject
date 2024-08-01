"use client";
import Image from "next/image";
import Link from "next/link";
import homeIcon from "../../../../public/icon/homeIcon.png";
import mypageIcon from "../../../../public/icon/mypageIcon.png";
import storeIcon from "../../../../public/icon/storeIcon.png";
import influencerIcon from "../../../../public/icon/influencerIcon.png";
import chatIcon from "../../../../public/icon/chatIcon.png";

export default function BottomNav() {
  const liStyle = "flex justify-center w-16 h-7 text-sm whitespace-nowrap";

  return (
    <>
      <div className="bg-[#FAFAFF] h-[80px] w-full sticky bottom-0 shrink-0">
        <div className="flex justify-between items-center pt-2 mx-5">
          <Link href={"/"}>
            <div className={liStyle}>
              <div className="flex flex-col items-center gap-1">
                <Image src={homeIcon} alt="홈" />
                <p>홈</p>
              </div>
            </div>
          </Link>
          <Link href={"/mypage"}>
            <div className={liStyle}>
              <div className="flex flex-col items-center gap-1">
                <Image src={mypageIcon} alt="마이페이지" />
                <p>마이페이지</p>
              </div>
            </div>
          </Link>
          <Link href={"/products/list"}>
            <div className={liStyle}>
              <div className="flex flex-col items-center gap-1">
                <Image src={storeIcon} alt="스토어" />
                <p>스토어</p>
              </div>
            </div>
          </Link>
          <Link href={"/influencer"}>
            <div className={liStyle}>
              <div className="flex flex-col items-center gap-1">
                <Image src={influencerIcon} alt="인플루언서" />
                <p>인플루언서</p>
              </div>
            </div>
          </Link>
          <div className={liStyle}>
            <div className="flex flex-col items-center gap-1">
              <Image src={chatIcon} alt="채팅" />
              <p>채팅</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
