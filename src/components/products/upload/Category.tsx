"use client"

import { useState } from "react";

function Category() {
  const [categoryList, setCategoryList] = useState([]);

  const category = [
    {id:0, title: "패션의류/잡화", name: "fashion"},
    {id:1, title: "뷰티", name: "beauty"},
    {id:2, title: "식품", name: "food"},
    {id:3, title: "생활용품", name: "living"},
    {id:4, title: "가전/디지털", name: "digital"},
    {id:5, title: "스포츠/레저", name: "sports"},
    {id:6, title: "취미/도서", name: "hobbies"},
    {id:7, title: "반려동물용품", name: "pets"},
    {id:8, title: "헬스/건강식품", name: "health"},
    {id:9, title: "여행/티켓", name: "travel"},
  ]


  return (
    <div>카테고리</div>
  );
}

export default Category