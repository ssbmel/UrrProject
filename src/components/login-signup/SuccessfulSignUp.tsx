"use client";

import Link from "next/link";
import SignupImg from "../../../public/images/signup_img.svg";

export default function SuccessfulSignUp() {
  return (
    <>
      <div className="h-[783px]">
        <div className="flex flex-col justify-center items-center h-screen xl:h-[783px]">
          <SignupImg />
          <h3 className="text-lg mb-2 mt-8">우르르 회원가입을 환영합니다!</h3>
          <p className="text-sm text-[#4C4F52]">회원 정보는 마이페이지에서 변경 가능합니다.</p>
          <p className="text-sm text-[#4C4F52]">우르르가 제공하는 다양한 서비스를 즐겨보세요!</p>

          <div className="flex justify-center pb-7 px-5 w-[360px] xl:hidden">
            <Link href={"/login"} className="w-full">
              <button className="bg-primarynormal text-white h-[47px] w-full rounded-xl font-medium sticky bottom-0">
                시작하기
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
