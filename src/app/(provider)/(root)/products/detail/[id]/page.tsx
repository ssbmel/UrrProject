"use client";
import Detail from "@/components/products/detail/Detail";
import React from "react";

type ParamsType = { postId: string };

const ProductsDetail = ({ params }: { params: ParamsType }) => {
  return (
    <div>
      <Detail params={params} />
    </div>
  );
};

export default ProductsDetail;
