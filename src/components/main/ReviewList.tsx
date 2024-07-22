import React from 'react';

function ReviewList() {
  return (
    <div className="border w-full max-h-[400px] mx-auto p-2">
      <div className="flex">
        <h2 className="font-bold my-2 text-xl">후기</h2>
        <button className="ml-auto">더보기</button>
      </div>
      <div className="w-full h-[300px] overflow-y-auto flex flex-col gap-y-4">
        <div className="flex gap-3">
          <div className="border w-[130px] h-[130px] rounded-md"></div>
          <div className="flex flex-col w-1/2">
            <p className="font-bold">[우르르]상품명</p>
            <p>너무 좋아요! 너무 좋아요! 너무 좋아요!</p>
            <p className="text-xs text-gray-400 mt-auto">닉네임 | 작성날짜</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="border w-[130px] h-[130px] rounded-md"></div>
          <div className="flex flex-col w-1/2">
            <p className="font-bold">[우르르]상품명</p>
            <p>너무 좋아요! 너무 좋아요! 너무 좋아요!</p>
            <p className="text-xs text-gray-400 mt-auto">닉네임 | 작성날짜</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="border w-[130px] h-[130px] rounded-md"></div>
          <div className="flex flex-col w-1/2">
            <p className="font-bold">[우르르]상품명</p>
            <p>너무 좋아요! 너무 좋아요! 너무 좋아요!</p>
            <p className="text-xs text-gray-400 mt-auto">닉네임 | 작성날짜</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="border w-[130px] h-[130px] rounded-md"></div>
          <div className="flex flex-col w-1/2">
            <p className="font-bold">[우르르]상품명</p>
            <p>너무 좋아요! 너무 좋아요! 너무 좋아요!</p>
            <p className="text-xs text-gray-400 mt-auto">닉네임 | 작성날짜</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewList;
