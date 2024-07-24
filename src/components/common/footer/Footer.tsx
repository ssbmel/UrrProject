import React from 'react';

const Footer = () => {
  return (
    <div className="bg-gray-200 mb-[80px] w-full h-[250px]">
      <div className="max-w-[800px] grid grid-flow-col p-5 gap-2 mx-auto">
        <div className="whitespace-nowrap">
          <p className="font-bold text-sm">서비스</p>
          <p className="text-xs">광고 문의</p>
          <p className="text-xs">자주 묻는 질문</p>
        </div>
        <div className="whitespace-nowrap">
          <p className="font-bold text-sm">사이트 안내</p>
          <p className="text-xs">이용약관</p>
          <p className="text-xs">개인정보처리방침</p>
        </div>
        <div className="whitespace-nowrap">
          <p className="font-bold text-sm">고객서비스</p>
          <p className="text-xs">0000-0000</p>
          <p className="text-xs">평일 10:00 - 17:00</p>
          <p className="text-xs">점심 12:00 - 13:00</p>
          <p className="text-xs">주말 및 공휴일 휴무</p>
        </div>
        <p className="text-[13px] text-right">Copyright ⒸA4와르르</p>
      </div>
    </div>
  );
};

export default Footer;