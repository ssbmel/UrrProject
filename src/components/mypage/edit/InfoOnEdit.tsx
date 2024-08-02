"use client";

import { useState } from "react";
import InfoOnEditAddress from "./InfoOnEditAddress";
import { useUserData } from "@/hooks/useUserData";

const InfoOnEdit = () => {
  const { data: user } = useUserData();

  const [address, setAddress] = useState<string>("");
  const [profile, setProfile] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phonenum, setPhonenum] = useState<string>("");

  const updateHandler = async () => {};

  return (
    <>
      <section className="flex border gap-3 items-center">
        <div className="relative">
          <img src="" alt="임시이미지" className="w-[100px] h-[100px] bg-gray-400" />
          <button className="absolute bottom-0 right-0">➕</button>
        </div>
        <input
          type="text"
          value={user?.nickname || ""}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="새 닉네임"
        />
      </section>
      <section className="border">
        <div className="border border-black bg-slate-400">
          <p>이메일</p>
          <input type="email" defaultValue={user?.email || ""} disabled />
        </div>
        <div className="border border-black bg-slate-400">
          <p>비밀번호</p>
          <input type="password" id="pw" />
          <button className="border">변경하기</button>
        </div>
        <div className="hidden">
          <div>
            <p>새 비밀번호</p>
            <input type="password" id="newPw" placeholder="새 비밀번호" />
          </div>
          <div>
            <p>새 비밀번호 확인</p>
            <input type="password" id="newPwConfirm" placeholder="새 비밀번호 확인" />
          </div>
        </div>
        <div className="border border-black bg-slate-400">
          <p>이름</p>
          <input
            type="text"
            placeholder="이름을 입력해주세요"
            value={user?.name || name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="border border-black bg-slate-400">
          <p>휴대폰</p>
          <input
            type="text"
            placeholder="휴대폰 번호를 입력해주세요"
            value={user?.phonenum || phonenum}
            onChange={(e) => setPhonenum(e.target.value)}
          />
        </div>
        <InfoOnEditAddress setAddress={setAddress} />
      </section>
      <div>
        <button>완료</button>
      </div>
    </>
  );
};

export default InfoOnEdit;
