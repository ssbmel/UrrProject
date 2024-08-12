import React, { useEffect, useState } from "react";
import OrderedProduct from "./OrderedProduct";
import { productListType, orderType } from "./MyOrderedList";

interface MyOrderCompoType {
  item: productListType | null;
  delivery: string | null;
  paymentId: string
}

const MyOrderCompo: React.FC<MyOrderCompoType> = ({ item, delivery, paymentId }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <li className="pt-[18px] pb-[18px] text-[14px] border-b flex flex-col gap-[18px]">
      <div className="flex justify-between items-center">
        <img src={item?.imgUrl} alt="이미지" className="w-[48px] h-[48px] bg-slate-300 rounded-[4px]" />
        <div className="flex justify-evenly gap-[18px] flex-shrink-0">
          <p className="w-[130px] truncate">{item?.name}</p>
          <p>{delivery}</p>
          <p>
            <span>{item?.amount.toLocaleString()}</span>원
          </p>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="p-[9px]">
          {isOpen ? "🔺" : "🔻"}
        </button>
      </div>
      {isOpen ? <OrderedProduct id={item!.id} paymentId={paymentId}/> : null}
    </li>
  );
};

export default MyOrderCompo;
