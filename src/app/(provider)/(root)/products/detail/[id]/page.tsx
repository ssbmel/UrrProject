"use client";

import ProductInquiry from "@/components/products/ProductInquiry";

type ParamsType = { postId: string };

const ProductsDetail = ({ params }: { params: ParamsType }) => {
  return (
    <div>
      <ProductInquiry id={params.postId} />
    </div>
  );
};

export default ProductsDetail;
