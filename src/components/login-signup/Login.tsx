"use client";

import { userLogin } from "@/services/users/users.service";
import { useRef } from "react";
import Image from "next/image";
import logo from "../../../public/logo/URR_logo.png";
import Link from "next/link";
import { createClient } from "../../../supabase/client";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const stInput = "border border-[#D9D9D9] mb-1 h-[45px] rounded-md indent-2.5";
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }
    try {
      const response = await userLogin({ email, password });
      window.location.href = "/mypage";
    } catch (error) {
      console.log(error);
    }
  };

  // 카카오 로그인
  const kakaoLoginHandler = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        // redirectTo: "http://localhost:3000/api/auth/callback"
        redirectTo: "https://urr-final.vercel.app/api/auth/callback"
      }
    });
    if (error) {
      console.log("카카오 로그인 실패");
    }
    if (data) {
      console.log(data);
    }
  };

  return (
    <>
      <div className="flex flex-col p-5 h-[700px]">
        <div className="flex justify-center items-center h-[35%]">
          <Image src={logo} alt="URR 로고 이미지" width={134} height={65} />
        </div>

        <form onSubmit={loginHandler} className="flex flex-col h-[40%]">
          <input type="text" placeholder="이메일" className={stInput} ref={emailRef} />
          <input type="password" placeholder="비밀번호" className={stInput} ref={passwordRef} />
          {/* <button className="flex justify-end mb-4">비밀번호 찾기</button> */}
          <div className="mb-[40px]"></div>
          <button type="submit" className="bg-[#1A82FF] text-white h-[50px] rounded-md text-lg">
            로그인하기
          </button>
        </form>

        <div className="flex flex-col items-center h-[25%]">
          <button onClick={kakaoLoginHandler} className="bg-[#FEDF32] w-full h-[50px] rounded-md mb-8 text-lg">
            카카오 로그인
          </button>
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
};

export default Login;
