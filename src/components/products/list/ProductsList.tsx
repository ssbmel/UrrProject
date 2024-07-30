import Image from "next/image";

import { useEffect, useState } from "react";
import { createClient } from "../../../../supabase/client";
import { Product } from "../../../../types/common";
import Link from "next/link";

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);

  async function getData() {
    const { data, error } = await createClient().from("products").select("*");
    setProducts(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex justify-between p-6">
        <p>총 00개</p>
        <p>추천순</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-">
        {products.map((product, index) => (
          <div key={index} className="bg-white rounded-md p-2 flex flex-col ">
            <div className="flex justify-center ">
              <Link href={`/products/detail/${product.id}`}>
                <div className="relative w-[165px] h-[178px] md:w-[220px] md:h-[230px] cursor-pointer mb-2">
                  <Image
                    src={product.main_img}
                    alt={product.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              </Link>
            </div>
            <div className="ml-2">
              <h2 className="text-sm text-gray-400">[{product.influencer}]의</h2>
              <p className="text-sm text-gray-600">{product.title}</p>
              <div className="flex items-center">
                <p className="text-sm text-red-500">{product.discount}</p>
                <p className="text-md font-bold ml-1">{product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
