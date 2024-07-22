'use client';

import { userSignUp } from '@/services/users/users.service';
import { useRef } from 'react';

export default function SignUp() {
  const stInput = 'border border-black';

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);

  const onSignUpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
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
      <form onSubmit={onSignUpHandler} className="flex flex-col gap-1 border border-red-400 p-5">
        <input
          type="text"
          placeholder="이메일을 입력하세요
      "
          ref={emailRef}
          className={stInput}
        />
        <input
          type="password"
          placeholder="비밀번호를 입력하세요
      "
          ref={passwordRef}
          className={stInput}
        />
        <input
          type="text"
          placeholder="닉네임을 입력하세요
      "
          ref={nicknameRef}
          className={stInput}
        />
        <button>회원가입</button>
      </form>
    </>
  );
}
