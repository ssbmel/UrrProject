function BestProductsList() {
  return (
    <>
      <div className="border w-full h-auto mx-auto p-2">
        <div className="flex">
          <h2 className="font-bold my-2 text-xl">인기상품</h2>
          <button className="ml-auto">더보기</button>
        </div>
        <div className="w-full h-[90%] p-2 overflow-y-auto flex gap-10">
          <div className="w-[200px] flex flex-col gap-y-2">
            <div className="border w-[200px] h-[200px] rounded-md"></div>
            <p className="text-gray-500 text-sm">인플루언서</p>
            <p className="text-lg">상품명</p>
            <p className="font-bold">상품가격</p>
          </div>
          <div className="w-[200px] flex flex-col gap-y-2">
            <div className="border w-[200px] h-[200px] rounded-md"></div>
            <p className="text-gray-500 text-sm">인플루언서</p>
            <p className="text-lg">상품명</p>
            <p className="font-bold">상품가격</p>
          </div>
          <div className="w-[200px] flex flex-col gap-y-2">
            <div className="border w-[200px] h-[200px] rounded-md"></div>
            <p className="text-gray-500 text-sm">인플루언서</p>
            <p className="text-lg">상품명</p>
            <p className="font-bold">상품가격</p>
          </div>
          <div className="w-[200px] flex flex-col gap-y-2">
            <div className="border w-[200px] h-[200px] rounded-md"></div>
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
