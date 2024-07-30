import Image from "next/image";
import defaultImg from "../../../../public/images/default.png";
import TotalAmount from "./TotalAmount";

function Cart() {
  return (
    <div className="w-full p-4">
      <div className="flex items-center gap-2 p-2">
        <input type="checkbox" />
        <p>전체상품</p>
        <button className="ml-auto px-2 py-1 rounded">삭제</button>
      </div>
      <hr className="my-4" />
      <div className="border flex items-center gap-4 p-2 mb-4">
        <input type="checkbox" />
        <Image src={defaultImg} alt="image" width={100} height={100} className="object-cover" />
        <div className="flex flex-col gap-1">
          <p className="font-medium">인플루언서명</p>
          <p className="text-gray-500">상품명</p>
          <p className="text-gray-700 font-bold">가격</p>
        </div>
        <button className="ml-auto px-2 py-1 rounded">삭제</button>
      </div>
      <TotalAmount />
    </div>
  );
}

export default Cart;
