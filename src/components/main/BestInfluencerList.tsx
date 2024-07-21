import React from 'react';

function BestInfluencerList() {
  return (
    <div className="border w-[70%] h-[500px] mx-auto p-5">
      <h2 className="font-bold my-3">현재 인기 인플루언서</h2>
      <div className="w-full h-[400px] overflow-y-auto">
        <div className="border rounded-md bg-gray-300 w-full min-h-[100px] mx-auto p-5 grid grid-rows-1 grid-flow-col mb-4">
          <div className="bg-gray-100 rounded-md w-[80px] h-[80px]">이미지</div>
          <div>
            <p className="mb-2">인싸우르르</p>
            <p className="mb-2">#OOO</p>
          </div>
          <p className="self-center">60,000</p>
          <button className="self-center ml-auto">구독하기</button>
        </div>
        <div className="border rounded-md bg-gray-300 w-full min-h-[100px] mx-auto p-5 grid grid-rows-1 grid-flow-col mb-4">
          <div className="bg-gray-100 rounded-md w-[80px] h-[80px]"></div>
          <div>
            <p className="mb-2">인싸우르르</p>
            <p className="mb-2">#OOO</p>
          </div>
          <p className="self-center">60,000</p>
          <button className="self-center ml-auto">구독하기</button>
        </div>
        <div className="border rounded-md bg-gray-300 w-full min-h-[100px] mx-auto p-5 grid grid-rows-1 grid-flow-col mb-4">
          <div className="bg-gray-100 rounded-md w-[80px] h-[80px]"></div>
          <div>
            <p className="mb-2">인싸우르르</p>
            <p className="mb-2">#OOO</p>
          </div>
          <p className="self-center">60,000</p>
          <button className="self-center ml-auto">구독하기</button>
        </div>
        <div className="border rounded-md bg-gray-300 w-full min-h-[100px] mx-auto p-5 grid grid-rows-1 grid-flow-col mb-4">
          <div className="bg-gray-100 rounded-md w-[80px] h-[80px]"></div>
          <div>
            <p className="mb-2">인싸우르르</p>
            <p className="mb-2">#OOO</p>
          </div>
          <p className="self-center">60,000</p>
          <button className="self-center ml-auto">구독하기</button>
        </div>
        
      </div>
    </div>
  );
}

export default BestInfluencerList;
