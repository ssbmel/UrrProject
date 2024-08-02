/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { DetailedImgGroup } from "./ProductUpload";
import AccentIcon from "../../../../public/icon/accentmark.svg";
import camera from "../../../../public/bgImg/camera.png";
import Image from "next/image";

interface ContentsProps {
  setDetailImg: React.Dispatch<React.SetStateAction<DetailedImgGroup[]>>;
  uploadedMainImg: string;
  detailImg: DetailedImgGroup[];
  setMainImg: React.Dispatch<React.SetStateAction<File | null>>;
}

const ProductImgUpload: React.FC<ContentsProps> = ({
  setDetailImg,
  detailImg,
  uploadedMainImg,
  setMainImg
}) => {
  const [mainImgUrl, setMainImgUrl] = useState<string | undefined>(uploadedMainImg);
  const [detailImgUrls, setDetailImgUrls] = useState<DetailedImgGroup[]>([]);
  useEffect(() => {
    setDetailImgUrls(detailImg);
  }, [detailImg]);

  useEffect(() => {
    return () => {
      if (mainImgUrl) URL.revokeObjectURL(mainImgUrl);
      detailImgUrls.forEach((item) => URL.revokeObjectURL(item.url));
    };
  }, [mainImgUrl, detailImgUrls]);

  useEffect(() => {
    setMainImgUrl(uploadedMainImg);
    setDetailImgUrls(detailImg);
  }, [uploadedMainImg, detailImg]);

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
    const newDetailImgGroups = files.map((file) => ({
      file,
      url: URL.createObjectURL(file)
    }));

    setDetailImg((prevFiles) => {
      const totalFiles = prevFiles.length + newDetailImgGroups.length;
      if (totalFiles > 10) {
        alert("사진은 최대 10장까지 업로드 가능합니다.");
        return prevFiles;
      }
      return [...prevFiles, ...newDetailImgGroups];
    });

    setDetailImgUrls((prevUrls) => {
      const totalUrls = prevUrls.length + newDetailImgGroups.length;
      if (totalUrls > 10) {
        return prevUrls;
      }
      return [...prevUrls, ...newDetailImgGroups];
    });
  };

  const handleDeleteImage = (imgObj: DetailedImgGroup) => {
    if (!imgObj) return;
    const itemToDelete = detailImgUrls.find((item) => item.url === imgObj.url);

    if (itemToDelete) {
      URL.revokeObjectURL(itemToDelete.url);
      setDetailImgUrls((prevUrls) => prevUrls.filter((item) => item !== itemToDelete));
      setDetailImg((prevFiles) => prevFiles.filter((item) => item.url !== itemToDelete.url));
    }
  };

  return (
    <div>
      <div className="w-full p-5 contents-box my-3">
        <h3 className="font-bold text-lg py-3">썸네일 등록하기</h3>
        {!mainImgUrl && (
          <div className="w-full border min-h-[300px] shadow-md rounded-md text-center flex flex-col items-center justify-center">
            <Image src={camera} alt="img" width={50} className="mb-2"></Image>
            <p>파일 미리보기</p>
          </div>
        )}
        <input type="file" name="file" id="file" accept="image/*" onChange={readMainImg} />
        {mainImgUrl && (
          <div>
            <img src={mainImgUrl} alt="Main Image" width="auto" height="auto" className="mb-5" />
          </div>
        )}
        <label htmlFor="file" className="btn-upload">
          썸네일 파일 첨부하기
        </label>
      </div>

      <div className="w-full p-5 contents-box">
        <h3 className="font-bold text-lg py-3">상세설명 파일 등록하기</h3>
        {!detailImgUrls || detailImgUrls.length === 0 ? (
          <div className="w-full border min-h-[300px] shadow-md rounded-md text-center flex flex-col items-center justify-center">
            <Image src={camera} alt="img" width={50} className="mb-2"></Image>
            <p>파일 미리보기</p>
          </div>
        ) : (
          <div>
            {detailImgUrls &&
              detailImgUrls.map((item) => (
                <div key={item.url} className="static">
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(item)}
                    className="border w-7 rounded-sm absolute bg-white"
                  >
                    ✖︎
                  </button>
                  <img src={item.url} alt="img" width="auto" height="auto" className="mb-5" />
                </div>
              ))}
          </div>
        )}
        <input type="file" multiple accept="image/*" id="files" onChange={readDetailImages} />
        <div className="flex my-2">
          <div className="mr-1 mt-[2px]">
            <AccentIcon />
          </div>
          <p className="text-sm text-[#989C9F]">사진은 최대 10장까지 업로드 가능합니다.</p>
        </div>
        <label htmlFor="files" className="btn-upload">
          상세설명 파일 첨부하기
        </label>
      </div>
    </div>
  );
};

export default ProductImgUpload;
