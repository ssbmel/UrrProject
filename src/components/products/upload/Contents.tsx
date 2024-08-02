"use client";

import { RefObject } from "react";
import ProductImgUpload from "./ProductImgUpload";
import { DetailedImgGroup } from "./ProductUpload";

interface ContentsProps {
  titleRef: RefObject<HTMLInputElement>;
  textRef: RefObject<HTMLTextAreaElement>;
  detailImg: DetailedImgGroup[];
  setDetailImg: React.Dispatch<React.SetStateAction<DetailedImgGroup[]>>;
  uploadedMainImg: string;
  setMainImg: React.Dispatch<React.SetStateAction<File | null>>;
}

const Contents: React.FC<ContentsProps> = ({
  titleRef,
  textRef,
  detailImg,
  setDetailImg,
  uploadedMainImg,
  setMainImg
}) => {
  return (
    <div>
      <div className="w-full p-5 contents-box">
        <p className="font-bold text-lg py-3">글 작성하기</p>
        <input type="text" placeholder="[제품사명]제품명" className="border w-full my-5" ref={titleRef} />
        <textarea
          className="border w-full min-h-[300px] resize-none"
          placeholder="내용을 입력하세요."
          ref={textRef}
        ></textarea>
      </div>
      <ProductImgUpload
        detailImg={detailImg}
        setDetailImg={setDetailImg}
        uploadedMainImg={uploadedMainImg}
        setMainImg={setMainImg}
      />
    </div>
  );
};

export default Contents;
