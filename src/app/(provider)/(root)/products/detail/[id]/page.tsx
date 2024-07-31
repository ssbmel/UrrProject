"use client";
import Detail from "@/components/products/detail/Detail";
import React from "react";
interface PageProps {
  params: { id: string };
}

const page = ({ params }: PageProps) => {
  return (
    <div>
      <Detail params={params} />
    </div>
  );
};

export default page;
