import React from 'react';

const UserCard = () => {
  return (
    <div className="flex h-[100px] w-[400px] gap-3 p-2 border justify-between">
      <img
        className="object-cover w-[30%]"
        src="https://miro.medium.com/v2/resize:fit:1400/1*lWaZtVU68iEnua9JgVt1GQ.jpeg"
        alt="샘플이미지"
      />
      <div className="w-[30%]">
        <p>닉네임</p>
        <p>이메일</p>
        <p>
          <span>😊</span>
          <span>1,000</span>
          포인트
        </p>
      </div>
      <div className="w-[30%] text-right self-center">
        <span>😊</span>
      </div>
    </div>
  );
};

export default UserCard;
