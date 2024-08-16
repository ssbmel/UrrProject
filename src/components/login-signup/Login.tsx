"use client";

import { userLogin } from "@/services/users/users.service";
import { useRef } from "react";
import Image from "next/image";
import logo from "../../../public/logo/URR_logo.png";
import LoginBar from "../../../public/images/login_bar.png";
import Kakao from "../../../public/logo/Logo_kakao.png";
import WebLoginBg from "../../../public/images/web_login_bg.svg";
import Link from "next/link";
import { createClient } from "../../../supabase/client";
import { useRouter } from "next/navigation";

const Login = () => {
  const stInput = "border border-[#D9D9D9] mb-1 h-[45px] rounded-md indent-2.5";
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

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
      // router.replace("/mypage");
    } catch (error) {
      alert("아이디와 비빌번호를 확인해주세요.");
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
      <div className="xl:flex xl:flex-row">
        <div className="hidden xl:block xl:bg-cover xl:bg-center">
          <WebLoginBg className="xl:max-w-full xl:max-h-full" />
        </div>

        <div className="flex flex-col h-[700px] w-[375px] mx-auto xl:justify-center p-4">
          <div className="flex justify-center items-center h-[31%] xl:hidden">
            <Image src={logo} alt="URR 로고 이미지" width={134} height={65} />
          </div>
          <h2 className="hidden xl:block text-[24px] font-bold mx-auto mb-[43px]">로그인</h2>

          <form onSubmit={loginHandler} className="flex flex-col h-[39%]">
            <input type="text" placeholder="이메일" className={stInput} ref={emailRef} />
            <input type="password" placeholder="비밀번호" className={stInput} ref={passwordRef} />
            <div className="mb-[62px]"></div>
            <button type="submit" className="bg-[#1A82FF] text-white h-[50px] rounded-md text-lg">
              로그인하기
            </button>
          </form>

          <Image src={LoginBar} alt="or" className="mb-[36px]" />

          <div className="flex flex-col items-center h-[25%]">
            <div className="flex justify-center bg-[#FEDF32] w-full h-[50px] rounded-md mb-8 text-lg cursor-pointer">
              <div className="h-[20px] w-[20px] relative flex items-center my-auto mr-1">
                <Image src={Kakao} alt="카카오톡 로고" layout="fill" objectFit="cover" />
              </div>
              <button onClick={kakaoLoginHandler}>카카오 로그인</button>
            </div>
            <div className="flex">
              <p>아직 회원이 아니신가요?</p>
              <Link href={"/signup"}>
                <p className="font-medium underline underline-offset-2 ml-1">회원가입</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
