'use client';

import { userSignUp } from '@/services/users/users.service';
import { useRef } from 'react';

export default function Home() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const nickname = nicknameRef.current?.value;

    if (!email || !password || !nickname) {
      alert('모든 항목을 입력해주세요!');
      return;
    }

    if (email && password && nickname) {
      try {
        await userSignUp({ email, password, nickname });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className="flex flex-col gap-1 w-[300px] border border-red-400 p-5">
        <input
          type="text"
          placeholder="이메일을 입력하세요
      "
          ref={emailRef}
          className="border border-black"
        />
        <input
          type="password"
          placeholder="비밀번호를 입력하세요
      "
          ref={passwordRef}
          className="border border-black"
        />
        <input
          type="text"
          placeholder="닉네임을 입력하세요
      "
          ref={nicknameRef}
          className="border border-black"
        />
        <button>회원가입</button>
      </form>
    </>
  );
}
