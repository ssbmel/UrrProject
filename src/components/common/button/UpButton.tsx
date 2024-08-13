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

  useEffect(() => {
    if (refContent?.current) {
      console.log(refContent);
      const handleShowButton = () => {
        if (refContent.current!.clientHeight > 200) {
          console.log("200넘음");
          setUpButton(true);
        } else {
          console.log("200미만");
          setUpButton(false);
        }
      };

      refContent?.current!.addEventListener("scroll", handleShowButton);
      return () => {
        refContent?.current!.removeEventListener("scroll", handleShowButton);
      };
    }
  }, [refContent]);

  const scrollToTop = () => {
    if (refContent?.current) {
      refContent.current.scrollIntoView({ behavior: "smooth", block: "end" });
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
