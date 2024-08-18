/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { DetailedImgGroup } from "./UploadProduct";
import AccentIcon from "../../../../public/icon/accentmark.svg";
import camera from "../../../../public/bgImg/camera.png";
import Image from "next/image";
import swal from "sweetalert";

interface ContentsProps {
  setDetailImg: React.Dispatch<React.SetStateAction<DetailedImgGroup[]>>;
  uploadedMainImg: string;
  detailImg: DetailedImgGroup[];
  setMainImg: React.Dispatch<React.SetStateAction<File | null>>;
}

const UploadProductImg: React.FC<ContentsProps> = ({
  setDetailImg,
  detailImg,
  uploadedMainImg,
  setMainImg
}) => {
  const [mainImgUrl, setMainImgUrl] = useState<string | undefined>(uploadedMainImg);
  const [detailImgUrls, setDetailImgUrls] = useState<DetailedImgGroup[]>([]);

  useEffect(() => {
    return () => {
      if (mainImgUrl) URL.revokeObjectURL(mainImgUrl);
      detailImgUrls.forEach((item) => URL.revokeObjectURL(item.url));
    };
  }, [mainImgUrl, detailImgUrls]);

  useEffect(() => {
    setDetailImgUrls(detailImg);
  }, [detailImg]);

  useEffect(() => {
    setMainImgUrl(uploadedMainImg);
  }, [uploadedMainImg]);
 
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
        swal("사진은 최대 10장까지 업로드 가능합니다.");
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
      <div className="w-full p-4 contents-box my-2">
        <h3 className="font-bold text-xl py-3">썸네일 등록하기</h3>
        {!mainImgUrl ? (
          <label
            htmlFor="file"
            className="w-full border h-[241px] shadow-md rounded-md text-center flex flex-col items-center justify-center cursor-pointer xl:w-[364px] mb-5"
          >
            <Image src={camera} alt="img" width={50} className="mb-2" />
            <p>파일 첨부하기</p>
          </label>
        ) : (
          <label htmlFor="file" className="cursor-pointer">
            <img src={mainImgUrl} alt="Main Image" width="100%" className="mb-5" />
          </label>
        )}
        <input
          type="file"
          name="file"
          id="file"
          accept="image/*"
          onChange={readMainImg}
          className="hidden"
        />
      </div>
  
      <div className="w-full p-5 contents-box">
        <h3 className="font-bold text-xl py-3">상세설명 파일 등록하기</h3>
        <div className="flex my-2">
          <div className="mr-1 mt-[2px]">
            <AccentIcon />
          </div>
          <p className="text-sm text-[#989C9F] mb-3">사진은 최대 10장까지 업로드 가능합니다.</p>
        </div>
        {!detailImgUrls || detailImgUrls.length === 0 ? (
          <label
            htmlFor="files"
            className="w-full border h-[241px] shadow-md rounded-md text-center flex flex-col items-center justify-center cursor-pointer xl:w-[364px] mb-5"
          >
            <Image src={camera} alt="img" width={50} className="mb-2" />
            <p>파일 첨부하기</p>
          </label>
        ) : (
          <div className="space-y-4">
            {detailImgUrls &&
              detailImgUrls.map((item) => (
                <div key={item.url} className="relative w-full">
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(item)}
                    className="border w-7 h-7 rounded-sm absolute top-2 right-2 bg-white flex items-center justify-center text-black"
                  >
                    ✖︎
                  </button>
                  <label htmlFor="files" className="cursor-pointer">
                    <img src={item.url} alt="img" width="100%" className="mb-5" />
                  </label>
                </div>
              ))}
          </div>
        )}
        <input
          type="file"
          multiple
          accept="image/*"
          id="files"
          onChange={readDetailImages}
          className="hidden"
        />
       
      </div>
    </div>
  );
  
};

export default UploadProductImg;
