import React from 'react';

const Tabs = () => {
  return (
    <div>
      <div className="w-full">
        <div className="flex text-center">
          <button className="w-[50%] p-2 border-b-4 border-transparent transition-colors hover:border-b-gray-400">
            쇼핑
          </button>
          <button className="w-[50%] p-2 border-b-4 border-transparent transition-colors hover:border-b-gray-400">
            활동
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
