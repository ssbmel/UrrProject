function TotalAmount() {
  return (
    <div className="border w-full h-[200px] gap-5 p-4">
      <div className="flex justify-between">
        <p>상품 금액</p>
        <p>000원</p>
      </div>
      <div className="flex justify-between">
        <p>배송비</p>
        <p>000원</p>
      </div>
      <div className="flex justify-between">
        <p>결제 예정 금액</p>
        <p>000원</p>
      </div>
      <button className="w-full mt-4 py-2 rounded-md bg-blue-500 text-white">구매하기</button>
    </div>
  );
}

export default TotalAmount;
