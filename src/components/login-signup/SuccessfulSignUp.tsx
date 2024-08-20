"use client";

import Link from "next/link";
import SignupImg from "../../../public/images/signup_img.svg";

export default function SuccessfulSignUp() {
  return (
    <>
      <div className="fixed xl:static top-0 z-50 w-[100%] bg-[white] h-[700px] p-4 box-border">
        <div className="flex flex-col justify-center items-center h-[calc(100vh-50px)] xl:h-[calc(100vh-278px)] ">
          <SignupImg />
          <h3 className="text-lg mb-2 mt-8">우르르 회원가입을 환영합니다!</h3>
          <p className="text-sm text-[#4C4F52]">회원 정보는 마이페이지에서 변경 가능합니다.</p>
          <p className="text-sm text-[#4C4F52] xl:mb-[50px]">우르르가 제공하는 다양한 서비스를 즐겨보세요!</p>
          <div className="flex justify-center w-full xl:w-[360px]">
            <Link href={"/login"} className="w-full">
              <button className="bg-primarynormal text-white h-[47px] w-[360px] rounded-xl font-medium fixed xl:static transform -translate-x-1/2 xl:translate-x-0 left-[50%] bottom-[28px]">
                시작하기
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
