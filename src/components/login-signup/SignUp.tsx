"use client";

import { emailCheck, userSignUp } from "@/services/users/users.service";
import { Dispatch, SetStateAction, useState } from "react";
import { nicknameCheck } from "@/services/users/users.service";
import { StepType } from "@/app/(provider)/(root)/signup/page";
import WebSignupBg2 from "../../../public/images/web_signup_bg2.svg";

interface SignUpProps {
  confirmRef: string | undefined;
  selectUser: string;
  setStep: Dispatch<SetStateAction<StepType>>;
}

export default function SignUp({ confirmRef, selectUser, setStep }: SignUpProps) {
  const stInput = "border border-[#D9D9D9] mb-1 h-[45px] rounded-md indent-2.5 outline-none";
  const stLabel = "text-xs text-destructive mt-[8px]";

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // 오류메세지 상태 저장
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState<string>("");
  const [nicknameConfirmMessage, setNicknameConfirmMessage] = useState<string>("");
  const [emailConfirmMessage, setEmailConfirmMessage] = useState<string>("");

  // 유효성 검사
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);
  const [isNicknameConfirm, setIsNicknameConfirm] = useState<boolean>(false);
  const [isEmailConfirm, setIsEmailConfirm] = useState<boolean>(false);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSignUpHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const confirm = confirmRef;

    if (!email || !password || !nickname) {
      swal("모든 항목을 입력해주세요!");
      return;
    }

    setIsSubmitting(true);

    if (selectUser === "인플루언서") {
      if (email && password && nickname && confirm) {
        try {
          await userSignUp({ email, password, nickname, confirm, selectUser, approve: false });
          setStep("완료");
        } catch (error) {
          swal("회원가입 실패");
          console.log(error);
        }
      }
    } else {
      if (email && password && nickname) {
        try {
          const response = await userSignUp({ email, password, nickname, selectUser, approve: false });
          setStep("완료");
        } catch (error) {
          swal("회원가입 실패");
          console.log(error);
        }
      }
    }
  };

  // 닉네임 중복확인
  const onChangeNicknameCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const nicknameCurrent = e.target.value;

    setNickname(nicknameCurrent);

    if (nicknameCurrent) {
      const overlapNickname = await nicknameCheck(nicknameCurrent);

      if (overlapNickname.length !== 0) {
        setNicknameConfirmMessage("이미 사용중인 닉네임입니다");
        setIsNicknameConfirm(false);
      } else {
        setNicknameConfirmMessage("");
        setIsNicknameConfirm(true);
      }
    }
  };

  // 이메일 유효성검사
  const onChangeEmail = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (!emailRegex.test(emailCurrent)) {
      setEmailConfirmMessage("이메일 형식을 다시 확인해주세요");
      setIsEmailConfirm(false);
    } else {
      const overlapEmail = await emailCheck(emailCurrent);

      if (overlapEmail.length !== 0) {
        setEmailConfirmMessage("이미 사용중인 이메일입니다");
        setIsEmailConfirm(false);
      } else {
        setEmailConfirmMessage("");
        setIsEmailConfirm(true);
      }
    }
  };

  // 비밀번호
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage("숫자,영문자,특수문자 포함 8자리 이상 입력해주세요!");
      setIsPassword(false);
    }

    if (passwordRegex.test(passwordCurrent)) {
      setPasswordMessage("");
      setIsPassword(true);
    }
  };

  // 비밀번호 확인
  const onChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordConfirmCurrent = e.target.value;
    setConfirmPassword(passwordConfirmCurrent);

    if (password !== passwordConfirmCurrent) {
      setConfirmPasswordMessage("비밀번호가 일치하지 않습니다.");
      setIsPasswordConfirm(false);
    }

    if (password === passwordConfirmCurrent) {
      setConfirmPasswordMessage("");
      setIsPasswordConfirm(true);
    }
  };

  return (
    <>
      <div className="xl:flex xl:flex-row">
        <div className="hidden xl:block bg-cover bg-center">
          <WebSignupBg2 className="max-w-full max-h-full" />
        </div>

        <div className="flex flex-col justify-between h-[calc(100vh-52px)] xl:h-[783px] w-[375px] mx-auto whitespace-nowrap pt-[58px] p-4">
          <h2 className="hidden xl:block text-[24px] font-bold text-center mb-[32px]">회원가입</h2>
          <form className="flex flex-col gap-9">
            <div>
              <label className="flex flex-col">
                닉네임
                <input type="text" placeholder="닉네임" onChange={onChangeNicknameCheck} className={stInput} />
                <p className={stLabel}>{nicknameConfirmMessage}</p>
              </label>
            </div>
            {/* <p className="bg-[#F4F4F4] h-2"></p> 보류 */}

            <label className="flex flex-col">
              이메일
              <input type="text" placeholder="이메일" onChange={onChangeEmail} className={stInput} />
              <p className={stLabel}>{emailConfirmMessage}</p>
            </label>

            <label className="flex flex-col">
              비밀번호
              <input type="password" onChange={onChangePassword} placeholder="비밀번호" className={stInput} />
              <p className={stLabel}>{passwordMessage}</p>
            </label>

            <label className="flex flex-col">
              비밀번호 확인
              <input
                type="password"
                onChange={onChangeConfirmPassword}
                placeholder="비밀번호 확인"
                className={stInput}
              />
              <p className={stLabel}>{confirmPasswordMessage}</p>
            </label>
          </form>

          <div className="flex sticky bottom-0 mb-7">
            <button
              onClick={onSignUpHandler}
              disabled={isSubmitting || !(isEmailConfirm && isNicknameConfirm && isPassword && isPasswordConfirm)}
              className={`${
                isEmailConfirm && isNicknameConfirm && isPassword && isPasswordConfirm
                  ? "bg-primarynormal text-white"
                  : "bg-[#F2F2F2] text-[#CDCFD0]"
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
