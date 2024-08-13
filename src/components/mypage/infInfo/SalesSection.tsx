import React from "react";
import SalesList from "./SalesList";
import { Product } from "../../../../types/common";

interface Props {
  products: Product[];
}

const SalesSection = async ({ products }: Props) => {
  const isOnGoing = (product: Product) => {
    const now = new Date();
    const productEndDate = new Date(product.end!);
    if (productEndDate < now) {
      return false;
    }
    return true;
  };

  const onGoingProducts = products.filter((product) => isOnGoing(product));
  const endProducts = products.filter((product) => !isOnGoing(product));

  return (
    <section className="flex flex-col">
      <SalesList products={onGoingProducts} sectionName="진행중인 공구" />
      <hr className="border-[4px] bg-[#F4F4F4]" />
      <SalesList products={endProducts} sectionName="지나간 공구" />
    </section>
  );
};

export default SalesSection;
