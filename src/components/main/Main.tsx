"use client";

import React, { useEffect, useState } from "react";
import BestProductsList from "./BestProductsList";
import SubInfluencer from "./SubInfluencer";
import BestInfluencerList from "./BestInfluencerList";
import ReviewList from "./ReviewList";
import Banner from "./swiper/Banner";
import "./style.css";
import { Product, User } from "../../../types/common";

function Main() {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [infUser, setInfUser] = useState<User[]>([]);
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
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([getPostData(), getUserData()]);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="spinner-wrapper">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-y-5 ">
      <Banner/>
      <SubInfluencer infUser={infUser} />
      <hr />
      <BestProductsList productsList={productsList} />
      <BestInfluencerList infUser={infUser} />
      <ReviewList />
    </div>
  );
}

export default Main;
