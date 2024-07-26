"use client";
import { useRef, useState } from "react";
import SignUp from "../../../../components/login-signup/SignUp";
import SelectMember from "@/components/login-signup/SelectMember";

export type StepType = "회원유형" | "회원가입" | "완료";

const UrrSignUp = () => {
  const [step, setStep] = useState<StepType>("회원유형");
  const [selectUser, setSelectUser] = useState<string>("");
  const confirmRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {step === "회원유형" && (
        <SelectMember setStep={setStep} confirmRef={confirmRef} setSelectUser={setSelectUser} selectUser={selectUser} />
      )}
      {step === "회원가입" && <SignUp confirmRef={confirmRef.current?.value} selectUser={selectUser} />}
    </>
  );
};

export default UrrSignUp;
