"use client";

import { updateUserPassword } from "@/services/users/account/account.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, RefObject, useEffect, useRef, useState } from "react";
import swal from "sweetalert";
import EyeIcon from "../../../../../../../public/icon/eye.svg";

const UpdatePw = () => {
  const router = useRouter();
  const password = useRef<HTMLInputElement>(null);
  const cnfPassword = useRef<HTMLInputElement>(null);
  const [pwState, setPwState] = useState<string>("");
  const [pwSecurity, setPwSecurity] = useState<string>("[&>*:nth-child(-n+0)]:bg-transparent");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
  const securityDefault = "bg-[#F2F2F2] w-[24%] rounded-[4px] indent-[-99999px]";

  const securityCheckHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pw = e.target.value;
    setPwState(pw);

    if (!passwordRegex.test(pw)) {
      setPwSecurity("[&>*:nth-child(-n+1)]:bg-red-100");
    }
    if (pw.length < 12 && pw.length >= 8) {
      setPwSecurity("[&>*:nth-child(-n+2)]:bg-primarylight");
    }
    if (pw.length < 16 && pw.length >= 12) {
      setPwSecurity("[&>*:nth-child(-n+3)]:bg-primarynormal");
    }
    if (pw.length < 20 && pw.length >= 16) {
      setPwSecurity("[&>*:nth-child(-n+4)]:bg-primarystrong");
    }
  };

  const onSubmitHandler = async (e: FormEvent, password: string, cnfPassword: string) => {
    e.preventDefault();
    if (!password.trim() || !cnfPassword.trim()) {
      setErrorMsg("새 비밀번호와 새 비밀번호 확인란을 모두 입력해주세요");
      return;
    }

    if (!passwordRegex.test(password)) {
      setErrorMsg("비밀번호는 숫자, 영문자, 특수문자 포함 8자리 이상이여야 합니다.");
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

    swal("비밀번호가 정상적으로 변경되었습니다.");

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
      className="flex flex-col h-[calc(100vh)] xl:w-[440px] xl:h-[722px] xl:rounded-[12px] bg-[#FFFFFE] xl:mx-auto xl:border xl:py-[42px] xl:px-[32px] justify-between px-[16px] py-[24px] xl:static w-full absolute top-0 left-0 z-50"
      onSubmit={(e) => onSubmitHandler(e, password.current!.value, cnfPassword.current!.value)}
    >
      <div className="flex flex-col gap-[36px]">
        <div className="flex justify-between items-center">
          <h2 className="text-[20px] font-[700]">비밀번호 변경</h2>
          <Link
            href={"/mypage/edit"}
            className="bg-[url('../../public/icon/close.png')] bg-contain w-[32px] h-[32px]"
          ></Link>
        </div>
        <div className="xl:text-[18px] rounded-[12px] p-[16px] bg-[#E1EEFE] tracking-[-0.05em] flex flex-col gap-[12px]">
          <span className="font-bold">비밀번호 설정은 이렇게 진행해주세요!</span>
          <span>영문 대/소문자, 숫자, 특수문자를 조합하여 8자 이상</span>
        </div>
        <div className="flex flex-col gap-[8px]">
          <p className="font-bold">새 비밀번호</p>
          <div className="h-[40px] border rounded-[4px] p-[4px] pr-[8px] pl-[8px] flex justify-between items-center">
            <input
              ref={password}
              value={pwState}
              onChange={securityCheckHandler}
              type="password"
              placeholder="새 비밀번호"
              className="indent-[4px] w-[calc(100%-39px)] outline-none"
            />
            <button onClick={(e) => visibleHandler(e, password)} className="w-[32px] text-[#CDCFD0]">
              <EyeIcon color="#CDCFD0" />
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
            <button onClick={(e) => visibleHandler(e, cnfPassword)} className="w-[32px] text-[#CDCFD0]">
              <EyeIcon color="#CDCFD0" />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-[8px]">
          <p className="font-bold">비밀번호 안정성</p>
          <div className="h-[40px] rounded-[4px] flex justify-between items-center">
            <ul className={`flex justify-between w-full ${pwSecurity}`}>
              <li className={securityDefault}>1</li>
              <li className={securityDefault}>2</li>
              <li className={securityDefault}>3</li>
              <li className={securityDefault}>4</li>
            </ul>
          </div>
        </div>
        {errorMsg !== "" ? <p className="text-[12px] text-[#F03F33]">{errorMsg}</p> : null}
      </div>
      <button className="h-[52px] p-[14px] px-[36px] text-[#FFFFFE] rounded-[8px] bg-[#1A82FF]">완료</button>
    </form>
  );
};

export default UpdatePw;
