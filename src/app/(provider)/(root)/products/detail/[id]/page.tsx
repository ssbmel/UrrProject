"use client";

import ProductInquiry from "@/components/products/ProductInquiry";
import { Dispatch, SetStateAction, useState } from "react";

type ParamsType = { id: string };

const ProductsDetail = ({ params }: { params: ParamsType }) => {
  const [restart, setRestart] = useState<boolean>(false);
  return (
    <div>
      <ProductInquiry id={params.id} restart={restart} setRestart={setRestart} />
    </div>
  );
};

export default ProductsDetail;
