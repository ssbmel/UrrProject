"use client";

import { RefObject } from "react";
import ProductImgUpload from "./ProductImgUpload";

interface ContentsProps {
  titleRef: RefObject<HTMLInputElement>;
  textRef: RefObject<HTMLTextAreaElement>;
  fileInputRef: RefObject<HTMLInputElement>;
  productMainImgRef: RefObject<HTMLImageElement>;
}

const Contents: React.FC<ContentsProps> = ({ titleRef, textRef, fileInputRef, productMainImgRef}) => {

  return (
    <div className="border w-full h-[auto] p-5">
      <p className="mb-5 font-bold text-lg">글 작성하기</p>
      <input
        type="text"
        placeholder="[활동명] 제목" 
        className="border w-full h-8 mb-5"
        ref={titleRef}
      />
      <textarea 
        className="border w-full min-h-[300px] resize-none"
        placeholder="내용을 입력하세요."
        ref={textRef} 
        ></textarea>
      <ProductImgUpload fileInputRef={fileInputRef} productMainImgRef={productMainImgRef}/>
    </div>
  );
}

export default Contents;
