import React from "react"
import Category from "./Category"
import PricePeriod from "./PricePeriod"
import Contents from "./Contents"
import "./style.css";

function ProductUpload() {
  return (
    <form>
      <Category/>
      <PricePeriod/>
      <Contents/>
      <button className="bg-blue-700 text-white p-2 rounded-md">등록하기</button>
    </form>
  )
}

export default ProductUpload