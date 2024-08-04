"use client";

import Image from "next/image";
import { useState } from "react";
import { useUserData } from "@/hooks/useUserData";
import { useUserCartItems } from "@/hooks/useUserCartItems";
import { useAddrStore } from "@/zustand/addrStore";
import { useRouter } from "next/navigation";
import { CartItems } from "../../../../types/common";

function Cart() {
  const [count, setCount] = useState(0);
  const { data: userData } = useUserData();
  const userId = userData?.id;
  const allCartItems = useUserCartItems(userId);
  const { setProductList } = useAddrStore();
  const router = useRouter();

  const addCount = () => {
    setCount(count + 1);
  };

  const minusCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const test = allCartItems?.map((item: any) => ({
    id: item.product_id,
    name: item.name,
    amount: item.amount,
    quantity: item.quantity,
    imgUrl: item.main_img
  }));

  console.log(test);
  const handleBuy = () => {
    // 여기에 구매 로직 추가
    setProductList(test);
    router.push(`/payment`);
    // console.log(`구매 수량: ${quantity}`);
  };

  return (
    <div className="w-full p-4 mb-[80px]">
      <div className="flex items-center gap-2 p-2">
        <input type="checkbox" name="product-all" />
        <p>전체상품</p>
        <button className="ml-auto px-2 py-1 rounded text-[#1A82FF]">삭제</button>
      </div>

      <hr className="my-4" />
      {allCartItems?.map((item: CartItems) => (
        <div key={item.id} className="border flex items-center gap-4 p-2 mb-4">
          <input type="checkbox" name="product" />
          <Image src={item.main_img} alt="image" width={100} height={100} className="object-cover" />
          <div className="flex flex-col gap-1">
            <p className="font-medium">{item.nickname}</p>
            <p className="text-gray-500">{item.name}</p>
            <p className="text-gray-700 font-bold">{item.amount}</p>
          </div>
          <div className="grid ml-auto gap-5">
            <button className="ml-auto px-2 py-1 rounded">✖︎</button>
            <div className="border flex w-[60px] px-2 justify-center gap-2">
              <button onClick={minusCount}>-</button>
              <p>{count}</p>
              <button onClick={addCount}>+</button>
            </div>
          </div>
        </div>
      ))}

      <div className="border w-full p-4">
        <div className="flex justify-between mb-2">
          <p>총 상품 금액</p>
          <p>000원</p>
        </div>
        <div className="flex justify-between">
          <p>배송비</p>
          <p>3,000원</p>
        </div>
        <hr className="my-5" />
        <div className="flex justify-between">
          <p>결제 예정 금액</p>
          <p>000원</p>
        </div>
        <button onClick={handleBuy} className="w-full mt-4 py-2 rounded-md bg-[#1A82FF] text-white">
          구매하기
        </button>
      </div>
    </div>
  );
}

export default Cart;
