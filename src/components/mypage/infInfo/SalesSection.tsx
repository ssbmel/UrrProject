import React from "react";
import SalesList from "./SalesList";
import { PublicUser } from "../../../../types/auth.type";
import { getProductDetailByUserId } from "@/services/products/detail/productDetail.service";

interface Props {
  user: PublicUser;
}

const SalesSection = async ({ user }: Props) => {
  /* const data = await getProductDetailByUserId("inf 사용자의 id"); */
  /* URL에서 직접 읽어오게 해야한다. */

  return (
    <section className="flex flex-col">
      <SalesList user={user} />
      <hr className="border-[4px] bg-[#F4F4F4]" />
      <SalesList user={user} />
    </section>
  );
};

export default SalesSection;
