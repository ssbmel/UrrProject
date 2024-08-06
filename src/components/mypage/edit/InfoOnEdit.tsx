"use client";

import { FormEvent, useEffect, useState } from "react";
import InfoOnEditAddress from "./InfoOnEditAddress";
import Image from "next/image";
import { sendResetPasswordEmail, uploadProfile } from "@/services/users/account/account.service";
import { User } from "../../../../types/common";

interface Props {
  user: User;
}

const InfoOnEdit = ({ user }: Props) => {
  const [profile, setProfile] = useState<File | null>(null);

  const [userImg, setUserImg] = useState<string | null>(""); /* 해당 column에서 nullish 해제 필요  */
  const [nickname, setNickname] = useState<string>("");
  const [address, setAddress] = useState<string | null>("");
  const [name, setName] = useState<string | null>(""); /* 해당 column에서 nullish 해제 필요  */
  const [email, setEmail] = useState<string | null>(""); /* 해당 column에서 nullish 해제 필요  */
  const [phonenum, setPhonenum] = useState<string | null>();

  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isAble, setIsAble] = useState<boolean>(false);

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
    if (!e.currentTarget.files) {
      return;
    }
    const fileObj = e.currentTarget.files![0];
    setProfile(fileObj);
    const objectUrl = URL.createObjectURL(fileObj);
    setUserImg(objectUrl);
  };

  const profileUpdateHandler = async () => {
    const profileData: { userId: string; file: File } = {
      userId: user?.id,
      file: profile!
    };

    const data = await uploadProfile({ profileData });
    return data;
  };

  const updateHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!confirm("작성된 내용을 반영하시겠습니까?")) {
      return;
    }

    /* if (!nickname.trim() || !address.trim() || !name.trim() || !phonenum.trim()) {
      alert("양식의 각 항목은 비어있을 수 없습니다. ");
      return;
    } */

    /* if (profile) {
      uploadFile(postImgFile).then(img_content => {
        createPost({
          img_content,
          text_content: postContent,
          user_name: userNickname,
          user_id: user.id,
          mbti: userMbti,
        }).then(([newPost]) => {
          dispatch(addPost(newPost));
          resetImg();
          resetText();
        });
      });
      navigate("../");
      return;
    } */

    /* createPost({
      text_content: postContent,
      user_name: userNickname,
      user_id: user.id,
      mbti: userMbti,
    }).then(([newPost]) => {
      dispatch(addPost(newPost));
      resetImg();
      resetText();
    }); */
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
                priority
                fill
                sizes="100px"
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
            {/* 위의 div 태그 배경 이미지로 아이콘을 삽입한다. */}
          </div>
        </div>
        <div className="w-[150px] h-[38px] border-b-2 border-b-slate-400 flex justify-center items-center pr-[8px] pl-[8px] gap-[8px]">
          <input
            type="text"
            disabled={isAble === false}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="새 닉네임"
            className="w-full font-bold text-[20px] outline-none disabled:bg-transparent disabled:text-[#CDCFD0]"
          />
          <button onClick={() => setIsAble(!isAble)} className="p-[5px]">
            ✏️
          </button>
        </div>
      </section>
      <hr className="border-4" />
      <section className="p-[16px] pt-[24px] pb-[24px] flex flex-col gap-[20px]">
        <div className="flex flex-col gap-[8px]">
          <p className="font-bold">이메일</p>
          <input
            className="rounded-[6px] p-[4px] pr-[8px] pl-[8px] indent-[4px] h-[51px] text-[#CDCFD0] bg-[#F2F2F2]"
            type="email"
            defaultValue={email || ""}
            disabled
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <p className="font-bold">비밀번호</p>
          <div className="flex justify-between">
            <button
              onClick={changePasswordHandler}
              className="border p-[7px] pr-[14px] pl-[14px] text-[14px] rounded-[4px] text-[#0068E5]"
            >
              비밀번호 변경하기
            </button>
          </div>
        </div>
        {isClicked ? (
          <div className="text-[12px] text-[#B2B5B8]">
            가입시 등록하신 이메일로 메일이 발송되었습니다. 메일을 받지 못하셨다면{" "}
            <span className="text-[#65C917] font-bold"> 비밀번호 변경하기 </span> 버튼을 클릭하시면 메일이 재발송됩니다.
          </div>
        ) : null}
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
          <p className="font-bold">휴대폰</p>
          <input
            type="text"
            placeholder="휴대폰 번호를 입력해주세요"
            value={phonenum || ""}
            onChange={(e) => setPhonenum(e.target.value)}
            className="h-[40px] border rounded-[4px] p-[4px] pr-[8px] pl-[8px] indent-[4px]"
          />
        </div>
        <InfoOnEditAddress address={address} setAddress={setAddress} />
        <button
          onClick={updateHandler}
          className="h-[52px] p-[14px] pr-[36px] pl-[36px] text-[#FFFFFE] rounded-[8px] bg-[#1A82FF]"
        >
          완료
        </button>
      </section>
    </>
  );
};

export default InfoOnEdit;
