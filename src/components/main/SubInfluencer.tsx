import React from 'react';

function SubInfluencer() {
  return (
    <>
      <div className="border w-full h-[200px] mx-auto p-2">
        <h2 className="font-bold my-2 text-xl">내가 구독한 인플루언서</h2>
        <div className="overflow-x-auto flex gap-10 p-2">
          <div className="gird w-[80px] text-center">
            <div className="bg-gray-100 rounded-md w-[80px] h-[80px]"></div>
            <p>우르르</p>
          </div>
          <div className="gird w-[80px] text-center">
            <div className="bg-gray-100 rounded-md w-[80px] h-[80px]"></div>
            <p>우르르</p>
          </div>
          <div className="gird w-[80px] text-center">
            <div className="bg-gray-100 rounded-md w-[80px] h-[80px]"></div>
            <p>우르르</p>
          </div>
          <div className="gird w-[80px] text-center">
            <div className="bg-gray-100 rounded-md w-[80px] h-[80px]"></div>
            <p>우르르</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubInfluencer;
