import Link from 'next/link';
import React from 'react';

const InfoOnEditTitle = () => {
  return (
    <div>
      <Link href={'/mypage'} className="bg-gray-300 absolute">
        &lt; My page
      </Link>
      <h1 className="text-center font-extrabold">회원정보 수정</h1>
    </div>
  );
};

export default InfoOnEditTitle;
