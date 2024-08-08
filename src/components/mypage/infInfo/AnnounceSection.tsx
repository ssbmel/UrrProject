import React from "react";
import { PublicUser } from "../../../../types/auth.type";

interface Props {
  user: PublicUser;
}

const AnnounceSection = ({ user }: Props) => {
  /* 사용자의 id를 받아서 작성한 공지사항을 map 한다. 근데 공지사항을 관리하는 테이블이 없음 */

  return (
    <section className="ml-[16px] mr-[16px] pt-[16px] pb-[20px] border-0 border-t flex flex-col gap-[20px]">
      <div className="flex justify-between">
        <h2 className="text-[18px] font-bold">공지사항</h2>
        <p className="text-[14px]">더보기 &gt;</p>
      </div>
      <ul className="flex flex-col gap-[12px] min-h-[68px]">
        <li className="flex justify-between items-center h-[28px]">
          <p>
            <span className="mr-[8px] p-[2px]">ⓘ</span>
            <span>제목</span>
          </p>
          <span>00.00.00</span>
        </li>
      </ul>
    </section>
  );
};

export default AnnounceSection;
