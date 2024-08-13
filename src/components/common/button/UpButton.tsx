"use client";

import { useEffect, useState } from "react";
import "./style.css";
import { useAddrStore } from "@/zustand/addrStore";
import UpIcon from "../../../../public/icon/upArrow.png";
import Image from "next/image";
import { usePathname } from "next/navigation";

function UpButton() {
  const pathname = usePathname();
  const [upButton, setUpButton] = useState(false);
  const { refContent } = useAddrStore();

  const handleShowButton = () => {
    if (window.scrollY > 150) {
      setUpButton(true);
    } else {
      setUpButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  const scrollUpToHeader = () => {
    if (refContent?.current) {
      refContent.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }
  };

  if (
    (pathname.startsWith("/chatlist/") && pathname.split("/").length === 3) ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup")
  ) {
    return null;
  }

  return (
    <div
      onClick={scrollUpToHeader}
      className="fixed bottom-[124px] right-[16px] z-50 bg-white w-[50px] h-[50px] rounded-[50%]"
    >
      <Image src={UpIcon} alt="up" width={50} height={50} />
    </div>
  );
}

export default UpButton;
