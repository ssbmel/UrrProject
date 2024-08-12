import React from "react";
import SalesList from "./SalesList";
import ProductsDetail from "@/app/(provider)/(root)/products/detail/[id]/page";
import { Product } from "../../../../types/common";

interface Props {
  products: Product[];
}

const SalesSection = async ({ products }: Props) => {
  /* 날짜 비교 함수 */
  const isOnGoing = (product: Product) => {
    const now = new Date();
    const productEndDate = new Date(product.end!);
    if (productEndDate < now) {
      return false;
    }
    return true;
  };

  /* 필터 */
  const onGoingProducts = products.filter((product) => isOnGoing(product));
  const endProducts = products.filter((product) => !isOnGoing(product));

  /* console.log(`진행중인 판매상품 : ${onGoingProducts}`);
  console.log(`지나간 판매상품 : ${endProducts}`); */

  return (
    <section className="flex flex-col">
      <SalesList products={onGoingProducts} />
      <hr className="border-[4px] bg-[#F4F4F4]" />
      <SalesList products={endProducts} />
    </section>
  );
};

export default SalesSection;
