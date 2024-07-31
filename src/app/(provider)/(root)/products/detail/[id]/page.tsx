"use client";

import ProductInquiry from "@/components/products/ProductInquiry";
import Detail from "@/components/products/detail/Detail";
import { useState } from "react";

type ParamsType = { id: string };

const ProductsDetail = ({ params }: { params: ParamsType }) => {
  const [restart, setRestart] = useState<boolean>(false);
  return (
    <div>
      <Detail params={params} />
      <ProductInquiry id={params.id} restart={restart} setRestart={setRestart} />
    </div>
  );
};

export default ProductsDetail;
