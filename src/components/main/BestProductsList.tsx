import Link from "next/link";
import Image from "next/image";
import defaultImg from "../../../public/images/default.png";

function BestProductsList() {
  return (
    <>
      <div className="w-full h-auto mx-auto p-2">
        <div className="flex mb-5">
          <h2 className="font-bold text-xl">인기상품</h2>
          <Link className="ml-auto text-xs flex-end" href={"/products/list"}>
            <button>더보기</button>
          </Link>
        </div>
        <div className="w-full h-[90%] p-2 overflow-x-auto flex flex-nowrap gap-10">
          <div className="w-[200px] flex flex-col gap-y-2">
            <Image src={defaultImg} alt="" width={200} />
            <p className="text-gray-500 text-sm">인플루언서</p>
            <p className="text-lg">상품명</p>
            <p className="font-bold">상품가격</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default BestProductsList;
