"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Error from "../common/error/Error";
import { PublicUser } from "../../../types/auth.type";
import { getProductDetailByUserId } from "@/services/products/detail/productDetail.service";
import { Product } from "../../../types/common";
import Image from "next/image";
import WriteIcon from "../../../public/icon/writeIcon.svg";
import TrashCanIcon from "../../../public/icon/trashcanIcon.svg";
import { useMutation } from "@tanstack/react-query";

interface Props {
  user: PublicUser;
}

const InfSaleList = ({ user }: Props) => {
  const [items, setItems] = useState<Product[]>([]);
  const onGoingStyle =
    "min-w-[58px] text-center bg-[#80BAFF] rounded-[50px] text-[12px] px-[8px] py-[2px] text-[#FFFFFE]";
  const endStyle = "min-w-[58px] text-center bg-[#CDCFD0] rounded-[50px] text-[12px] px-[8px] py-[2px] text-[#FFFFFE]";

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProductDetailByUserId(user.id);
      setItems(data);
    };
    if (user?.id) {
      fetchData();
    }
  }, []);

  const deletePost = async (data: { id: string }) => {
    const response = await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      console.log(`삭제되지 않습니다.${response.status}`);
      return false;
    }
    return true;
  };

  const { mutate: deleteMutation } = useMutation<boolean, unknown, { id: string }>({
    mutationFn: (data) => deletePost(data),
    onSuccess: (success, variables) => {
      if (success) {
        setItems((prevItems) => prevItems.filter((item) => item.id !== variables.id));
      }
    }
  });

  const handleDelete = async (id: string) => {
    swal({
      title: "해당 상품을 삭제할까요?",
      text: "삭제하면 다시 복구할 수 없습니다.",
      icon: "warning",
      buttons: ["취소", "삭제"]
    }).then((willDelete) => {
      if (willDelete) {
        deleteMutation({ id });
        swal("상품이 삭제되었습니다.", {
          icon: "success"
        });
      } else {
        swal("삭제가 취소되었습니다.");
      }
    });
  };

  return (
    <>
      {items?.length > 0 ? (
        <div>
          <ul>
            {items.map((item, index) => (
              <li
                key={index}
                className="text-[14px] border-b flex flex-col last:border-none"
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-[12px] items-center w-[calc(100%-80px)] xl:my-[36px]">
                    <div className="relative w-[56px] h-[56px] xl:w-[100px] xl:h-[100px]">
                      <Image
                        src={item.main_img || ""}
                        alt={item.title || "product_main_img"}
                        sizes="56px xl:100px"
                        fill
                        priority
                        className="bg-slate-300 w-[56px] h-[56px] xl:w-[100px] xl:h-[100px] rounded-[6px] object-cover"
                      />
                    </div>
                    <div className="flex flex-col w-[calc(100%-68px)] xl:text-[18px] font-[400] xl:gap-[33px]">
                      <div className="flex items-center w-full gap-[4px]">
                        <span className="whitespace-nowrap text-ellipsis overflow-hidden font-[400]">
                          {item.title?.split("]")[1]}
                        </span>
                        <span className={new Date() > new Date(item.end) ? endStyle : onGoingStyle}>
                          {new Date() > new Date(item.end) ? "종료" : "진행 중"}
                        </span>
                      </div>
                      <p className="text-[12px] xl:text-[16px] text-[#B2B5B8]">
                        ~ {`${item.end.split("-")[0].slice(2)}.${item.end.split("-")[1]}.${item.end.split("-")[2]}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center xl:flex-col xl:gap-[8px] text-center">
                    {new Date() > new Date(item.end) ? null : (
                      <Link
                        href={`/products/upload/${item.id}`}
                        className="xl:w-[112px] xl:h-[44px] xl:py-[12px] xl:px-[28px] xl:border xl:border-[#EAECEC] xl:rounded-[8px] xl:hover:bg-primarylightness transition-colors"
                      >
                        <span className="xl:hidden">
                          <WriteIcon />
                        </span>
                        <span className="text-[#0068E5] font-[600] hidden xl:block">수정하기</span>
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="xl:w-[112px] xl:h-[44px] xl:py-[12px] xl:px-[28px] xl:bg-[#EAECEC] xl:rounded-[8px] xl:hover:bg-red-100 transition-colors"
                    >
                      <span className="xl:hidden">
                        <TrashCanIcon />
                      </span>
                      <span className="text-[#0068E5] font-[600] hidden xl:block">삭제하기</span>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Error>
          <div className="flex flex-col text-center justify-center items-center gap-[20px]">
            <div className="flex flex-col text-center justify-center items-center">
              <span>등록된 상품이 없습니다.</span>
            </div>
            <Link
              href="/products/upload/new"
              className="xl:hidden border p-[7px] pr-[14px] pl-[14px] text-[14px] rounded-[4px] text-[#0068E5]"
            >
              상품 등록하기
            </Link>
          </div>
        </Error>
      )}
    </>
  );
};

export default InfSaleList;
