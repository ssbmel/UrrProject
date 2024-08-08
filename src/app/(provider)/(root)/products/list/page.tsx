"use client";
import ListCategory from "@/components/products/list/ListCategory";
import ProductsList from "@/components/products/list/ProductsList";
import { useState } from "react";

const List = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  return (
    <div>
      <ListCategory onSelectCategory={setSelectedCategory} />
      <ProductsList selectedCategory={selectedCategory} />
    </div>
  );
};

export default List;
