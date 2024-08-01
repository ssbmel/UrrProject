"use client";

import ProductInquiry from "@/components/products/ProductInquiry";
import Detail from "@/components/products/detail/Detail";
import { useState } from "react";

type ParamsType = { id: string };

const ProductsDetail = ({ params }: { params: ParamsType }) => {
  return (
    <div>
      <Detail params={params} />
    </div>
  );
};

export default ProductsDetail;
