"use client";

import React from "react";
import XIcon from "../../../public/icon/XIcon.svg";
import { useLoadOrders } from "@/hooks/useInfiniteData";
import { productListType } from "./MyOrderedList";
import ItemInMore from "./ItemInMore";

interface Props {
  title: string;
  isClicked: boolean;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
  id?: string;
}

const More = ({ title, isClicked, setIsClicked, id }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useLoadOrders(id!);

  const closeWithBg = () => {
    setIsClicked(false);
  };

  return (
    <div
      className={`${isClicked ? "block" : "hidden"} fixed top-0 left-0 bg-[#3436378C] w-full h-full xl:shadow-2xl z-50`}
    >
      <div className="absolute gap-[24px] xl:top-1/2 xl:left-1/2 w-full h-full xl:w-[450px] xl:h-[550px] xl:ml-[-225px] xl:mt-[-275px] bg-[#fffffe] xl:shadow-md xl:rounded-[24px] flex flex-col p-[24px]">
        <div className="flex justify-between">
          <h3 className="text-[20px] font-[700]">{title}</h3>
          <button onClick={closeWithBg}>
            <XIcon />
          </button>
        </div>
        <section className="xl:h-[calc(600px-112px)] overflow-y-auto scrollbar-hide">
          <div className="flex flex-col gap-[8px]">
            {data?.pages.map((page, idx) => (
              <div key={idx} className="flex flex-col gap-[8px]">
                {page.flat().map((order, pageIdx) => (
                  <ul key={pageIdx} className="flex flex-col gap-[8px]">
                    {order?.product_list.map((product, productIdx) => (
                      <div key={productIdx} className="mb-[18px] last:mb-0">
                        <h3 className="text-[14px] border-b-2 pb-[8px]">{`${
                          order?.created_at.split("-")[1]
                        }월 ${order?.created_at.split("-")[2].slice(0, 2)}일 `}</h3>
                        <ItemInMore
                          key={product.id}
                          item={product as productListType}
                          delivery={order?.delivery!}
                          paymentId={order?.paymentId}
                        />
                      </div>
                    ))}
                  </ul>
                ))}
              </div>
            ))}
            <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
              {isFetchingNextPage ? (
                <div className="bg-gray-100 text-gray-400 w-full py-[20px] text-[12px] rounded-t-[12px]">
                  목록을 가져오는 중...
                </div>
              ) : hasNextPage ? (
                <div className="bg-gray-100 text-gray-400 w-full py-[20px] text-[12px] rounded-t-[12px]">더 보기</div>
              ) : (
                ""
              )}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default More;
