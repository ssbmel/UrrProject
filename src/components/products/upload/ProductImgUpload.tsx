/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
interface ContentsProps {
  detailImg: File[];
  setDetailImg: React.Dispatch<React.SetStateAction<File[]>>;
  mainImg: File | null;
  setMainImg: React.Dispatch<React.SetStateAction<File | null>>;
}

const ProductImgUpload: React.FC<ContentsProps> = ({ detailImg, setDetailImg, mainImg, setMainImg }) => {
  const [mainImgUrl, setMainImgUrl] = useState<string>();
  const [detailImgUrl, setDetailImgUrl] = useState<string[]>([]);
  const readImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const imageFile = e.target.files[0];
    setMainImg(imageFile);
    setMainImgUrl(URL.createObjectURL(imageFile))
  };

  const readImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const files = Array.from(e.target.files);
    setDetailImg(files)
    setDetailImgUrl(files.map((f)=>URL.createObjectURL(f)))
  };

  return (
    <>
      <div className="my-5">
        <p className="font-bold mb-3 text-md">썸네일 첨부</p>
        <input type="file" onChange={readImage}/>
        <div>
        <img src={mainImgUrl} alt="" width="auto" height="auto" className="mb-5" />
        </div>
      </div>
      <hr />
      <div className="my-5">
        <p className="font-bold mb-3 text-md">상세설명 첨부</p>
        <input type="file" multiple onChange={readImages} accept="image/*"/>
        <div>
          {detailImgUrl.map((url, index) => (
            <img key={index} src={url} alt={`preview-${index}`} width="auto" height="auto" className="mb-5" />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductImgUpload;
