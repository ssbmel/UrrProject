'use client';

import React, { useRef, useState } from 'react';

function Contents() {
  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [contentsList, setContentsList] = useState({
    title: '',
    text: ''
  });

  const onChange = () => {
    const newContents = {
      title: titleRef.current?.value || '',
      text: textRef.current?.value || ''
    };
    setContentsList(newContents);
  };

  console.log(contentsList);

  return (
    <div className="border w-full h-[500px] p-5">
      <p className="mb-5 font-bold text-lg">글 작성하기</p>
      <input
        type="text"
        placeholder="[활동명] 제목"
        className="border w-full h-8 mb-5"
        ref={titleRef}
        onChange={onChange}
      />
      <textarea 
        className="border w-full min-h-[300px] resize-none"
        placeholder="내용을 입력하세요."
        ref={textRef} 
        onChange={onChange}></textarea>
      <input type="file" />
    </div>
  );
}

export default Contents;
