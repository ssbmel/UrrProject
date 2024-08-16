"use client";

import React from "react";
import LoadingUrr from "@/components/common/loading/LoadingUrr";
import IntroSection from "@/components/mypage/infInfo/IntroSection";
import SalesSection from "@/components/mypage/infInfo/SalesSection";
import { useUserData } from "@/hooks/useUserData";
import { getProductDetailByUserId } from "@/services/products/detail/productDetail.service";
import { useEffect, useState } from "react";
import { Product } from "../../../../../../../types/common";
import { getUserFromUserId } from "@/services/users/account/account.service";
import { PublicUser } from "../../../../../../../types/auth.type";

const InfProfilePage = ({ params }: { params: { id: string } }) => {
  const data = useUserData();
  const { data: user } = data;
  const [infProductData, setInfProductData] = useState<Product[]>([]);
  const [infUserData, setInfUserData] = useState<PublicUser | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const productResult = await getProductDetailByUserId(params.id);
      const userResult = await getUserFromUserId(params.id);
      setInfProductData(productResult);
      setInfUserData(userResult);
    };
    if (params?.id) {
      fetchData();
    }
  }, [user]);

  if (data.isPending) {
    return <LoadingUrr />;
  }

  return (
    <>
      <IntroSection user={infUserData} />
      <hr className="border-[4px] bg-[#F4F4F4]" />
      <SalesSection products={infProductData} />
    </>
  );
};

export default InfProfilePage;
