"use client";

import { useEffect, useState } from "react";
import "./style.css";
import { useAddrStore } from "@/zustand/addrStore";
import UpIcon from "../../../../public/icon/upArrow.png"
import Image from "next/image";

function UpButton() {
  const [upButton, setUpButton] = useState(false);
  const {refContent} = useAddrStore();

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

  const test = () => {
    if(refContent?.current){
      refContent.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }
  }

  return (
      <div onClick={test} className="fixed bottom-[124px] right-[16px] z-50 bg-white w-[50px] h-[50px] rounded-[50%]" >
        <Image src={UpIcon} alt="up" width={50} height={50}/>
      </div>
  );
}

export default UpButton;
