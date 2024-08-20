"use client";

import React, { useEffect, useState } from "react";
import BestProductsList from "./BestProductsList";
import SubInfluencer from "./SubInfluencer";
import BestInfluencerList from "./BestInfluencerList";
import "./style.css";
import { Product, Review, User } from "../../../types/common";
import LoadingUrr from "../common/loading/LoadingUrr";
import Banner from "./swiper/Banner";
import MainReviewList from "./MainReviewList";


function Main() {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [infUser, setInfUser] = useState<User[]>([]);
  const [ratingCount, setRatingCount] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPostData = async () => {
    const response = await fetch("/api/products");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Product[] = await response.json();
    setProductsList(data);
  };

  const getUserData = async () => {
    try {
      const response = await fetch("/api/auth/users/infuser/allinfuser");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const user: User[] = await data.data;
      setInfUser(user);
    } catch (error) {
      console.log("Failed to fetch user data:", error);
    }
  };

  const getRatingData = async () => {
    try {
      const response = await fetch("/api/product_review");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRatingCount(data);
    } catch (error) {
      console.log("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([getPostData(), getUserData(), getRatingData()]);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingUrr />;
  }

  return (
    <div className="w-full xl:min-h-[calc(100vh-278px)">
      <Banner />
      <div className="container flex flex-col items-center xl:items-stretch xl:w-[1200px] w-full mx-auto gap-2 xl:px-0">
        <SubInfluencer infUser={infUser} />
        <hr className="w-full" />
        <BestProductsList productsList={productsList} ratingCount={ratingCount} />
        <BestInfluencerList infUser={infUser} />
        <MainReviewList />
      </div>
    </div>
  );
  
  
}

export default Main;
