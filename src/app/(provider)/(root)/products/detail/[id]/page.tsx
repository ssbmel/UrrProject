"use client";

import Detail from "@/components/products/detail/Detail";

type ParamsType = { id: string };

const ProductsDetail = ({ params }: { params: ParamsType }) => {
  return (
    <div>
      <Detail params={params} />
    </div>
  );
};

export default ProductsDetail;
