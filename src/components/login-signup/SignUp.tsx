'use client';

import { userSignUp } from '@/services/users/users.service';
import { useRef } from 'react';
import SignUpHeader from './SignUpHeader';

export default function SignUp({ confirmRef }: { confirmRef: string | undefined }) {
  const stInput = 'border border-[#D9D9D9] mb-1 h-[45px] rounded-md indent-2.5';

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);

  const onSignUpHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const nickname = nicknameRef.current?.value;
    const confirm = confirmRef;

    if (!email || !password || !nickname) {
      alert('모든 항목을 입력해주세요!');
      return;
    }

    if (email && password && nickname && confirm) {
      try {
        await userSignUp({ email, password, nickname, confirm });
      } catch (error) {
        console.log(error);
      }
    }

    // if (email && password && nickname) {
    //   try {
    //     await userSignUp({ email, password, nickname });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  };

  return (
    <>
      <div className="p-5 h-[700px]">
        <SignUpHeader />
        <form className="flex flex-col gap-9">
          <label className="flex flex-col">
            닉네임 *
            <input
              type="text"
              placeholder="닉네임
      "
              ref={nicknameRef}
              className={stInput}
            />
          </label>
          <label className="flex flex-col">
            이메일 *
            <input
              type="text"
              placeholder="asdf123@asdf.vqsd
      "
              ref={emailRef}
              className={stInput}
            />
          </label>
          <label className="flex flex-col">
            비밀번호 *
            <input
              type="password"
              placeholder="비밀번호
      "
              ref={passwordRef}
              className={stInput}
            />
          </label>
          <div className="flex">
            <button onClick={onSignUpHandler} className="bg-[#D9D9D9] w-full h-[47px] rounded-xl font-medium">
              회원가입
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
