import React from "react";

const AnnounceSection = () => {
  return (
    <section className="ml-[16px] mr-[16px] pt-[16px] pb-[20px] border-0 border-t flex flex-col gap-[20px]">
      <div className="flex justify-between">
        <h2 className="text-[18px] font-bold">공지사항</h2>
        <p className="text-[14px]">더보기 &gt;</p>
      </div>
      <ul className="flex flex-col gap-[12px]">
        <li className="flex justify-between">
          <p>
            <span className="mr-[8px]">ℹ️</span>
            <span>제목</span>
          </p>
          <span>00.00.00</span>
        </li>
        <li className="flex justify-between">
          <p>
            <span className="mr-[8px]">ℹ️</span>
            <span>제목</span>
          </p>
          <span>00.00.00</span>
        </li>
      </ul>
    </section>
  );
};

export default AnnounceSection;
