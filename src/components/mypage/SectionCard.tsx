import React from 'react';

const SectionCard = () => {
  return (
    <div className="flex h-[100px] w-full gap-3 p-2 border">
      <img
        className="object-cover w-[30%]"
        src="https://miro.medium.com/v2/resize:fit:1400/1*lWaZtVU68iEnua9JgVt1GQ.jpeg"
        alt="샘플이미지"
      />
      <div className="self-center">
        <p>닉네임</p>
        <div>
          <span>아이디</span>
          <span>|</span>
          <span>작성일</span>
          <span>|</span>
          <span>좋아요 수</span>
        </div>
      </div>
    </div>
  );
};

export default SectionCard;
