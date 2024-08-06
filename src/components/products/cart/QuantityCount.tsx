"use client";

import Image from "next/image";
import { DataType } from "./Cart";
import xIcon from "../../../../public/icon/xIcon.png";

type PropsType = {
  item: DataType;
  CheckboxChangeHandler: (item: DataType) => void;
  updateItemQuantity: (item: DataType, count: number) => void;
};

const QuantityCount = ({ item, CheckboxChangeHandler, updateItemQuantity }: PropsType) => {
  const addCount = () => {
    updateItemQuantity(item, item.quantity + 1);
  };

  const minusCount = () => {
    updateItemQuantity(item, item.quantity - 1);
  };

  return (
    <div>
      <div key={item.id} className="relative border flex items-center gap-4 p-2 mb-4">
        <input
          type="checkbox"
          checked={item.isChecked}
          onClick={() => {
            CheckboxChangeHandler(item);
          }}
          name="product"
        />
        <div className="w-[72px] h-[72px]">
          <Image src={item.main_img} alt="image" fill sizes="72" className="object-cover rounded" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-medium">{item.nickname}</p>
          <p className="text-gray-500">{item.name}</p>
          <p className="text-gray-700 font-bold">{item.amount}</p>
        </div>
        <div className="grid ml-auto gap-5">
          <Image
            src={xIcon}
            alt="장바구니 상품 삭제 버튼"
            width={16}
            height={16}
            className="absolute top-[22px] right-[11px]"
          />
          <div className="absolute bottom-[12px] right-[11px] border flex w-[60px] px-2 justify-center gap-2">
            <button onClick={minusCount}>-</button>
            <p>{item.quantity}</p>
            <button onClick={addCount}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantityCount;
