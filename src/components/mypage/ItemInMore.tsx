import React, { useState } from "react";
import { productListType } from "./MyOrderedList";
import TopArrowBlue from "../../../public/icon/topArrowBlue.svg";
import BottomArrow from "../../../public/icon/bottomArrow.svg";
import Image from "next/image";
import Link from "next/link";
import ProductInMore from "./ProductInMore";

interface Props {
  item: productListType | null;
  delivery: string;
  paymentId: string;
}

const ItemInMore = ({ item, delivery, paymentId }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <li
      className={
        isOpen
          ? "pt-[18px] pb-[18px] text-[12px] border-b last:border-0 flex flex-col gap-[18px] text-[#0051B2]"
          : "pt-[18px] pb-[18px] text-[12px] border-b last:border-0 flex flex-col gap-[18px]"
      }
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-[20px]">
          <div className="w-[48px] h-[48px] relative rounded-[4px]">
            <Link href={`/products/detail/${item?.id}`} className="relative w-[48px] h-[48px] block">
              <Image
                src={item?.imgUrl || ""}
                alt="ordered_product_image"
                fill
                priority
                sizes="48px"
                className="w-[48px] h-[48px] bg-slate-300 absolute rounded-[4px] object-cover"
              />
            </Link>
          </div>
          <p className="truncate w-[110px]" title={item?.name.includes("]") ? item?.name.split("]")[1] : item?.name}>
            {item?.name.includes("]") ? item?.name.split("]")[1] : item?.name}
          </p>
        </div>
        <p className="font-[500] text-center">{delivery}</p>
        <p className="font-[500] text-center">
          <span>{item?.amount.toLocaleString()}</span>원
        </p>
        <button onClick={() => setIsOpen(!isOpen)} className="p-[9px]">
          {isOpen ? <TopArrowBlue /> : <BottomArrow />}
        </button>
      </div>
      {isOpen ? <ProductInMore id={item!.id} paymentId={paymentId} delivery={delivery} /> : null}
    </li>
  );
};

export default ItemInMore;
