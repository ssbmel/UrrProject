/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";

interface ContentsProps {
  detailImg: File[];
  setDetailImg: React.Dispatch<React.SetStateAction<File[]>>;
  mainImg: File | null;
  setMainImg: React.Dispatch<React.SetStateAction<File | null>>;
}

const ProductImgUpload: React.FC<ContentsProps> = ({ detailImg, setDetailImg, mainImg, setMainImg }) => {
  const [mainImgUrl, setMainImgUrl] = useState<string | undefined>(undefined);
  const [detailImgUrl, setDetailImgUrl] = useState<string[]>([]);

  useEffect(() => {
    return () => {
      if (mainImgUrl) URL.revokeObjectURL(mainImgUrl);
      detailImgUrl.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [mainImgUrl, detailImgUrl]);

  const readMainImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const imageFile = e.target.files[0];
    setMainImg(imageFile);
    const newMainImgUrl = URL.createObjectURL(imageFile);
    setMainImgUrl(newMainImgUrl);
  };

  const readDetailImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const files = Array.from(e.target.files);
    setDetailImg((prevFiles) => [...prevFiles, ...files]);
    const newDetailImgUrls = files.map((f) => URL.createObjectURL(f));
    setDetailImgUrl((prevUrls) => [...prevUrls, ...newDetailImgUrls]);
  };

  return (
    <>
      <div className="my-5">
        <p className="font-bold mb-3 text-md">썸네일 첨부</p>
        <input type="file" accept="image/*" onChange={readMainImg} />
        {mainImgUrl && (
          <div>
            <img src={mainImgUrl} alt="Main Image" width="auto" height="auto" className="mb-5" />
          </div>
        )}
      </div>
      <hr />
      <div className="my-5">
        <p className="font-bold mb-3 text-md">상세설명 첨부</p>
        <input type="file" multiple accept="image/*" onChange={readDetailImages} />
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
