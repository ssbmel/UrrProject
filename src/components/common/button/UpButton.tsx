"use client";

import { useEffect, useState } from 'react';
import "./style.css";
import UpArrow from "../../../../public/icon/upArrow.svg";

function UpButton() {
  const [upButton, setUpButton] = useState(false);

  useEffect(() => {
    const handleShowButton = () => {
      // 스크롤 위치가 1000px 이상일 때 버튼을 표시
      if (window.scrollY > 1000) {
        setUpButton(true);
      } else {
        setUpButton(false);
      }
    };

    window.addEventListener('scroll', handleShowButton);
    return () => {
      window.removeEventListener('scroll', handleShowButton);
    };
  }, []);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {upButton && (
        <button 
          className="btnEffect fixed bottom-5 right-5 z-50" 
          onClick={scrollToTop} 
          aria-label="Scroll to top">
          <UpArrow />
        </button>
      )}
    </>
  );
}

export default UpButton;
