"use client";

import React, { useRef, useState } from 'react';

function PricePeriod() {
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const costRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const productCountRef = useRef<HTMLInputElement>(null);
  const [settingList, setSettingList] = useState({
    startDate: "",
    endDate: "",
    cost: "",
    price: "",
    productCount: ""
  });

  const onChange = () => {
    const newSettingList = {
      startDate: startDateRef.current?.value || '',
      endDate: endDateRef.current?.value || '',
      cost: costRef.current?.value || '',
      price: priceRef.current?.value || '',
      productCount: productCountRef.current?.value || '',
    }
    setSettingList(newSettingList)
  }
  console.log(settingList);
  

  return (
    <details open className="border w-full px-5">
      <summary className="font-bold text-lg">기간 및 가격 설정</summary>
      <hr />
      <div className="space-x-5 my-5">
        <span>기간</span>
        <input type="date" ref={startDateRef} onChange={onChange} className="w-[120px] border"/>
        <span>-</span>
        <input type="date" ref={endDateRef} onChange={onChange} className="w-[120px] border"/>
      </div>
      <div className="space-x-5 mb-5">
        <span>가격</span>
        <input type="number" className="w-[120px] border" placeholder="정가" ref={costRef} onChange={onChange}/>
        <span>-</span>
        <input type="number" className="w-[120px] border" placeholder="판매가" ref={priceRef} onChange={onChange}/>
      </div>
      <div className="space-x-5 mb-5">
        <span>수량</span>
        <input type="number" className="w-[120px] border" ref={productCountRef} onChange={onChange}/>
      </div>
    </details>
  );
}

export default PricePeriod;
