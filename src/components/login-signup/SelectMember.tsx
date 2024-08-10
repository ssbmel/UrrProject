"use client";

import { StepType } from "@/app/(provider)/(root)/signup/page";
import { Dispatch, RefObject, SetStateAction } from "react";

interface SelectMemberProps {
  setStep: Dispatch<SetStateAction<StepType>>;
  confirmRef: RefObject<HTMLInputElement>;
  setSelectUser: Dispatch<SetStateAction<string>>;
  selectUser: string;
}

export default function SelectMember({ setStep, confirmRef, setSelectUser, selectUser }: SelectMemberProps) {
  const infNextSignUpPage = () => {
    if (!confirmRef.current?.value) {
      alert("정보를 입력하세요!");
    }

    if (confirmRef.current?.value) {
      setStep("회원가입");
    }
  };

  const nextSignUpPage = () => {
    setStep("회원가입");
  };

  const infChooseMember = () => {
    setSelectUser("인플루언서");
  };

  return (
    <>
      {/* 높이 안주면 하단 적용안됨 적용하면 망했음 ;; */}
      <div className="h-screen w-[375px] mx-auto">
        <div className="flex flex-col justify-center h-24">
          <h4 className="text-lg font-medium mb-1">어떤 회원으로 서비스를 이용하실건가요?</h4>
          <p className="text-sm text-[#575757] mb-[36px]">인플루언서라면 유튜브, 인스타 계정을 통해 인증해야합니다.</p>
        </div>
        {selectUser === "인플루언서" ? (
          <div className="flex flex-col display mb-[60px]">
            <p className="text-sm">링크 또는 계정 아이디</p>
            <input
              type="text"
              className="h-[51px] border border-[#D9D9D9] rounded-md indent-3 outline-none"
              placeholder="링크 또는 계정 아이디"
              ref={confirmRef}
            />
          </div>
        ) : (
          <div></div>
        )}

        <div className="flex justify-between mb-3">
          <button
            onClick={infChooseMember}
            className={`${
              selectUser === "인플루언서" ? "bg-primarynormal text-white" : "text-primarystrong border border-[#1A82FF]"
            } w-[166px] h-[88px] text-lg rounded-xl font-medium`}
          >
            인플루언서
          </button>
          <button
            onClick={nextSignUpPage}
            disabled={selectUser === "인플루언서"}
            className={`${
              selectUser === "인플루언서"
                ? "bg-[#F2F2F2] border border-[##DADDDD] text-[#CDCFD0]"
                : "text-primarystrong border border-primarynormal"
            } w-[166px] h-[88px] text-lg rounded-xl font-medium`}
          >
            일반
          </button>
        </div>
      </div>

      <div className="pb-[28px] sticky bottom-0 mb-7 p-5">
        <button
          onClick={infNextSignUpPage}
          className={`${
            selectUser === "인플루언서" ? "bg-primarynormal text-white" : "bg-[#F2F2F2] text-[#CDCFD0]"
          } w-full h-[47px] rounded-xl font-medium`}
        >
          다음
        </button>
      </div>
    </>
  );
}
