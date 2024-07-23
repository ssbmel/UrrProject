"use client";

import React, { useRef, useState } from 'react';
import Category from './Category';
import PricePeriod from './PricePeriod';
import Contents from './Contents';
import './style.css';
import { createClient } from '../../../../supabase/client';
import { Product } from '../../../../types/common';
import { userDataStore } from '@/zustand/store';

const supabase = createClient();

function ProductUpload() {
  const [radioCheckedValue, setRadioCheckedValue] = useState<string>('');

  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const costRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const productCountRef = useRef<HTMLInputElement>(null);

  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const { userInfo } = userDataStore();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!userInfo) {
      return
    }
    const productData: Product = {
      category: radioCheckedValue,
      start: startDateRef.current?.value || null,
      end: endDateRef.current?.value || null,
      cost: costRef.current?.value ? parseInt(costRef.current?.value) : null,
      price: priceRef.current?.value ? parseInt(priceRef.current?.value) : null,
      product_count: productCountRef.current?.value ? parseInt(productCountRef.current?.value) : null,
      title: titleRef.current?.value || null,
      text: textRef.current?.value || null,
      img_url: null,
      user_id: userInfo.id,
      created_at: new Date().toISOString(),
      id: new Date().getTime()
    };
    
    const { data, error } = await supabase.from('products').insert([productData]).select();

    if (error) {
      console.error('Error inserting data:', error);
    } else {
      console.log('Data inserted:', data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Category 
        radioCheckedValue={radioCheckedValue} 
        setRadioCheckedValue={setRadioCheckedValue} />
      <PricePeriod
        startDateRef={startDateRef}
        endDateRef={endDateRef}
        costRef={costRef}
        priceRef={priceRef}
        productCountRef={productCountRef}
      />
      <Contents titleRef={titleRef} textRef={textRef} />
      <button className="bg-blue-700 text-white p-2 rounded-md">등록하기</button>
    </form>
  );
}

export default ProductUpload;
