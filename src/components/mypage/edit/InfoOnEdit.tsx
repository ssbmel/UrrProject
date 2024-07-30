"use client";

import InfoOnEditAddress from "./InfoOnEditAddress";
import { useUserData } from "@/hooks/useUserData";

const InfoOnEdit = () => {
  const { data: user } = useUserData();

  return (
    <>
      <section className="flex border gap-3 items-center">
        <div className="relative">
          <div className="w-[100px] h-[100px] bg-orange-300"></div>
          <button className="absolute bottom-0 right-0">➕</button>
        </div>
        <input type="text" defaultValue={user?.nickname} placeholder="새 닉네임" />
      </section>
      <section className="border">
        <div className="border border-black bg-slate-400">
          <p>이메일</p>
          <input type="email" defaultValue={user?.email} disabled />
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
          <input type="text" id="name" placeholder="이름을 입력해주세요" defaultValue={user ? user.name : ""} />
        </div>
        <div className="border border-black bg-slate-400">
          <p>휴대폰</p>
          <input
            type="text"
            id="phoneNumber"
            placeholder="휴대폰 번호를 입력해주세요"
            defaultValue={user ? user.phonenum : null}
          />
        </div>
        <InfoOnEditAddress />
      </section>
    </>
  );
};

export default InfoOnEdit;
