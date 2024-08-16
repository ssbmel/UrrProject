import React, { useState } from "react";
import OrderedProduct from "./OrderedProduct";
import { productListType } from "./MyOrderedList";
import TopArrowBlue from "../../../public/icon/topArrowBlue.svg";
import BottomArrow from "../../../public/icon/bottomArrow.svg";
import Image from "next/image";
import Link from "next/link";

interface MyOrderCompoType {
  item: productListType | null;
  delivery: string;
  paymentId: string;
}

const MyOrderCompo: React.FC<MyOrderCompoType> = ({ item, delivery, paymentId }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <li className="pt-[18px] pb-[18px] text-[12px] border-b flex flex-col gap-[18px]">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-[20px]">
          <div className="w-[48px] h-[48px] relative rounded-[4px]">
            <Link href={`/products/detail/${item?.id}`}>
              <Image
                src={item?.imgUrl || ""}
                alt="ordered_product_image"
                fill
                className="w-[48px] h-[48px] bg-slate-300 rounded-[4px] object-cover"
              />
            </Link>
          </div>
          <p className="truncate w-[110px]">{item?.name.split("] ")[1]}</p>
        </div>
        <p className="font-[500]">{delivery}</p>
        <p className="font-[500]">
          <span>{item?.amount.toLocaleString()}</span>원
        </p>
        <button onClick={() => setIsOpen(!isOpen)} className="p-[9px]">
          {isOpen ? <TopArrowBlue /> : <BottomArrow />}
        </button>
      </div>
      {isOpen ? <OrderedProduct id={item!.id} paymentId={paymentId} delivery={delivery} /> : null}
    </li>
  );
};

export default MyOrderCompo;
