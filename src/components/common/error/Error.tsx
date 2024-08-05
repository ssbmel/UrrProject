import Image from "next/image";
import React from "react";
import emptyImg from "../../../../public/bgImg/emptyImg.png";

const Error = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="flex flex-col items-center mx-auto h-full py-10">
        <Image src={emptyImg} alt="empty" width={130} className="mx-auto my-5"></Image>
        <div className="text-[#4C4F52] text-[16px] mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default Error;
