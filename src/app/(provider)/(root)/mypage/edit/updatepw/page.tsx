"use client";

import { updateUserPassword } from "@/services/users/account/account.service";
import { useRouter } from "next/navigation";
import React, { FormEvent, useRef, useState } from "react";

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

    console.log(data);
    console.log(error);

    if (error?.status === 422) {
      setErrorMsg("입력하신 새 비밀번호가 기존 비밀번호와 같습니다.");
      return;
    }

    alert("비밀번호가 정상적으로 변경되었습니다.");

    router.push("/mypage");
    return;
  };

  return (
    <form
      className="flex flex-col h-full justify-between px-[16px] py-[24px]"
      onSubmit={(e) => onSubmitHandler(e, password.current!.value, cnfPassword.current!.value)}
    >
      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-col gap-[8px]">
          <p className="font-bold">새 비밀번호</p>
          <div className="h-[40px] border rounded-[4px] p-[4px] pr-[8px] pl-[8px] flex justify-between items-center">
            <input
              ref={password}
              type="password"
              placeholder="새 비밀번호"
              className="indent-[4px] w-[calc(100%-39px)] outline-none"
            />
            <button className="w-[34px] p-[5px] text-[#CDCFD0]">👁</button>
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
            <button className="w-[34px] p-[5px] text-[#CDCFD0]">👁</button>
          </div>
        </div>
        {errorMsg !== "" ? <p className="text-[12px] text-[#F03F33]">{errorMsg}</p> : null}
      </div>
      <button className="h-[52px] p-[14px] pr-[36px] pl-[36px] text-[#FFFFFE] rounded-[8px] bg-[#1A82FF]">완료</button>
    </form>
  );
};

export default UpdatePw;
