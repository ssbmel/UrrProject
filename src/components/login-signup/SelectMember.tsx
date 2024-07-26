'use client';

import { StepType } from '@/app/(provider)/(root)/signup/page';
import { Dispatch, RefObject, SetStateAction } from 'react';
import SignUpHeader from './SignUpHeader';

interface SelectMemberProps {
  setStep: Dispatch<SetStateAction<StepType>>;
  confirmRef: RefObject<HTMLInputElement>;
  setSelectUser: Dispatch<SetStateAction<boolean>>;
}

export default function SelectMember({ setStep, confirmRef, setSelectUser }: SelectMemberProps) {
  const stSelectButton = 'w-[166px] h-[88px] bg-[#D9D9D9] rounded-xl font-medium';

  const infnextSignUpPage = () => {
    if (!confirmRef.current?.value) {
      alert('정보를 입력하세요!');
    }

    if (confirmRef.current?.value) {
      setStep('회원가입');
    }
  };

  const nextSignUpPage = () => {
    setSelectUser(true);
    setStep('회원가입');
  };

  return (
    <>
      <div className="p-5 h-[700px]">
        <SignUpHeader />

        <div className="flex flex-col justify-center h-24">
          <h4 className="text-lg font-medium mb-1">어떤 회원으로 서비스를 이용하실건가요?</h4>
          <p className="text-sm text-[#575757]">인플루언서라면 유튜브, 인스타 계정을 통해 인증해야합니다.</p>
        </div>

        <div className="flex flex-col mb-5 display">
          <p className="text-sm">링크 또는 계정 아이디</p>
          <input
            type="text"
            className="h-[51px] border border-[#D9D9D9] rounded-md"
            placeholder="asdf123@asdf.vqsd"
            ref={confirmRef}
          />
        </div>

        <div className="flex gap-4 mb-3">
          <button className={stSelectButton}>인플루언서</button>
          <button onClick={nextSignUpPage} className={stSelectButton}>
            일반
          </button>
        </div>

        <div className="flex">
          <button onClick={infnextSignUpPage} className="bg-[#D9D9D9] w-full h-[47px] rounded-xl font-medium">
            다음
          </button>
        </div>
      </div>
    </>
  );
}