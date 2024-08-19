"use client";

import Image from "next/image";
import { DataType } from "./Cart";
import xIcon from "../../../../public/icon/xIcon.png";
import { createClient } from "../../../../supabase/client";
import Link from "next/link";
import CartSkeleton from "@/components/common/SkeletonLoader/CartSkeleton";

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

    const isConfirmed = await swal("해당상품을 장바구니 목록에서 삭제하시겠습니까?", {
      buttons: ["취소", "삭제"]
    });

    if (!isConfirmed) {
      return;
    }

    const { data, error } = await supabase.from("cart").delete().eq("product_id", item.product_id);

    if (error) {
      console.error("Error deleting item:", error);
    } else {
      console.log("Item deleted:", data);
      removeItemFromState(item.product_id);
    }
  };

  const quantityMul = item.amount * item.quantity;
  const cost = item.cost;

  const today = new Date();
  const end = new Date(item.end);

  const isPastEndDate = end < today;

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

            <div className="w-[72px] h-[72px] xl:w-[124px] xl:h-[124px] relative">
              <Link href={`/products/detail/${item.product_id}`}>
                <div className="w-[72px] h-[72px] xl:w-[124px] xl:h-[124px] relative">
                  <Image
                    src={item.main_img}
                    alt="상품 사진"
                    priority
                    fill
                    sizes="72px xl:124px"
                    className={`object-cover rounded ${isPastEndDate ? "opacity-55" : ""}`}
                  />
                </div>
                {isPastEndDate && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md">
                    <p className="text-[#FFFFFE] text-[16px] xl:text-[18px] ">판매 종료</p>
                  </div>
                )}
              </Link>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-sm xl:text-base text-[#989898]">{item.nickname}</p>
              <Link href={`/products/detail/${item.product_id}`}>
                <p className={`text-base ${isPastEndDate ? "text-[#989898]" : ""}  xl:text-lg`}>{item.name}</p>
              </Link>
              <div className="flex flex-row gap-1 xl:text-base">
                <p className={`ext-sm font-semibold ${isPastEndDate ? "text-[#989898]" : ""}`}>
                  {`${quantityMul.toLocaleString()}원`}
                </p>
                <p className="text-[#989C9F] line-through">{cost?.toLocaleString()}</p>
              </div>
            </div>

            <div className="grid ml-auto gap-5">
              <Image
                src={xIcon}
                alt="장바구니 상품 삭제 버튼"
                width={16}
                height={16}
                className="absolute top-[22px] right-[11px] cursor-pointer"
                onClick={() => {
                  deleteItem(item);
                }}
              />

              <div className="absolute bottom-[12px] right-[11px] border flex w-[60px] rounded px-2 justify-center gap-2">
                <button onClick={minusCount} disabled={isPastEndDate}>
                  -
                </button>
                <p>{item.quantity}</p>
                <button onClick={addCount} disabled={isPastEndDate} className="text-primarynormal">
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
