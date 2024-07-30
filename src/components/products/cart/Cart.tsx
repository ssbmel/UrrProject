import Image from "next/image";
import defaultImg from "../../../../public/images/default.png";
import TotalAmount from "./TotalAmount";
function Cart() {
  return (
    <div className="w-full p-2">
      <div className="border flex gap-2 items-center">
        <input type="checkbox" />
        <p>전체상품</p>
        <button className="ml-auto">삭제</button>
      </div>
      <hr />
      <div className="border w-full flex gap-2">
        <input type="checkbox" />
        <Image src={defaultImg} alt="image" width={100} />
        <div className="">
          <p>인플루언서명</p>
          <p>상품명</p>
          <p>가격</p>
        </div>
        <div className="ml-auto">
          <button>삭제</button>
        </div>
      </div>
      <TotalAmount />
    </div>
  );
}

export default Cart;
