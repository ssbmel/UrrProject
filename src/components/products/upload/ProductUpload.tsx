"use client";

import React, { useRef, useState } from 'react';
import Category from './Category';
import PricePeriod from './PricePeriod';
import Contents from './Contents';
import './style.css';

function ProductUpload() {
  const [radioCheckedList, setRadioCheckedList] = useState<string>('');

  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const costRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const productCountRef = useRef<HTMLInputElement>(null);

  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  console.log();
  

  return (
    <form onSubmit={onSubmit}>
      <Category 
        radioCheckedList={radioCheckedList}
        setRadioCheckedList={setRadioCheckedList}
      />
      <PricePeriod
        startDateRef={startDateRef}
        endDateRef={endDateRef}
        costRef={costRef}
        priceRef={priceRef}
        productCountRef={productCountRef}
      />
      <Contents 
        titleRef={titleRef}
        textRef={textRef}
      />
      <button className="bg-blue-700 text-white p-2 rounded-md">등록하기</button>
    </form>
  );
}

export default ProductUpload;
