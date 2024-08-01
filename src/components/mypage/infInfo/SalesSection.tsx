import React from "react";
import SalesList from "./SalesList";

const SalesSection = () => {
  return (
    <section className="flex flex-col">
      <SalesList />
      <SalesList />
    </section>
  );
};

export default SalesSection;
