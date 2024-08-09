"use client";

import { useEffect, useState } from "react";
import "./style.css";
import UpArrow from "../../../../public/icon/upArrow.svg";
import { usePathname } from "next/navigation";

function UpButton() {
  const [upButton, setUpButton] = useState(false);
  const pathname = usePathname();

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

  if (pathname.startsWith("/chatlist/") && pathname.split("/").length === 3) {
    return null;
  }

  return (
    <>
      {upButton && (
        <button className="abcd btnEffect fixed bottom-[124px] right-[16px] z-50" onClick={scrollToTop} aria-label="Scroll to top">
          <UpArrow />
        </button>
      )}
    </>
  );
}

export default UpButton;
