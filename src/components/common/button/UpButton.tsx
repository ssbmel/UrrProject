"use client";

import { useEffect, useState } from "react";
import "./style.css";
import UpArrow from "../../../../public/icon/upArrow.svg";

function UpButton() {
  const [upButton, setUpButton] = useState(false);

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 150) {
        setUpButton(true);
      } else {
        setUpButton(false);
      }
    };

    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      {upButton && (
        <button className="btnEffect fixed mb-[30px] mr-[-20px] z-50" onClick={scrollToTop} aria-label="Scroll to top">
          <UpArrow />
        </button>
      )}
    </>
  );
}

export default UpButton;
