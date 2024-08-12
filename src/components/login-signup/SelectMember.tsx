"use client";

import { StepType } from "@/app/(provider)/(root)/signup/page";
import WebLoginBg from "../../../public/images/web_login_bg.svg";
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
      <div className="xl:flex xl:flex-row">
        <div className="hidden xl:flex xl:w-[50%] xl:bg-cover xl:bg-center ">
          <WebLoginBg className="xl:max-w-full xl:max-h-full" />
        </div>

        <div className="flex flex-col justify-between h-screen xl:h-[783px] w-[375px] mx-auto p-4">
          <div>
            <h2 className="hidden xl:block text-[28px] font-bold text-center mb-[32px]">회원가입</h2>
            <div className="flex flex-col justify-center h-24">
              <h3 className="text-xl font-medium mb-1">어떤 회원으로 서비스를 이용하실건가요?</h3>
              <p className="text-sm text-[#575757] mb-[36px]">
                인플루언서라면 유튜브, 인스타 계정을 통해 인증해야합니다.
              </p>
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
                  selectUser === "인플루언서"
                    ? "bg-primarynormal text-white"
                    : "text-primarystrong border border-[#1A82FF]"
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

          <div className="pb-[28px] w-full mb-7">
            <button
              onClick={infNextSignUpPage}
              className={`${
                selectUser === "인플루언서" ? "bg-primarynormal text-white" : "bg-[#F2F2F2] text-[#CDCFD0]"
              } w-full h-[47px] rounded-xl font-medium`}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
