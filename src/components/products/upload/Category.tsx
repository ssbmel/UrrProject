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

function Category({ radioCheckedValue, setRadioCheckedValue }: CategoryProps) {

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioCheckedValue(e.target.value);    
  };

  return (
    <div className="">
      <details open className="w-full px-4 contents-box">
      <h1 className="font-bold text-xl mb-5 hidden xl:block">카테고리 선택</h1>
        <summary className="font-bold text-xl xl:hidden">카테고리 선택</summary>
        <hr className="xl:hidden" />
        <div className="grid grid-cols-3 gap-3 pb-5 p-2 xl:flex xl:space-x-8 xl:mt-0">
          {category.map((c) => {
            return (
              <label key={c.id} className="flex items-center whitespace-nowrap">
                <input
                  type="radio"
                  name="radioCheckedList"
                  value={c.name} // Use `name` for consistency
                  onChange={handleRadioChange}
                  className="mr-2 cursor-pointer text-[#1B1C1D]"
                  checked={radioCheckedValue === c.name} // Check with `name`
                />
                {c.title}
              </label>
            );
          })}
        </div>
      </details>
    </div>
  );
}

export default Category;
