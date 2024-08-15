"use client";

import { ChangeEvent } from 'react';

type CategoryProps = {
  radioCheckedValue: string;
  setRadioCheckedValue: (value: string) => void;
};

const category = [
  { id: 0, title: '패션/잡화', name: 'fashion' },
  { id: 1, title: '뷰티', name: 'beauty' },
  { id: 2, title: '식품', name: 'food' },
  { id: 3, title: '생활용품', name: 'living' },
  { id: 4, title: '가전/디지털', name: 'digital' },
  { id: 5, title: '취미/도서', name: 'hobbies' },
  { id: 7, title: '헬스건강', name: 'pets' },
  { id: 6, title: '반려동물용품', name: 'health' }
];

function Category({radioCheckedValue, setRadioCheckedValue}: CategoryProps) {

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioCheckedValue(e.target.value);
  }
  
  return (
    <div className="">
      <details open className="w-full px-4 contents-box xl:hidden">
        <summary className="font-bold text-xl">카테고리 선택</summary>
        <hr className="xl:hidden"/>
        <div className="grid grid-cols-3 gap-3 my-2 p-2 xl:flex xl:space-x-8 xl:mt-0">
          {category.map((c) => {
            return (
              <label key={c.id} className="flex items-center whitespace-nowrap">
                <input
                  type="radio"
                  name="radioCheckedList"
                  value={c.title}
                  onChange={handleRadioChange}
                  className="mr-2 cursor-pointer text-[#1B1C1D]"
                  checked={radioCheckedValue === c.title}
                />
                {c.title}
              </label>
            );
          })}
        </div>
      </details>
      <div className="w-full px-4 hidden xl:block bg-[#fffffe]">
      <h1 className="font-bold text-xl mb-5">카테고리 선택</h1>
        <div className="grid grid-cols-3 gap-3 p-2 xl:flex xl:space-x-8 h-[60px] items-center">
          {category.map((c) => {
            return (
              <label key={c.id} className="flex xl:text-[18px]">
                <input
                  type="radio"
                  name="radioCheckedList"
                  value={c.title}
                  onChange={handleRadioChange}
                  className="mr-2 cursor-pointer text-[#1B1C1D]"
                  checked={radioCheckedValue === c.title}
                />
                {c.title}
              </label>
            );
          })}
        </div>
      </div>
      </div>
  );
}

export default Category;