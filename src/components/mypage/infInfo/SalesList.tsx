import React from "react";

const SalesList = () => {
  return (
    <div>
      <div>
        <h2>{"진행중인 공구" ? "진행중인 공구" : "진행했던 공구"}</h2>
      </div>
      <ul>
        <li>
          <img src="" alt="상품 이미지" />
          <p>inf 이름</p>
          <h3>상품 이름</h3>
          <p>
            <span>sale</span>
            <span>00,000</span>원
          </p>
        </li>
      </ul>
    </div>
  );
};

export default SalesList;
