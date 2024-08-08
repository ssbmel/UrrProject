"use client";

import Image from "next/image";
import { DataType } from "./Cart";
import xIcon from "../../../../public/icon/xIcon.png";
import { createClient } from "../../../../supabase/client";

type PropsType = {
  item: DataType;
  CheckboxChangeHandler: (item: DataType) => void;
  updateItemQuantity: (item: DataType, count: number) => void;
  removeItemFromState: (product_id: string) => void;
};

const QuantityCount = ({ item, CheckboxChangeHandler, updateItemQuantity, removeItemFromState }: PropsType) => {
  const addCount = () => {
    updateItemQuantity(item, item.quantity + 1);
  };

  const minusCount = () => {
    updateItemQuantity(item, item.quantity - 1);
  };

  const deleteItem = async (item: DataType) => {
    const supabase = createClient();
    const { data, error } = await supabase.from("cart").delete().eq("product_id", item.product_id);
    if (error) {
      console.error("Error deleting item:", error);
    } else {
      console.log("Item deleted:", data);
      removeItemFromState(item.product_id);
    }
  };

  const quantityMul = item.amount * item.quantity;

  return (
    <div className=" border-b-2 border-[#EAECEC] mt-[18px]">
      <div key={item.id} className="relative flex items-center gap-4 p-2 mb-4">
        <input
          type="checkbox"
          readOnly
          checked={item.isChecked}
          onClick={() => {
            CheckboxChangeHandler(item);
          }}
          name="product"
        />
        <div className="w-[72px] h-[72px] relative">
          <Image src={item.main_img} alt="상품 사진" fill sizes="72px" className="object-cover rounded" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm text-[#989898]">{item.nickname}</p>
          <p className="text-base">{item.name}</p>
          <p className="ext-sm font-semibold">{quantityMul.toLocaleString()}</p>
        </div>
        <div className="grid ml-auto gap-5">
          <Image
            src={xIcon}
            alt="장바구니 상품 삭제 버튼"
            width={16}
            height={16}
            className="absolute top-[22px] right-[11px]"
            onClick={() => deleteItem(item)}
          />
          <div className="absolute bottom-[12px] right-[11px] border flex w-[60px] rounded px-2 justify-center gap-2">
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
