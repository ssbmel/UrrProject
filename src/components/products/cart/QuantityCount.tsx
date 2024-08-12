"use client";

import Image from "next/image";
import { DataType } from "./Cart";
import xIcon from "../../../../public/icon/xIcon.png";
import { createClient } from "../../../../supabase/client";
import Link from "next/link";
import CartSkeleton from "@/components/common/SkeletonLoader/CartSkeleton";
import { useUserData } from "@/hooks/useUserData";
import { useUserCartItems } from "@/hooks/useUserCartItems";

type PropsType = {
  item: DataType;
  CheckboxChangeHandler: (item: DataType) => void;
  updateItemQuantity: (item: DataType, count: number) => void;
  removeItemFromState: (product_id: string) => void;
  isFetching: boolean;
};

const QuantityCount = ({
  item,
  CheckboxChangeHandler,
  updateItemQuantity,
  removeItemFromState,
  isFetching
}: PropsType) => {
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

  const today = new Date();
  const end = new Date(item.end);

  const isPastEndDate = end < today;

  // if (isLoading) return <ProductSkeleton />;

  return (
    <>
      {isFetching ? (
        <CartSkeleton />
      ) : (
        <div className="border-b-2 border-[#EAECEC] mt-[18px]">
          <div key={item.id} className="relative flex items-center gap-4 p-2 mb-4">
            <input
              type="checkbox"
              readOnly
              checked={item.isChecked}
              onClick={() => {
                if (!isPastEndDate) {
                  CheckboxChangeHandler(item);
                }
              }}
              name="product"
              disabled={isPastEndDate}
            />
            <div className="w-[72px] h-[72px] relative">
              <Link href={`/products/detail/${item.product_id}`}>
                <Image
                  src={item.main_img}
                  alt="상품 사진"
                  fill
                  sizes="72px"
                  className={`object-cover rounded ${isPastEndDate ? "opacity-55" : ""}`}
                />
              </Link>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-[#989898]">{item.nickname}</p>
              <Link href={`/products/detail/${item.product_id}`}>
                <p className={`text-base ${isPastEndDate ? "text-[#989898]" : ""}`}>{item.name}</p>
              </Link>
              <p className={`ext-sm font-semibold ${isPastEndDate ? "text-[#989898]" : ""}`}>
                {quantityMul.toLocaleString()}
              </p>
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
                <button onClick={minusCount} disabled={isPastEndDate}>
                  -
                </button>
                <p>{item.quantity}</p>
                <button onClick={addCount} disabled={isPastEndDate}>
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuantityCount;
