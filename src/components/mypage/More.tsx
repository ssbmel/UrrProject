"use client";

import React from "react";
import XIcon from "../../../public/icon/XIcon.svg";

interface Props {
  isClicked: boolean;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const More = ({ isClicked, setIsClicked }: Props) => {
  const closeWithBg = () => {
    setIsClicked(false);
  };
  return (
    <div
      className={`${isClicked ? "block" : "hidden"} fixed top-0 left-0 bg-[#3436378C] w-full h-full xl:shadow-2xl z-50`}
    >
      <div className="absolute xl:top-1/2 xl:left-1/2 w-full h-full xl:w-[700px] xl:h-[600px] xl:ml-[-350px] xl:mt-[-300px] bg-[#fffffe] xl:shadow-md xl:rounded-[24px] flex flex-col justify-between p-[24px]">
        <div className="flex justify-between">
          <h3 className="text-[20px] font-[700]">더보기(여기는 동적 타이틀이 들어온다)</h3>
          <button onClick={closeWithBg}>
            <XIcon />
          </button>
        </div>
        <section className="xl:h-[500px]">여기는 추가로 로드되는 내용이 들어온다 useInfiniteQuery</section>
      </div>
    </div>
  );
};

export default More;
