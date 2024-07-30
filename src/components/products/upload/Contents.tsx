"use client";

import { RefObject } from "react";
import ProductImgUpload from "./ProductImgUpload";
import { DetailedImgGroup } from "./ProductUpload";

interface ContentsProps {
  titleRef: RefObject<HTMLInputElement>;
  textRef: RefObject<HTMLTextAreaElement>;
  detailImg: DetailedImgGroup[];
  // setDetailImg: React.Dispatch<React.SetStateAction<File[]>>;
  setDetailImg: React.Dispatch<React.SetStateAction<DetailedImgGroup[]>>;
  uploadedMainImg: string;
  uploadedDetailImg: DetailedImgGroup[];
  setMainImg: React.Dispatch<React.SetStateAction<File | null>>;
}

const Contents: React.FC<ContentsProps> = ({ titleRef, textRef, detailImg, setDetailImg, uploadedMainImg, uploadedDetailImg,  setMainImg}) => {

  return (
    <div className="border w-full h-[auto] p-5">
      <p className="mb-5 font-bold text-lg">글 작성하기</p>
      <input
        type="text"
        placeholder="상품명" 
        className="border w-full h-8 mb-5"
        ref={titleRef}
      />
      <textarea 
        className="border w-full min-h-[300px] resize-none"
        placeholder="내용을 입력하세요."
        ref={textRef} 
        ></textarea>
      <ProductImgUpload 
      // detailImg={detailImg}
      setDetailImg={setDetailImg}
      uploadedMainImg={uploadedMainImg}
      uploadedDetailImg={uploadedDetailImg}
      setMainImg={setMainImg}/>
    </div>
  );
}

export default Contents;
