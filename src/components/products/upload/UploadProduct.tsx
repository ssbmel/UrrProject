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

function UploadProduct() {
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
      swal(`파일이 업로드 되지 않습니다.${error}`);
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
        swal(`파일이 업로드 되지 않습니다.${error}`);
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

    const startDate = startDateRef.current?.value;
    const endDate = endDateRef.current?.value;

    const productData: Product = {
      category: radioCheckedValue || "",
      start: startDate as string,
      end: endDate as string,
      cost: parseInt(costRef.current?.value || "0"),
      price: parseInt(priceRef.current?.value || "0"),
      product_count: parseInt(productCountRef.current?.value || "0"),
      title: titleRef.current?.value || "",
      text: textRef.current?.value || "",
      detail_img: detailImgId || [],
      main_img: mainImgId || "",
      user_id: user.id || "",
      created_at: new Date().toISOString(),
      id: id === "new" ? postId : (id as string),
      nickname: user.nickname || ""
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
      swal("등록이 완료되었습니다.");
      saveMutation(productData);
      router.push("/products/list");
    }
  };

  return (
    <form onSubmit={onSubmit}>
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
      <div className="max-w-[1200px] flex justify-center mb-5 mx-auto">
        <button
          type="submit"
          className={`
            bg-[#1A82FF]
            text-[#FFFFFE]
            border 
            text-[18px] 
            px-[10px] 
            py-1 
            rounded-md 
            xl:hidden 
            w-[342px] 
            h-[52px]
            hover:bg-[#0068E5]
          `}
        >
          {id === "new" ? "글 올리기" : "수정완료"}
        </button>
        <button
          type="submit"
          className={`
            bg-[#FFFFFF]
            text-[#1A82FF]
            border
            border-[#1A82FF]
            text-[18px] 
            rounded-lg 
            py-[14px] 
            px-[36px] 
            font-semibold 
            hidden 
            xl:block 
            ml-auto
            hover:bg-[#1A82FF]
            hover:text-[#FFFFFE]
          `}
        >
          {id === "new" ? "글 올리기" : "수정완료"}
        </button>
      </div>
    </form>
  );
}

export default UploadProduct;
