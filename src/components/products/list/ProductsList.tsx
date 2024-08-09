import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

interface PostData {
  id: string;
  start: string;
  end: string;
  cost: string;
  price: string;
  product_count: string;
  title: string;
  text: string;
  category: string;
  main_img: string;
  detail_img: string[];
  nickname: string;
}

interface ProductsListProps {
  selectedCategory: string;
}

export default function ProductsList({ selectedCategory }: ProductsListProps) {
  const [products, setProducts] = useState<PostData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        if (response.ok) {
          setProducts(data);
        } else {
          setError(data.error || "data 받아오기 오류");
        }
      } catch (error) {
        setError("data fetch 오류");
      }
    }
    getData();
  }, []);

  const filteredProducts =
    selectedCategory === "전체" ? products : products.filter((product) => product.category === selectedCategory);

  const totalProducts = filteredProducts.length.toString().padStart(2, "0");

  return (
    <>
      <div className="flex justify-between px-6 pt-6">
        <p className="text-lg">총 {totalProducts}개</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-[36px] p-[17px] gap-x-2 ">
        {filteredProducts.map((product, index) => {
          const cost = parseFloat(product.cost);
          const price = parseFloat(product.price);
          const discountRate = Math.round(((cost - price) / cost) * 100);

          return (
            <div
              key={index}
              className="bg-white rounded-md flex flex-col justify-center items-center w-[166px] mx-auto"
            >
              <Link href={`/products/detail/${product.id}`}>
                <div className="relative w-[165px] h-[178px] md:w-[220px] md:h-[230px] cursor-pointer mb-2">
                  <Image
                    src={product.main_img}
                    alt={product.title}
                    fill
                    priority
                    sizes="165px"
                    className="rounded-md object-cover"
                  />
                </div>
              </Link>
              <div className="ml-3">
                <p className="text-[#B2B5B8] text-[12px]">{product.nickname}</p>
                <p className="text-sm text-gray-600 truncate w-[165px]">{product.title}</p>
                <div className="flex items-center">
                  <p className="text-sm text-red-500">{discountRate}%</p>
                  <p className="text-md font-bold ml-1">{price.toLocaleString()}원</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
