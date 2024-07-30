"use client";

import Link from "next/link";
import Image from "next/image";
import defaultImg from "../../../public/images/default.png";
import { useEffect, useState } from "react";

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

function BestProductsList() {
  const [productsList, setProductsList] = useState<PostData[]>([]);
  const getPostData = async () => {
    const response = await fetch("/api/products");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: PostData[] = await response.json();
    setProductsList(data);
  };

  useEffect(() => {
    getPostData();
  }, []);

  return (
    <>
      <div className="w-full h-auto mx-auto p-2">
        <div className="flex mb-5 p-3">
          <h2 className="font-bold text-xl">인기상품</h2>
          <Link className="ml-auto text-xs flex-end" href={"/products/list"}>
            <button>더보기</button>
          </Link>
        </div>
        <div className="w-full h-[90%] p-2 overflow-x-auto flex flex-nowrap gap-10 scrollbar">
          <div className="grid grid-flow-col gap-5">
            {productsList.map((list) => (
              <div className="w-[130px]" key={list.id}>
                <div className="relative w-full h-[130px] mb-2">
                <Image 
                    src={list.main_img || defaultImg}
                    alt="img"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                  </div>
                <p className="text-[#B2B5B8] text-sm">{list.nickname}</p>
                <p className="text-[16px] truncate">{list.title}</p>
                <div className="flex gap-1">
                  <p className="text-[#F03F33] font-semibold">18%</p>
                  <p className="font-bold">{list.cost}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default BestProductsList;
