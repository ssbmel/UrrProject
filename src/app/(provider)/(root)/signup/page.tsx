"use client";
import { useRef, useState } from "react";
import SignUp from "../../../../components/login-signup/SignUp";
import SelectMember from "@/components/login-signup/SelectMember";
import SuccessfulSignUp from "@/components/login-signup/SuccessfulSignUp";

export type StepType = "회원유형" | "회원가입" | "완료";

const UrrSignUp = () => {
  const [step, setStep] = useState<StepType>("회원유형");
  const [selectUser, setSelectUser] = useState<string>("");
  const confirmRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="absolute w-full">
        {step === "회원유형" && (
          <SelectMember
            setStep={setStep}
            confirmRef={confirmRef}
            setSelectUser={setSelectUser}
            selectUser={selectUser}
          />
        )}
        {step === "회원가입" && (
          <SignUp setStep={setStep} confirmRef={confirmRef.current?.value} selectUser={selectUser} />
        )}
        {step === "완료" && <SuccessfulSignUp />}
      </div>
    </>
  );
};

export default UrrSignUp;
