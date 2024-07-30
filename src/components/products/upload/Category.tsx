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
  { id: 6, title: '반려동물용품', name: 'pets' },
  { id: 7, title: '헬스/건강', name: 'health' }
];

function Category({radioCheckedValue, setRadioCheckedValue}: CategoryProps) {

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioCheckedValue(e.target.value);
  }
  
  return (
      <details open className="border w-full px-5">
        <summary className="font-bold text-lg">카테고리</summary>
        <hr />
        <div className="grid grid-cols-3 gap-3 my-5">
          {category.map((c) => {
            return (
              <label key={c.id} className="flex items-center whitespace-nowrap">
                <input
                  type="radio"
                  name="radioCheckedList"
                  value={c.title}
                  onChange={handleRadioChange}
                  className="mr-1 cursor-pointer"
                  checked={radioCheckedValue === c.title}
                />
                {c.title}
              </label>
            );
          })}
        </div>
      </details>
  );
}

export default Category;
