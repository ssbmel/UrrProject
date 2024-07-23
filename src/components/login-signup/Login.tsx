'use client';
import { userLogin } from '@/services/users/users.service';
import { useLoginStore } from '@/zustand/store';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import Button from '../common/button/Button';

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login } = useLoginStore();
  const router = useRouter();

  const onLoginHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    if (email && password) {
      try {
        await userLogin({ email, password });
        login();
        router.push('/');
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div>
        <form className="flex flex-col border border-red-400 p-5">
          <input type="text" placeholder="아이디를 입력하세요" className="border border-black mb-1" ref={emailRef} />
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            className="border border-black"
            ref={passwordRef}
          />
          <button className="flex justify-end">비밀번호 찾기</button>
          <Button label="로그인" onClick={onLoginHandler} styleClass="bg-[#D9D9D9]" />
        </form>
      </div>
    </>
  );
}
