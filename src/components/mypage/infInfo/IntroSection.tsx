import React from "react";

const IntroSection = () => {
  /* 특정 인플루언서 유저의 id값으로 유저 정보를 취득  */

  return (
    <section className="flex justify-center items-center text-[14px] gap-[12px] pr-[16px] pl-[16px] mt-[25px] mb-[45px]">
      <div className="w-[104px] h-[104px] bg-blue-400">
        <img src="" alt="프로필이미지" />
      </div>
      <div className="min-w-[226px] h-[104px] flex flex-col justify-evenly">
        <div className="flex justify-between items-center">
          <p className="text-[20px] font-bold">닉네임</p>
          <button className="cursor-pointer">fav</button>
        </div>
        <div>
          <p>소개글</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-[1]">
            <p>icon</p>
            <p>icon</p>
          </div>
          <div className="border p-1 cursor-pointer">채팅Link</div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
