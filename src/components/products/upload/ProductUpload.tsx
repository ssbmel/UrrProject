"use client";

import React, { useEffect, useRef, useState } from "react";
import Category from "./Category";
import PricePeriod from "./PricePeriod";
import Contents from "./Contents";
import "./style.css";
import { createClient } from "../../../../supabase/client";
import { Product } from "../../../../types/common";
import { v4 as uuidv4 } from "uuid";
import { useParams, useRouter } from "next/navigation";
import { useUserData } from "@/hooks/useUserData";
import { useMutation } from "@tanstack/react-query";

export type DetailedImgGroup = { file: File | null; url: string };
interface PostData {
  id: string;
  start: string;
  end: string;
  cost: string;
  price: string;
  product_count: string;
  title: string;
  text: string;
  category: string;
  main_img: string;
  detail_img: string[];
  user_id : string;
  created_at: string;
  nickname: string;
}

function ProductUpload() {
  const supabase = createClient();
  const [radioCheckedValue, setRadioCheckedValue] = useState<string>("");
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const costRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const productCountRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [detailImg, setDetailImg] = useState<DetailedImgGroup[]>([]);
  const [mainImg, setMainImg] = useState<File | null>(null);
  const [uploadedMainImg, setUploadedMainImg] = useState("");
  const [uploadedDetailImg, setUploadedDetailImg] = useState<DetailedImgGroup[]>([]);
  const { data: user } = useUserData();
  const router = useRouter();
  const { id } = useParams();

  const getPostData = async () => {
    const response = await fetch("/api/products");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: PostData[] = await response.json();
    const post: PostData | undefined = data.find((post) => post.id === id);
    if (!post) {
      return;
    }
    if (startDateRef.current) startDateRef.current.value = post.start;
    if (endDateRef.current) endDateRef.current.value = post.end;
    if (costRef.current) costRef.current.value = post.cost;
    if (priceRef.current) priceRef.current.value = post.price;
    if (productCountRef.current) productCountRef.current.value = post.product_count;
    if (titleRef.current) titleRef.current.value = post.title;
    if (textRef.current) textRef.current.value = post.text;
    setRadioCheckedValue(post.category);
    setUploadedMainImg(post.main_img);
    const structuredArr = post.detail_img.map((a: string) => ({
      file: null,
      url: a
    }));
    setUploadedDetailImg(structuredArr);
  };

  useEffect(() => {
    if (id !== "new") {
      getPostData();
    }
  }, [id]);

  const savePost = async (data: PostData) => {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  };

  const editPost = async (data: PostData) => {
    const response = await fetch("/api/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  };

  const { mutate: saveMutation } = useMutation<Product, unknown, PostData>({
    mutationFn: (data: PostData) => (id === "new" ? savePost(data) : editPost(data)),
  });

  const uploadMainImg = async (postId: string): Promise<string | null> => {
    if (!mainImg) {
      return null;
    }
    const ext = mainImg.name.split(".").pop();
    const newFileName = `${uuidv4()}.${ext}`;
    const { data, error } = await supabase.storage.from("products").upload(`${postId}/mainImg/${newFileName}`, mainImg);
    if (error) {
      console.log(`파일이 업로드 되지 않습니다.${error}`);
      return null;
    }
    const res = await supabase.storage.from("products").getPublicUrl(data.path);
    return res.data.publicUrl;
  };

  const uploadDetailImages = async (postId: string): Promise<string[]> => {
    const uploads = detailImg.map(async (detail) => {
      if (!detail.file) return detail.url;

      const ext = detail.file.name.split(".").pop();
      const newFileName = `${uuidv4()}.${ext}`;
      const { data, error } = await supabase.storage
        .from("products")
        .upload(`${postId}/detailImages/${newFileName}`, detail.file);
      if (error) {
        console.log(`파일이 업로드 되지 않습니다.${error}`);
        return null;
      }
      const res = await supabase.storage.from("products").getPublicUrl(data.path);
      return res.data.publicUrl;
    });
    const resList = await Promise.all(uploads);
    return resList.filter((url): url is string => url !== null);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      return;
    }
    const postId = uuidv4();
    const mainImgId = (await uploadMainImg(postId)) || "";
    const detailImgId = await uploadDetailImages(postId);

    const productData: PostData = {
      category: radioCheckedValue,
      start: startDateRef.current?.value || "",
      end: endDateRef.current?.value || "",
      cost: costRef.current?.value || "",
      price: priceRef.current?.value || "",
      product_count: productCountRef.current?.value || "",
      title: titleRef.current?.value || "",
      text: textRef.current?.value || "",
      detail_img: detailImgId,
      main_img: mainImgId,
      user_id: user.id,
      created_at: new Date().toISOString(),
      id: id === "new" ? postId : (id as string),
      nickname: user.nickname
    };

    if (
      !productData.category ||
      !productData.start ||
      !productData.end ||
      !productData.cost ||
      !productData.price ||
      !productData.product_count ||
      !productData.title ||
      !productData.text ||
      !productData.detail_img ||
      !productData.main_img
    ) {
      alert("상품 정보를 입력해주세요.");
      return;
    } 
    saveMutation(productData);
    router.push("/products/list");

    // const { data, error } = await supabase.from("products").insert([productData]).select();
    // if (error) {
    //   console.error("Error inserting data:", error);
    // } else {
    //   saveMutation(productData);
    //   router.push("/products/list");
    // }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="p-5 max-w-[1200px] mx-auto grid gap-5">
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
          uploadedMainImg={uploadedMainImg}
          uploadedDetailImg={uploadedDetailImg}
          setMainImg={setMainImg}
        />
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-sm my-5 ">
            등록하기
          </button>
        </div>
      </div>
    </form>
  );
}

export default ProductUpload;
