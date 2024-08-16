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
import swal from "sweetalert";

export type DetailedImgGroup = { file: File | null; url: string };

function ProductUpload() {
  const supabase = createClient();
  const [radioCheckedValue, setRadioCheckedValue] = useState<string>("");
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const costRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const productCountRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  ``;
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [detailImg, setDetailImg] = useState<DetailedImgGroup[]>([]);
  const [mainImg, setMainImg] = useState<File | null>(null);
  const [uploadedMainImg, setUploadedMainImg] = useState("");
  const { data: user } = useUserData();
  const router = useRouter();
  const { id } = useParams();

  const getPostData = async () => {
    const response = await fetch("/api/products");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Product[] = await response.json();
    const post = data.find((post) => post.id === id);

    if (!post) {
      return;
    }
    if (startDateRef.current) startDateRef.current.value = post.start || "";
    if (endDateRef.current) endDateRef.current.value = post.end || "";
    if (costRef.current) costRef.current.value = post.cost?.toString() || "";
    if (priceRef.current) priceRef.current.value = post.price?.toString() || "";
    if (productCountRef.current) productCountRef.current.value = post.product_count?.toString() || "";
    if (titleRef.current) titleRef.current.value = post.title || "";
    if (textRef.current) textRef.current.value = post.text || "";
    setRadioCheckedValue(post.category || "");
    setUploadedMainImg(post.main_img || "");
    const detailImgGroup = post.detail_img?.map<DetailedImgGroup>((imgUrl: string) => ({ file: null, url: imgUrl }));
    setDetailImg(detailImgGroup || []);
  };

  useEffect(() => {
    if (id !== "new") {
      getPostData();
    }
  }, [id]);

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

  const uploadDetailImages = async (postId: string): Promise<string[] | null> => {
    if (!detailImg.length) {
      return null;
    }
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

  const savePost = async (data: Product) => {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return response.json();
  };

  const editPost = async (data: Product) => {
    const response = await fetch("/api/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return response.json();
  };

  const { mutate: saveMutation } = useMutation<Product, unknown, Product>({
    mutationFn: (data) => (id === "new" ? savePost(data) : editPost(data))
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      return;
    }
    const postId = uuidv4();
    const mainImgId = (await uploadMainImg(postId)) || uploadedMainImg;
    const detailImgId = await uploadDetailImages(postId);

    const productData: Product = {
      category: radioCheckedValue || "", // Ensure category is a string
      start: startDateRef.current?.value as string, // Use null if the value is an empty string
      end: endDateRef.current?.value as string, // Use null if the value is an empty string
      cost: parseInt(costRef.current?.value || "0"), // Ensure cost is a number
      price: parseInt(priceRef.current?.value || "0"), // Ensure price is a number
      product_count: parseInt(productCountRef.current?.value || "0"), // Ensure product_count is a number
      title: titleRef.current?.value || "", // Ensure title is a string
      text: textRef.current?.value || "", // Ensure text is a string
      detail_img: detailImgId || [], // Ensure detail_img is an array of strings
      main_img: mainImgId || "", // Ensure main_img is a string
      user_id: user.id || "", // Ensure user_id is a string
      created_at: new Date().toISOString(),
      id: id === "new" ? postId : id as string,  // Ensure id is a string
      nickname: user.nickname || "" // Ensure nickname is a string
    };

    if (
      !productData.category ||
      !productData.start ||
      !productData.end ||
      !productData.cost ||
      !productData.price ||
      !productData.product_count ||
      !productData.title ||
      !productData.text
    ) {
      swal("상품 정보를 입력해주세요.");
      return;
    }

    const { data, error } = await supabase.from("products").upsert([productData]).select();
    if (error) {
      console.error("Error inserting data:", error);
    } else {
      swal("상품등록 성공!", "등록이 완료되었습니다.", "success");
      saveMutation(productData);
      router.push("/products/list");
    }
  };

  return (
    <form onSubmit={onSubmit}>
       <div className="w-full bg-[#fffffe] flex justify-end xl:max-w-[1200px] xl:mx-auto">
          <button
            type="submit"
            className="bg-[#FFFFFE] text-[#0068E5] border border-[#1A82FF] text-[14px] px-[10px] py-1 rounded-2xl my-3 mr-3 xl:hidden"
          >
            {id === "new" ? "올리기" : "수정완료"}
          </button>
          <button
            type="submit"
            className="bg-[#FFFFFE] text-[#0068E5] border border-[#1A82FF] text-[18px] rounded-lg py-[14px] px-[36px] font-semibold hidden xl:block"
          >
            {id === "new" ? "글 올리기" : "수정완료"}
          </button>
        </div>
      <div className="max-w-[1200px] mx-auto grid gap-2 bg-[#F4F4F4]">
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
          setMainImg={setMainImg}
        />
       
      </div>
    </form>
  );
}

export default ProductUpload;
