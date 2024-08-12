"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import InfoOnEditAddress from "./InfoOnEditAddress";
import Image from "next/image";
import {
  getProfile,
  patchUserFromUserId,
  sendResetPasswordEmail,
  uploadProfile
} from "@/services/users/account/account.service";
import { User } from "../../../../types/common";
import { nicknameCheck } from "@/services/users/users.service";
import { useRouter } from "next/navigation";
import WriteIcon from "../../../../public/icon/writeIcon.svg";

interface Props {
  user: User;
}

const InfoOnEdit = ({ user }: Props) => {
  const router = useRouter();

  const [profile, setProfile] = useState<File | null>(null);

  const [userImg, setUserImg] = useState<string | null>(""); /* 해당 column에서 nullish 해제 필요  */
  const [nickname, setNickname] = useState<string>("");
  const [address, setAddress] = useState<string | null>("");
  const [name, setName] = useState<string | null>(""); /* 해당 column에서 nullish 해제 필요  */
  const [email, setEmail] = useState<string | null>(""); /* 해당 column에서 nullish 해제 필요  */
  const [phonenum, setPhonenum] = useState<string | null>();

  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isAble, setIsAble] = useState<boolean>(false);

  const [errorMsg, setErrorMsg] = useState<string>("");

  const nicknameRef = useRef<HTMLInputElement>(null);

  const nicknameUnable =
    "h-[38px] border-b-2 border-b-[#CDCFD0] flex justify-center items-center pr-[8px] pl-[8px] gap-[8px]";
  const nicknameAble =
    "h-[38px] border-b-2 border-b-[#0068E5] flex justify-center items-center pr-[8px] pl-[8px] gap-[8px]";

  useEffect(() => {
    setUserImg(user?.profile_url);
    setNickname(user?.nickname);
    setAddress(user?.address);
    setName(user?.name);
    setEmail(user?.email);
    setPhonenum(user?.phonenum);
  }, []);

  const changePasswordHandler = async () => {
    setIsClicked(true);
    await sendResetPasswordEmail(email!);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg("");

    if (!e.currentTarget.files) {
      setErrorMsg("프로필 이미지 처리중 문제가 발생했습니다. 다시 시도하세요");
      return;
    }

    const fileObj = e.currentTarget.files[0];

    const fileType = fileObj.type;

    if (!fileType.includes("image")) {
      setErrorMsg("프로필 이미지에는 이미지 파일(JPG,JPEG,GIF,PNG 등)만 적용 가능합니다.");
      return;
    }

    const objectUrl = URL.createObjectURL(fileObj);
    setUserImg(objectUrl);

    setProfile(fileObj);
  };

  const applyProfileImg = async (fileObj: File) => {
    const data = await uploadImgFile(fileObj, user.id);

    const params = {
      userId: user.id,
      filePath: data?.path!
    };

    const imgUrl = await getProfile(params);

    return imgUrl;
  };

  const uploadImgFile = async (file: File, userId: string) => {
    const profileData = { file, userId };
    const data = await uploadProfile({ profileData });
    return data;
  };

  function phonenumCheck(phonenum: string) {
    const regex = /^(01[016789]{1})-?[0-9]{4}-?[0-9]{4}$/;
    return regex.test(phonenum);
  }

  const validCheck = async () => {
    if (!nickname.trim()) {
      setErrorMsg("닉네임을 입력해주세요");
      return false;
    } else {
      const duplicateData = await nicknameCheck(nickname);
      if (duplicateData.length !== 0 && duplicateData[0]?.nickname !== user.nickname) {
        console.log(duplicateData[0]?.nickname, user.nickname);
        setErrorMsg("이미 사용중인 닉네임입니다");
        return false;
      }
    }

    if (phonenum && phonenum?.length > 0) {
      if (!phonenumCheck(phonenum)) {
        setErrorMsg("올바른 형식의 휴대전화 번호를 입력해주세요");
        return false;
      }
    }

    if (name && name.length > 0) {
      if (!isNaN(+name)) {
        setErrorMsg("올바른 형식의 이름을 입력해주세요");
        return false;
      }
      if (name.length < 2) {
        setErrorMsg("이름은 두 글자 이상이여야 합니다.");
        return false;
      }
    }

    return true;
  };

  const updateHandler = async (e: FormEvent, profile: File | null) => {
    e.preventDefault();

    let image = null;

    const signal = await validCheck();

    if (signal === false) {
      return;
    }

    if (!confirm("작성된 내용을 적용하시겠습니까?")) {
      return;
    } else {
    }

    if (user.profile_url === userImg) {
      image = user.profile_url;
    } else {
      image = await applyProfileImg(profile!);
    }

    const editUserData = {
      id: user.id,
      nickname,
      profile_url: image,
      address,
      phonenum: phonenum!,
      name
    };

    const data = await patchUserFromUserId(editUserData);

    alert("개인정보가 업데이트되었습니다.");

    router.push("/mypage");
  };

  return (
    <>
      <section className="flex flex-col gap-[18px] items-center mt-[44px] mb-[20px]">
        <div className="relative">
          {userImg && (
            <div className="w-[100px] h-[100px] rounded-[16px] relative shadow-md">
              <Image
                src={userImg || ""}
                alt="profile_image"
                sizes="100px"
                fill
                priority
                className="absolute rounded-[16px] overflow-hidden"
              />
            </div>
          )}
          <div className="absolute bottom-[-7px] right-[-7px] w-[38px] h-[38px] rounded-full text-center  bg-[#E1EEFE] bg-[url('../../public/icon/cameraIcon.png')] bg-no-repeat bg-center bg-[length:24px_24px] flex justify-center items-center">
            <input
              onChange={(e) => handleImageChange(e)}
              type="file"
              accept="image/*"
              className="w-full h-full opacity-0 cursor-pointer file:cursor-pointer"
            />
          </div>
        </div>
        <div className={isAble ? nicknameAble : nicknameUnable}>
          <input
            type="text"
            ref={nicknameRef}
            disabled={isAble === false}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임"
            className="indent-[7px] font-bold text-[20px] w-[80px] outline-none disabled:bg-transparent disabled:text-[#CDCFD0]"
          />
          <button
            onClick={() => {
              setIsAble(true);
              nicknameRef.current?.focus();
            }}
            className=""
          >
            <WriteIcon />
          </button>
        </div>
      </section>
      <hr className="border-4" />
      <section className="p-[16px] pt-[24px] pb-[24px] flex flex-col gap-[20px]">
        <div className="text-[14px] rounded-[12px] py-[12px] px-[14px] bg-[#E1EEFE] tracking-[-0.05em]">
          <b>이름</b>, <b>전화번호</b>, <b>주소</b>는 배송시 필요한 정보이므로
          <br />
          입력해두시는 것을 권장드립니다.
        </div>
        <div className="flex flex-col gap-[8px]">
          <p className="font-bold">이메일</p>
          <input
            className="rounded-[6px] p-[4px] pr-[8px] pl-[8px] indent-[4px] h-[51px] text-[#CDCFD0] bg-[#F2F2F2]"
            type="email"
            defaultValue={email || ""}
            disabled
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-[8px]">
            <p className="font-bold">비밀번호</p>
            <button
              onClick={changePasswordHandler}
              className="border px-[12px] py-[4px] text-[14px] rounded-[4px] text-[#0068E5]"
            >
              변경하기
            </button>
          </div>
          <div className="text-[12px] text-[#B2B5B8] font-[300] tracking-[-0.05em]">
            {isClicked ? (
              <div className="text-[#2267CE] flex gap-[4px] items-start">
                <p className="align-top">ⓘ</p>
                <span>
                  비밀번호 재설정 메일이 발송되었습니다.
                  <br />
                  메일을 받지 못하셨다면 ‘변경하기’ 버튼을 한 번 더 눌러주세요.
                </span>
              </div>
            ) : (
              <div className="text-[#989C9F] flex gap-[4px]">
                <p>ⓘ</p>
                <span>
                  비밀번호 변경을 원하시면 ‘변경하기’ 버튼을 눌러주세요.
                  <br />
                  가입하신 이메일로 비밀번호 재설정 링크 메일이 발송됩니다.
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-[8px]">
          <p className="font-bold">이름</p>
          <input
            type="text"
            placeholder="이름을 입력해주세요"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
            className="h-[40px] border rounded-[4px] p-[4px] pr-[8px] pl-[8px] indent-[4px]"
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <p className="font-bold">전화번호</p>
          <input
            maxLength={13}
            type="text"
            placeholder="ex) 01X-XXXX-XXXX"
            value={phonenum || ""}
            onChange={(e) =>
              setPhonenum(
                e.target.value
                  .replace(/[^0-9]/g, "")
                  .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
                  .replace(/(\-{1,2})$/g, "")
              )
            }
            className="h-[40px] border rounded-[4px] p-[4px] pr-[8px] pl-[8px] indent-[4px]"
          />
        </div>
        <InfoOnEditAddress address={address ? address.split(",") : ""} setAddress={setAddress} />
        <div className="flex flex-col gap-[20px]">
          {errorMsg !== "" && <p className="text-[12px] text-[#F03F33] font-semibold">{`ⓘ ${errorMsg}`}</p>}
          <button
            onClick={(e) => updateHandler(e, profile)}
            disabled={
              userImg === user.profile_url &&
              nickname === user.nickname &&
              address === user.address &&
              name === user.name &&
              phonenum === user.phonenum
            }
            className="h-[52px] p-[14px] pr-[36px] pl-[36px] text-[#FFFFFE] rounded-[8px] bg-[#1A82FF] disabled:bg-[#F2F2F2] disabled:text-[#CDCFD0]"
          >
            완료
          </button>
        </div>
      </section>
    </>
  );
};

export default InfoOnEdit;
