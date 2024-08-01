"use client";

import React, { useEffect, useState } from "react";
import BestProductsList from "./BestProductsList";
import SubInfluencer from "./SubInfluencer";
import BestInfluencerList from "./BestInfluencerList";
import ReviewList from "./ReviewList";
import Banner from "./swiper/Banner";
import "./style.css";
import UpButton from "../common/button/UpButton";
export interface PostData {
  id: string;
  start: string;
  end: string;
  cost: string;
  price: string;
  product_count: string;
  title: string;
  text: string;
  category: string;
  main_img: string;
  detail_img: string[];
  nickname: string;
}

function Main() {
  const [productsList, setProductsList] = useState<PostData[]>([]);

  const getPostData = async () => {
    const response = await fetch("/api/products");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: PostData[] = await response.json();
    setProductsList(data);
  };

  useEffect(() => {
    getPostData();
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-y-5 ">
      <Banner productsList={productsList} />
      <SubInfluencer />
      <hr />
      <BestProductsList productsList={productsList} />
      <BestInfluencerList />
      <ReviewList />
      <UpButton />
    </div>
  );
}

export default Main;
