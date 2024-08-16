"use client";

import React from "react";
import LoadingUrr from "@/components/common/loading/LoadingUrr";
import IntroSection from "@/components/mypage/infInfo/IntroSection";
import SalesSection from "@/components/mypage/infInfo/SalesSection";
import { useUserData } from "@/hooks/useUserData";
import { getProductDetailByUserId } from "@/services/products/detail/productDetail.service";
import { useEffect, useState } from "react";
import { Product } from "../../../../../../../types/common";

const InfProfilePage = () => {
  const data = useUserData();
  const { data: user } = data;
  const [infProductData, setInfProductData] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProductDetailByUserId(user.id);
      setInfProductData(result);
    };
    if (user?.id) {
      console.log(user?.id);
      fetchData();
    }
  }, [user]);

  if (data.isPending) {
    return <LoadingUrr />;
  }

  return (
    <>
      <IntroSection user={data?.data} />
      <hr className="border-[4px] bg-[#F4F4F4]" />
      <SalesSection products={infProductData} />
    </>
  );
};

export default InfProfilePage;
