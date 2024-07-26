"use client";

import React, { useEffect, useRef, useState } from "react";
import Category from "./Category";
import PricePeriod from "./PricePeriod";
import Contents from "./Contents";
import "./style.css";
import { createClient } from "../../../../supabase/client";
import { Product } from "../../../../types/common";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { useUserData } from "@/hooks/useUserData";

const supabase = createClient();

function ProductUpload() {
  const [radioCheckedValue, setRadioCheckedValue] = useState<string>("");
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const costRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const productCountRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [detailImg, setDetailImg] = useState<File[]>([]);
  const [mainImg, setMainImg] = useState<File | null>(null);
  const { data: user } = useUserData();
  const router = useRouter(); 

  const uploadMainImg = async (postId : string ): Promise<string | null> => {
    if (!mainImg) {
      return null;
    }
    const ext = mainImg?.name.split(".").pop();
    const newFileName = `${uuidv4()}.${ext}`;
    const { data, error } = await supabase.storage.from("products").upload(`${postId}/mainImg/${newFileName}`, mainImg);
    if (error) {
      console.log(`파일이 업로드 되지 않습니다.${error}`);
      return null;
    }
    const res = await supabase.storage.from("products").getPublicUrl(data.path);
    return res.data.publicUrl;
  };

  const uploadDetailImages = async (postId: string): Promise<(string | null)[]> => {
    const uploads = detailImg.map(async (detail) => {
      const ext = detail.name.split(".").pop();
      const newFileName = `${uuidv4()}.${ext}`;
      const { data, error } = await supabase.storage.from("products").upload(`${postId}/detailImages/${newFileName}`, detail);
      if (error) {
        console.log(`파일이 업로드 되지 않습니다.${error}`);
        return null;
      }
      const res = await supabase.storage.from("products").getPublicUrl(data.path);
      return res.data.publicUrl;
    });
    const resList = await Promise.all(uploads);
    return resList;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      return;
    }
    const postId = uuidv4();
    const mainImgId = (await uploadMainImg(postId)) || "";
    const detailImgId = (await uploadDetailImages(postId)) || "";
    const productData: Product = {
      category: radioCheckedValue,
      start: startDateRef.current?.value || null,
      end: endDateRef.current?.value || null,
      cost: costRef.current?.value ? parseInt(costRef.current?.value) : null,
      price: priceRef.current?.value ? parseInt(priceRef.current?.value) : null,
      product_count: productCountRef.current?.value ? parseInt(productCountRef.current?.value) : null,
      title: titleRef.current?.value || null,
      text: textRef.current?.value || null,
      detail_img: JSON.stringify(detailImgId),
      main_img: mainImgId,
      user_id: user?.id,
      created_at: new Date().toISOString(),
      id: postId
    };

    const { data, error } = await supabase.from("products").insert([productData]).select();
    if (error) {
      console.error("Error inserting data:", error);
    } else {
      console.log("Data inserted:", data);
      router.push("/products/list");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="p-5 max-w-[1200px] mx-auto">
        <Category radioCheckedValue={radioCheckedValue} setRadioCheckedValue={setRadioCheckedValue} />
        <PricePeriod
          startDateRef={startDateRef}
          endDateRef={endDateRef}
          costRef={costRef}
          priceRef={priceRef}
          productCountRef={productCountRef}
        />
        <Contents
          titleRef={titleRef}
          textRef={textRef}
          detailImg={detailImg}
          setDetailImg={setDetailImg}
          mainImg={mainImg}
          setMainImg={setMainImg}
        />
        <div className="flex justify-end">
          <button className="bg-blue-500 text-white p-2 rounded-sm my-5">등록하기</button>
        </div>
      </div>
    </form>
  );
}

export default ProductUpload;
