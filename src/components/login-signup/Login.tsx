"use client";

import { userLogin } from "@/services/users/users.service";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import Image from "next/image";
import logo from "../../../public/logo/URR_logo.png";
import Link from "next/link";

export default function Login() {
  const stInput = "border border-[#D9D9D9] mb-1 h-[45px] rounded-md indent-2.5";

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const onLoginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    if (email && password) {
      try {
        await userLogin({ email, password });
        router.push("/mypage/1"); // 녕수님 push하면 바꾸기
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col p-5 h-[700px]">
        <div className="flex justify-center items-center h-[35%]">
          <Image src={logo} alt="URR 로고 이미지" width={134} height={65} />
        </div>

        <form onSubmit={onLoginHandler} className="flex flex-col h-[40%]">
          <input type="text" placeholder="이메일" className={stInput} ref={emailRef} />
          <input type="password" placeholder="비밀번호" className={stInput} ref={passwordRef} />
          <button className="flex justify-end mb-4">비밀번호 찾기</button>
          <button type="submit" className="bg-[#D9D9D9] h-[50px] rounded-md text-lg">
            로그인하기
          </button>
        </form>

        <div className="flex flex-col items-center h-[25%]">
          <button className="bg-[#FEDF32] w-full h-[50px] rounded-md mb-8 text-lg">카카오로 시작하기</button>
          <div className="flex">
            <p>아직 회원이 아니신가요?</p>
            <Link href={"/signup"}>
              <p className="font-medium underline underline-offset-2 ml-1">회원가입</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
