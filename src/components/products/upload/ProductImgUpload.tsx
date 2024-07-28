/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";

interface ContentsProps {
  setDetailImg: React.Dispatch<React.SetStateAction<File[]>>;
  setMainImg: React.Dispatch<React.SetStateAction<File | null>>;
}

const ProductImgUpload: React.FC<ContentsProps> = ({ setDetailImg, setMainImg }) => {
  const [mainImgUrl, setMainImgUrl] = useState<string | undefined>(undefined);
  const [detailImgUrls, setDetailImgUrls] = useState<{ file: File, url: string }[]>([]);

  useEffect(() => {
    return () => {
      if (mainImgUrl) URL.revokeObjectURL(mainImgUrl);
      detailImgUrls.forEach((item) => URL.revokeObjectURL(item.url));
    };
  }, [mainImgUrl, detailImgUrls]);

  const readMainImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const imageFile = e.target.files[0];
    setMainImg(imageFile);
    const newMainImgUrl = URL.createObjectURL(imageFile);
    if (mainImgUrl) URL.revokeObjectURL(mainImgUrl);
    setMainImgUrl(newMainImgUrl);
  };

  const readDetailImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const files = Array.from(e.target.files);
    const newDetailImgUrls = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setDetailImg((prevFiles) => [...prevFiles, ...files]);
    setDetailImgUrls((prevUrls) => [...prevUrls, ...newDetailImgUrls]);
  };

  const handleDeleteImage = (file: File) => {
    const itemToDelete = detailImgUrls.find(item => item.file === file);
    if (itemToDelete) {
      URL.revokeObjectURL(itemToDelete.url);
      setDetailImgUrls((prevUrls) => prevUrls.filter((item) => item.file !== file));
      setDetailImg((prevFiles) => prevFiles.filter((prevFile) => prevFile !== file));
    }
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
          {detailImgUrls.map((item) => (
            <div key={item.url}>
              <img src={item.url} alt="img" width="auto" height="auto" className="mb-5" />
              <button type="button" onClick={() => handleDeleteImage(item.file)}>x</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductImgUpload;
