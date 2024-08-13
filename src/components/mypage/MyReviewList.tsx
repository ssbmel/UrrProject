"use client";

import React, { useState } from "react";
import Error from "../common/error/Error";
import Image from "next/image";
import TrashCan from "../../../public/icon/trashcanIcon.svg";

interface Temp {
  img: string;
  created_at: string;
  title: string;
}

const MyReviewList = () => {
  const [items, setItems] = useState<Temp[]>([
    {
      img: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmlzaHxlbnwwfHwwfHx8MA%3D%3D",
      created_at: "2024-08-02 14:37:42.919532+09",
      title: "후기를 써보려고 합니다 아아아아아아아아아아아아"
    }
  ]);
  const handleDelete = async () => {};

  return (
    <>
      {items ? (
        <div>
          <ul>
            {items
              ? items.map((item, index) => (
                  <li key={index} className="pt-[18px] pb-[18px] text-[14px] border-b flex flex-col gap-[18px]">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex items-center w-[calc(100%-58px)] gap-[12px]">
                        <div className="relative w-[56px] h-[56px] rounded-[6px]">
                          <Image
                            src={item.img}
                            alt="product_review_image"
                            fill
                            sizes="56px"
                            priority
                            className="bg-slate-300 rounded-[6px] object-cover"
                          />
                        </div>
                        <div className="flex flex-col gap-[6px] w-[calc(100%-90px)]">
                          <h3 className="font-[400] overflow-hidden text-ellipsis whitespace-nowrap">{item.title}</h3>
                          <p className="text-[12px] text-[#B2B5B8]">{item.created_at.split(" ")[0]}</p>
                        </div>
                      </div>
                      <button onClick={handleDelete} className="p-[9px]">
                        <TrashCan />
                      </button>
                    </div>
                  </li>
                ))
              : null}
          </ul>
        </div>
      ) : (
        <Error>
          <span>리뷰 작성 내역이 없습니다.</span>
        </Error>
      )}
    </>
  );
};

export default MyReviewList;
