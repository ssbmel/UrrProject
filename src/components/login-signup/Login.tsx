'use client';

import { userLogin } from '@/services/users/users.service';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import Button from '../common/button/Button';
import { userDataStore } from '@/zustand/store';
import Image from 'next/image';
import logo from '../../../public/logo/URR_logo.png';

export default function Login() {
  const stInput = 'border border-[#D9D9D9] mb-1 h-[45px] rounded-md indent-2.5';

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { setUserInfo, userInfo } = userDataStore();

  const onLoginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    if (email && password) {
      try {
        const data = await userLogin({ email, password });
        setUserInfo(data.user);
        router.push('/mypage/1');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col p-5 h-svh border border-red-500">
        <div className="bg-gray-200 h-[30%] flex justify-center items-center">
          <Image src={logo} alt="URR 로고 이미지" width={134} height={65} />
        </div>

        <form onSubmit={onLoginHandler} className="flex flex-col bg-red-200 h-[35%]">
          <input type="text" placeholder="이메일" className={stInput} ref={emailRef} />
          <input type="password" placeholder="비밀번호" className={stInput} ref={passwordRef} />
          <button className="flex justify-end mb-4">비밀번호 찾기</button>
          <Button type="submit" label="로그인하기" styleClass="bg-[#D9D9D9] h-[50px] rounded-md text-lg" />
        </form>
        <div className="flex flex-col items-center bg-sky-200 h-[20%]">
          <Button label="카카오로 시작하기" styleClass="bg-[#FEDF32] w-full h-[50px] rounded-md mb-8 text-lg" />
          <p>
            아직 회원이 아니신가요? <span className="font-medium underline underline-offset-2">회원가입</span>
          </p>
        </div>
      </div>
    </>
  );
}
