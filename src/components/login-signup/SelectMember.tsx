"use client";

import { StepType } from "@/app/(provider)/(root)/signup/page";
import { Dispatch, RefObject, SetStateAction } from "react";
import PageTitleHeader from "../common/header/PageTitleHeader";

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
      <div className="p-5 h-[700px]">
        <PageTitleHeader title={"회원가입"} />

        <div className="flex flex-col justify-center h-24">
          <h4 className="text-lg font-medium mb-1">어떤 회원으로 서비스를 이용하실건가요?</h4>
          <p className="text-sm text-[#575757]">인플루언서라면 유튜브, 인스타 계정을 통해 인증해야합니다.</p>
        </div>
        {selectUser === "인플루언서" ? (
          <div className="flex flex-col mb-5 display">
            <p className="text-sm">링크 또는 계정 아이디</p>
            <input
              type="text"
              className="h-[51px] border border-[#D9D9D9] rounded-md"
              placeholder="asdf123@asdf.vqsd"
              ref={confirmRef}
            />
          </div>
        ) : (
          <div></div>
        )}

        <div className="flex gap-4 mb-3">
          <button
            onClick={infChooseMember}
            className={`${
              selectUser === "인플루언서" ? "bg-[#1A82FF] text-white" : "text-[#0068E5] border border-[#1A82FF]"
            } w-[166px] h-[88px] text-lg rounded-xl font-medium`}
          >
            인플루언서
          </button>
          <button
            onClick={nextSignUpPage} // 인플루언서 버튼이 눌리면 비활성화
            className={`${
              selectUser === "인플루언서"
                ? "bg-[#F2F2F2] border border-[##DADDDD] text-[#CDCFD0]"
                : "text-[#0068E5] border border-[#1A82FF]"
            } w-[166px] h-[88px] text-lg rounded-xl font-medium`}
          >
            일반
          </button>
        </div>

        <div className="flex">
          <button
            onClick={infNextSignUpPage}
            className={`${
              selectUser === "인플루언서" ? "bg-[#1A82FF] text-white" : "bg-[#F2F2F2] text-[#CDCFD0]"
            } w-full h-[47px] rounded-xl font-medium`}
          >
            다음
          </button>
        </div>
      </div>
    </>
  );
}
