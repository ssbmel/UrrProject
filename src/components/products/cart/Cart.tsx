"use client";

import { useEffect, useState } from "react";
import { useUserData } from "@/hooks/useUserData";
import { useUserCartItems } from "@/hooks/useUserCartItems";
import { useAddrStore } from "@/zustand/addrStore";
import { useRouter } from "next/navigation";
import QuantityCount from "./QuantityCount";
import { createClient } from "../../../../supabase/client";

export type DataType = {
  amount: number;
  cost: number;
  created_at: string;
  end: number;
  id: number;
  main_img: string;
  name: string;
  nickname: string;
  product_id: string;
  quantity: number;
  user_id: string;
  isChecked: boolean;
};

function Cart() {
  const { data: userData } = useUserData();
  const userId = userData?.id;
  const { data: saveCartItems, isFetching } = useUserCartItems(userId);
  const [allCartItems, setAllCartItems] = useState<DataType[]>([]);
  const { setProductList } = useAddrStore();
  const [allChecked, setAllChecked] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (saveCartItems) {
      const setData = saveCartItems.map((item: DataType) => ({
        ...item,
        isChecked: true
      }));
      setAllCartItems(setData);
    }
  }, [saveCartItems]);

  const handleBuy = () => {
    const test = allCartItems
      .filter((item) => item.isChecked === true && !isEndDate(item))
      ?.map((item: DataType) => ({
        id: item.product_id,
        name: item.name,
        amount: item.amount,
        quantity: item.quantity,
        imgUrl: item.main_img
      }));
    console.log(test);

    // 여기에 구매 로직 추가
    setProductList(test);

    router.push(`/payment`);
  };

  const addItems = (newItem: DataType) => {
    setAllCartItems((item) =>
      item.map((item) => (item.id === newItem.id ? { ...item, isChecked: true } : { ...item }))
    );
  };

  const removeItem = (newItem: DataType) => {
    setAllCartItems((item) =>
      item.map((item) => (item.id === newItem.id ? { ...item, isChecked: false } : { ...item }))
    );
  };

  const removeAllItems = () => {
    setAllCartItems((item) => item.map((item) => ({ ...item, isChecked: false })));
  };

  const addAllItems = () => {
    let isAllChecked = true;
    const newAllCartItems = allCartItems.map((item) => {
      const isEnd = isEndDate(item);
      if (isEnd) {
        isAllChecked = false;
        return { ...item, isChecked: false };
      } else {
        return { ...item, isChecked: true };
      }
    });
    setAllCartItems(newAllCartItems);

    return isAllChecked;
  };

  const updateItemQuantity = (updateItem: DataType, count: number) => {
    if (count < 1) return;
    setAllCartItems((item) =>
      item.map((item) => (item.id === updateItem.id ? { ...item, quantity: count } : { ...item }))
    );
  };

  const isEndDate = (item: DataType) => {
    const today = new Date().getTime();
    const end = new Date(item.end).getTime();
    return end < today;
  };

  // 전체선택
  const selectAllHandler = (checked: boolean) => {
    if (checked) {
      checked = addAllItems();
    } else {
      removeAllItems();
    }
    setAllChecked(checked);
  };

  const CheckboxChangeHandler = (item: DataType) => {
    let updatedCartItems;
    if (item.isChecked) {
      updatedCartItems = allCartItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, isChecked: false } : cartItem
      );
    } else {
      updatedCartItems = allCartItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, isChecked: true } : cartItem
      );
    }

    setAllCartItems(updatedCartItems);

    const allItemsChecked = updatedCartItems.every((item) => item.isChecked);
    setAllChecked(allItemsChecked);
  };

  /** 아이템 삭제 업데이트 */
  const removeItemFromState = (product_id: string) => {
    setAllCartItems((prevItems) => prevItems.filter((item) => item.product_id !== product_id));
  };

  /** 아이템 전체 삭제 업데이트 */
  const removeAllItemFromState = (userId: string) => {
    setAllCartItems((prevItems) => prevItems.filter((item) => item.user_id !== userId));
  };

  /** 주문 총금액 확인 함수 */
  const getTotalAmount = () => {
    return allCartItems
      .filter((item) => item.isChecked && !isEndDate(item))
      .reduce((total, item) => total + item.amount * item.quantity, 0);
  };

  /** 상품 할인금액 계산 함수 */
  const getTotalDiscount = () => {
    return allCartItems
      .filter((item) => item.isChecked && !isEndDate(item))
      .reduce((total, item) => total + (item.cost - item.amount) * item.quantity, 0);
  };

  /** 아이템 전체 삭제 */
  const allDeleteItem = async (userId: string) => {
    const supabase = createClient();

    const isConfirmed = await swal("전체상품을 장바구니 목록에서 삭제하시겠습니까?", {
      buttons: ["아니오", "예"]
    });

    if (!isConfirmed) {
      return;
    }

    const { data, error } = await supabase.from("cart").delete().eq("user_id", userId);

    if (error) {
      console.error("Error allDeleteItem item:", error);
    } else {
      console.log("Item allDeleteItem:", data);
      removeAllItemFromState(userId);
    }
  };
  return (
    <div className="w-full xl:w-[1132px] xl:h-[calc(100vh-278px)] xl:mx-auto p-4">
      <h2 className="hidden xl:block text-2xl font-bold text-center mb-[32px]">장바구니</h2>

      {allCartItems.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg font-semibold">장바구니에 담긴 상품이 없습니다.</p>
          <button
            onClick={() => router.push("/products/list")}
            className="mt-5 px-6 py-2 rounded-md bg-primarynormal text-white"
          >
            상품 보러가기
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center gap-2 pb-5 border-b-2 border-[#EAECEC]">
            <label>
              <input
                type="checkbox"
                readOnly
                name="product-all"
                className="mr-4"
                checked={allChecked}
                onChange={(e) => {
                  selectAllHandler(e.target.checked);
                }}
              />
              전체상품
            </label>
            <button
              onClick={() => {
                allDeleteItem(userId);
              }}
              className="text-primarynormal"
            >
              삭제
            </button>
          </div>

          {allCartItems.map((item: DataType) => (
            <QuantityCount
              key={item.id}
              item={item}
              CheckboxChangeHandler={CheckboxChangeHandler}
              updateItemQuantity={updateItemQuantity}
              removeItemFromState={removeItemFromState}
              isFetching={isFetching}
            />
          ))}

          <div className="flex flex-col w-full p-4">
            <div className="flex justify-between mb-2">
              <p>상품 금액</p>
              <p>{`${getTotalAmount()?.toLocaleString()}원`}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>상품 할인금액</p>
              <p>{`-${getTotalDiscount()?.toLocaleString()}원`}</p>
            </div>
            <div className="flex justify-between">
              <p>배송비</p>
              <p>3,000원</p>
            </div>
            <hr className="my-5" />
            <div className="flex justify-between mb-[45px] xl:mb-[112px]">
              <p className="font-semibold">결제 예정 금액</p>
              <p className="font-semibold">{(getTotalAmount() + 3000)?.toLocaleString()}원</p>
            </div>
            <button
              onClick={handleBuy}
              className="w-full xl:w-[268px] xl:mx-auto mt-4 py-2 rounded-md bg-[#1A82FF] text-white"
            >
              구매하기
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
