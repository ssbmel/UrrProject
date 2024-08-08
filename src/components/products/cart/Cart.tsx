"use client";

import { useEffect, useState } from "react";
import { useUserData } from "@/hooks/useUserData";
import { useUserCartItems } from "@/hooks/useUserCartItems";
import { useAddrStore } from "@/zustand/addrStore";
import { useRouter } from "next/navigation";
import QuantityCount from "./QuantityCount";

export type DataType = {
  amount: number;
  created_at: string;
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
  const saveCartItems = useUserCartItems(userId);
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
    //allCartItems isChecked true 인것만
    // map돌면서 ItemType 배열 생성

    const test = allCartItems
      .filter((item) => item.isChecked === true)
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
    // console.log(`구매 수량: ${quantity}`);
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
    setAllCartItems((item) => item.map((item) => ({ ...item, isChecked: true })));
  };

  const updateItemQuantity = (updateItem: DataType, count: number) => {
    if (count < 1) return;
    setAllCartItems((item) =>
      item.map((item) => (item.id === updateItem.id ? { ...item, quantity: count } : { ...item }))
    );
  };

  useEffect(() => {
    if (!allCartItems || !allCartItems.length) return;
    let checked = true;
    if (allCartItems.some((item) => !item.isChecked)) {
      checked = false;
    }
    setAllChecked(checked);
  }, [allCartItems]);

  // 전체선택
  const selectAllHandler = (checked: boolean) => {
    if (checked) {
      addAllItems();
    } else {
      removeAllItems();
    }
    setAllChecked(checked);
  };

  const CheckboxChangeHandler = (item: DataType) => {
    if (item.isChecked) {
      removeItem(item);
    } else {
      addItems(item);
    }
  };
  /** 아이템 삭제 업데이트 */
  const removeItemFromState = (product_id: string) => {
    setAllCartItems((prevItems) => prevItems.filter((item) => item.product_id !== product_id));
  };
  /** 주문 총금액 확인 함수 */
  const getTotalAmount = () => {
    return allCartItems
      ?.filter((item) => item.isChecked)
      .reduce((total, item) => total + item.amount * item.quantity, 0);
  };

  return (
    <div className="w-full p-4">
      <div className="flex items-center gap-2 p-2 border-b-2 border-[#EAECEC]">
        <label>
          <input
            type="checkbox"
            readOnly
            name="product-all"
            className="mr-1"
            checked={allChecked}
            onClick={(e: any) => {
              selectAllHandler(e.target.checked);
            }}
          />
          전체상품
        </label>
        <button className="ml-auto mb-[20px] px-2 py-1 rounded text-[#1A82FF]">삭제</button>
      </div>

      {allCartItems?.map((item: DataType) => (
        <QuantityCount
          key={item.id}
          item={item}
          CheckboxChangeHandler={CheckboxChangeHandler}
          updateItemQuantity={updateItemQuantity}
          removeItemFromState={removeItemFromState}
        />
      ))}

      <div className=" w-full p-4">
        <div className="flex justify-between mb-2">
          <p>상품 금액</p>
          <p>{getTotalAmount()?.toLocaleString()}</p>
        </div>
        <div className="flex justify-between">
          <p>배송비</p>
          <p>3,000원</p>
        </div>
        <hr className="my-5" />
        <div className="flex justify-between">
          <p>결제 예정 금액</p>
          <p>{(getTotalAmount() + 3000)?.toLocaleString()}원</p>
        </div>
        <button onClick={handleBuy} className="w-full mt-4 py-2 rounded-md bg-[#1A82FF] text-white">
          구매하기
        </button>
      </div>
    </div>
  );
}

export default Cart;
