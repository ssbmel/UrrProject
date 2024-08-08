"use client";

import { updateUserPassword } from "@/services/users/account/account.service";
import { useRouter } from "next/navigation";
import React, { FormEvent, RefObject, useRef, useState } from "react";

const UpdatePw = () => {
  const router = useRouter();
  const password = useRef<HTMLInputElement>(null);
  const cnfPassword = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const onSubmitHandler = async (e: FormEvent, password: string, cnfPassword: string) => {
    e.preventDefault();
    if (!password.trim() || !cnfPassword.trim()) {
      setErrorMsg("새 비밀번호와 새 비밀번호 확인란을 모두 입력해주세요");
      return;
    }

    if (password.length < 8) {
      setErrorMsg("비밀번호는 최소 8자리 이상으로 설정해주세요.");
      return;
    }

    if (password !== cnfPassword) {
      setErrorMsg("입력하신 새 비밀번호가 서로 일치하지 않습니다.");
      return;
    }

    if (!confirm("입력하신 비밀번호로 변경하시겠습니까?")) {
      return;
    }

    const { data, error } = await updateUserPassword(password);

    if (error?.status === 422) {
      setErrorMsg("입력하신 새 비밀번호가 기존 비밀번호와 같습니다.");
      return;
    }

    alert("비밀번호가 정상적으로 변경되었습니다.");

    router.push("/mypage");
    return;
  };

  const visibleHandler = (e: FormEvent, ref: RefObject<HTMLInputElement>) => {
    e.preventDefault();

    if (ref.current?.type === "password") {
      ref.current.type = "text";
    } else {
      ref.current!.type = "password";
    }
  };

  return (
    <form
      className="flex flex-col h-full justify-between px-[16px] py-[24px]"
      onSubmit={(e) => onSubmitHandler(e, password.current!.value, cnfPassword.current!.value)}
    >
      <div className="flex flex-col gap-[20px]">
        <div className="text-[14px] rounded-[12px] py-[12px] px-[14px] bg-[#E1EEFE] tracking-[-0.05em] flex flex-col gap-[4px]">
          <span className="font-bold text-[16px]">비밀번호 설정은 이렇게 진행해주세요!</span>
          <span>영문 대/소문자, 숫자, 특수문자를 조합하여 8자 이상</span>
        </div>
        <div className="flex flex-col gap-[8px]">
          <p className="font-bold">새 비밀번호</p>
          <div className="h-[40px] border rounded-[4px] p-[4px] pr-[8px] pl-[8px] flex justify-between items-center">
            <input
              ref={password}
              type="password"
              placeholder="새 비밀번호"
              className="indent-[4px] w-[calc(100%-39px)] outline-none"
            />
            <button onClick={(e) => visibleHandler(e, password)} className="w-[34px] p-[5px] text-[#CDCFD0]">
              👁
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-[8px]">
          <p className="font-bold">새 비밀번호 확인</p>
          <div className="h-[40px] border rounded-[4px] p-[4px] pr-[8px] pl-[8px] flex justify-between items-center">
            <input
              ref={cnfPassword}
              type="password"
              placeholder="새 비밀번호 확인"
              className="indent-[4px] w-[calc(100%-39px)] outline-none"
            />
            <button onClick={(e) => visibleHandler(e, cnfPassword)} className="w-[34px] p-[5px] text-[#CDCFD0]">
              👁
            </button>
          </div>
        </div>
        {errorMsg !== "" ? <p className="text-[12px] text-[#F03F33]">{errorMsg}</p> : null}
      </div>
      <button className="h-[52px] p-[14px] pr-[36px] pl-[36px] text-[#FFFFFE] rounded-[8px] bg-[#1A82FF]">완료</button>
    </form>
  );
};

export default UpdatePw;
