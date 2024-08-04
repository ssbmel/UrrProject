"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "../../../types/common";
import defaultImg from "../../../public/images/default.png"

function BestProductsList({ productsList }: { productsList: Product[] }) {
  return (
    <>
      <div className="w-full h-auto mx-auto p-5">
        <div className="flex mb-5">
          <h2 className="font-bold text-xl">인기상품</h2>
          <Link className="ml-auto text-xs flex-end" href={"/products/list"}>
            <button>더보기</button>
          </Link>
        </div>
        <div className="w-full h-[90%] p-2 overflow-x-auto flex flex-nowrap gap-10 scrollbar">
          <div className="grid grid-flow-col gap-5">
            {productsList.map((list) => {
              const cost = parseFloat(list.cost);
              const price = parseFloat(list.price);
              const discountRate = Math.round(((cost - price) / cost) * 100);

              return (
                <Link href={`/products/detail/${list.id}`} key={list.id}>
                  <div className="w-[130px]">
                    <div className="relative w-full h-[130px] mb-2">
                      <Image
                        src={list.main_img || defaultImg}
                        alt="img"
                        fill
                        sizes="130px"
                        className="rounded-md object-cover"
                      />
                    </div>
                    <p className="text-[#B2B5B8] text-sm">{list.nickname}</p>
                    <p className="text-[16px] truncate">{list.title}</p>
                    <div className="flex gap-1">
                      <p className="text-[#F03F33] font-semibold">{discountRate}%</p>
                      <p className="font-bold">{price.toLocaleString()}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default BestProductsList;
