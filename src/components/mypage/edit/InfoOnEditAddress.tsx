'use client';

import React, { FormEvent, useState } from 'react';

const InfoOnEditAddress = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');

  const keywordChangeHandler = async (e: FormEvent) => {
    e.preventDefault();
    setKeyword(keyword);
  };

  const openAddressForm = (e: FormEvent) => {
    e.preventDefault();
    setIsVisible(!isVisible);
    console.log(isVisible);
  };

  return (
    <div>
      <label htmlFor="postNum">
        <div>
          <input type="number" id="postNum" readOnly />
          <button onClick={openAddressForm} value={keyword} className="bg-blue-300">
            주소 검색
          </button>
        </div>
        <div className={isVisible ? 'bg-slate-500 block' : 'hidden'}>
          <input onChange={(e) => keywordChangeHandler(e)} type="text" placeholder="검색어를 입력하세요" />
          <ul className="h-[200px] w-full bg-gray-400">
            <li>dsa</li>
          </ul>
        </div>
        <input type="text" id="address" />
        <input type="text" id="detailAddress" />
      </label>
    </div>
  );
};

export default InfoOnEditAddress;
