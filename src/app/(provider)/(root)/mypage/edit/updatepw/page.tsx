import React from "react";

const UpdatePw = () => {
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col gap-[8px]">
        <p className="font-bold">새 비밀번호</p>
        <div className="h-[40px] border rounded-[4px] p-[4px] pr-[8px] pl-[8px] flex justify-between items-center">
          <input type="password" id="newPw" placeholder="새 비밀번호" className="indent-[4px] w-[calc(100%-39px)]" />
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
  );
};

export default UpdatePw;
