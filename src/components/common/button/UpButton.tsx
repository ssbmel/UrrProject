"use client";

import { useEffect, useState } from 'react';
import "./style.css"

function UpButton() {
  const [upButton, setUpButton] = useState(false);

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 100) {
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
      behavior: 'smooth'
    });
  };

  return <div className="btnEffect" onClick={scrollToTop}>{upButton}</div>;
}

export default UpButton;
