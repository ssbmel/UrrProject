"use client";

import { useEffect, useState } from "react";
import "./style.css";
import { useAddrStore } from "@/zustand/addrStore";
import UpIcon from "../../../../public/icon/upArrow.png";
import Image from "next/image";
import { usePathname } from "next/navigation";

function UpButton() {
  const pathname = usePathname();
  const [upButton, setUpButton] = useState<boolean>(false);
  const { refContent } = useAddrStore();

  const handleShowButton = () => {
    if (refContent!.current!.scrollTop > 200) {
      setUpButton(true);
    } else {
      setUpButton(false);
    }
  };

  useEffect(() => {
    if (refContent?.current) {
      console.log("이벤트 리스너 장착");
      refContent!.current!.addEventListener("scroll", handleShowButton);
    }
    return () => {
      if (refContent?.current) {
        console.log("이벤트 리스너 해제");
        refContent!.current!.removeEventListener("scroll", handleShowButton);
      }
    };
  }, [refContent]);

  const scrollToTop = () => {
    refContent!.current!.scrollIntoView({ behavior: "smooth" });
  };

  if (
    (pathname.startsWith("/chatlist/") && pathname.split("/").length === 3) ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup")
  ) {
    return null;
  }

  return (
    <>
      {upButton && (
        <div
          onClick={scrollToTop}
          className="fixed bottom-[18%] right-[5%] z-50 bg-white w-[50px] h-[50px] rounded-[50%] opacity-70 transition"
        >
          <Image src={UpIcon} alt="up" width={50} height={50} />
        </div>
      )}
    </>
  );
}

export default UpButton;
