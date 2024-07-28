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
        <label htmlFor="file" className="btn-upload">썸네일 파일 첨부하기</label>
        <input type="file" name="file" id="file" accept="image/*" onChange={readMainImg} />
        {mainImgUrl && (
          <div>
            <img src={mainImgUrl} alt="Main Image" width="auto" height="auto" className="mb-5" />
          </div>
        )}
      </div>
      <hr />
      <div className="my-5">
        <label htmlFor="files" className="btn-upload">상세설명 파일 첨부하기</label>
        <input type="file" multiple accept="image/*" id="files" onChange={readDetailImages} />
        <p className="text-sm text-yellow-500">*사진은 최대 5장까지 업로드 가능합니다.</p>
        <div>
          {detailImgUrls.map((item) => (
            <div key={item.url} className="static">
              <button 
                type="button" 
                onClick={() => handleDeleteImage(item.file)}
                className="border w-7 rounded-md absolute bg-black text-white">✖︎</button>
              <img src={item.url} alt="img" width="auto" height="auto" className="mb-5" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductImgUpload;
