import React from "react";
import SalesList from "./SalesList";
import { PublicUser } from "../../../../types/auth.type";

interface Props {
  user: PublicUser;
}

const SalesSection = ({ user }: Props) => {
  return (
    <section className="flex flex-col">
      <SalesList user={user} />
      <hr className="border-[4px] bg-[#F4F4F4]" />
      <SalesList user={user} />
    </section>
  );
};

export default SalesSection;
