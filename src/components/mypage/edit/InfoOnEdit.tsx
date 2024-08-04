"use client";

import { useEffect, useState } from "react";
import InfoOnEditAddress from "./InfoOnEditAddress";
import { useUserData } from "@/hooks/useUserData";

const InfoOnEdit = () => {
  const { data: user } = useUserData();

  const [profile, setProfile] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState("");

  const [nickname, setNickname] = useState<string>(user?.nickname);
  const [address, setAddress] = useState<string>("");
  const [name, setName] = useState<string>(user?.name);
  const [email, setEmail] = useState<string>(user?.email);
  const [phonenum, setPhonenum] = useState<string>(user?.phonenum);

  const [isClicked, setIsClicked] = useState<boolean>(false);

  const updateHandler = async () => {};

  const changePasswordHandler = async () => {
    setIsClicked(!isClicked);
  };

  const [isAble, setIsAble] = useState<boolean>(false);

  /* const handleImageChange = (e) => {
    const fileObj = e.target.files[0];
    setProfile(fileObj);
    const objectUrl = URL.createObjectURL(fileObj);
    imgObj.current = objectUrl;
    setPreviewUrl(objectUrl);
  }; */

  return (
    <>
      <section className="flex flex-col gap-[18px] items-center mt-[44px] mb-[20px]">
        <div className="relative">
          <img src="" alt="임시이미지" className="w-[100px] h-[100px] bg-gray-400 rounded-[16px]" />
          <div className="absolute bottom-[-7px] right-[-7px] w-[38px] h-[38px] rounded-full border text-center border-white bg-[#E1EEFE] flex justify-center items-center">
            <input type="file" accept="image/*" className="w-full h-full opacity-0" />
            {/* 위의 div 태그 배경 이미지로 아이콘을 삽입한다. */}
          </div>
        </div>
        <div className="w-[150px] h-[38px] border-b-2 border-b-slate-400 flex justify-center items-center pr-[8px] pl-[8px] gap-[8px]">
          <input
            type="text"
            disabled={isAble === false}
            defaultValue={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="새 닉네임"
            className="w-full font-bold text-[20px] outline-none"
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
            defaultValue={email}
            disabled
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <p className="font-bold">비밀번호</p>
          <div className="flex justify-between">
            <div className="h-[40px] border rounded-[4px] flex justify-between items-center p-[4px] pr-[8px] pl-[8px] w-[calc(100%-96px)]">
              <input type="password" id="pw" className="w-[calc(100%-39px)] indent-[4px]" />
              <button className="w-[34px] p-[5px] text-[#CDCFD0]">👁</button>
            </div>
            <button
              onClick={changePasswordHandler}
              className="border p-[7px] pr-[14px] pl-[14px] text-[14px] rounded-[4px] text-[#0068E5]"
            >
              변경하기
            </button>
          </div>
        </div>
        {isClicked ? (
          <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col gap-[8px]">
              <p className="font-bold">새 비밀번호</p>
              <div className="h-[40px] border rounded-[4px] p-[4px] pr-[8px] pl-[8px] flex justify-between items-center">
                <input
                  type="password"
                  id="newPw"
                  placeholder="새 비밀번호"
                  className="indent-[4px] w-[calc(100%-39px)]"
                />
                <button className="w-[34px] p-[5px] text-[#CDCFD0]">👁</button>
              </div>
            </div>
            <div className="flex flex-col gap-[8px]">
              <p className="font-bold">새 비밀번호 확인</p>
              <div className="h-[40px] border rounded-[4px] p-[4px] pr-[8px] pl-[8px] flex justify-between items-center">
                <input
                  type="password"
                  id="newPwConfirm"
                  placeholder="새 비밀번호 확인"
                  className="indent-[4px] w-[calc(100%-39px)]"
                />
                <button className="w-[34px] p-[5px] text-[#CDCFD0]">👁</button>
              </div>
            </div>
          </div>
        ) : null}
        <div className="flex flex-col gap-[8px]">
          <p className="font-bold">이름</p>
          <input
            type="text"
            placeholder="이름을 입력해주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-[40px] border rounded-[4px] p-[4px] pr-[8px] pl-[8px] indent-[4px]"
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <p className="font-bold">휴대폰</p>
          <input
            type="text"
            placeholder="휴대폰 번호를 입력해주세요"
            value={phonenum}
            onChange={(e) => setPhonenum(e.target.value)}
            className="h-[40px] border rounded-[4px] p-[4px] pr-[8px] pl-[8px] indent-[4px]"
          />
        </div>
        <InfoOnEditAddress setAddress={setAddress} />
        <button className="h-[52px] p-[14px] pr-[36px] pl-[36px] text-[#FFFFFE] rounded-[8px] bg-[#1A82FF]">
          완료
        </button>
      </section>
    </>
  );
};

export default InfoOnEdit;
