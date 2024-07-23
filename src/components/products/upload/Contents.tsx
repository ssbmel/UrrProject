"use client";

import { RefObject } from "react";

interface ContentsProps {
  titleRef: RefObject<HTMLInputElement>;
  textRef: RefObject<HTMLTextAreaElement>;
}

const Contents: React.FC<ContentsProps> = ({ titleRef, textRef }) => {

  return (
    <div className="border w-full h-[500px] p-5">
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
      <input type="file" />
    </div>
  );
}

export default Contents;
