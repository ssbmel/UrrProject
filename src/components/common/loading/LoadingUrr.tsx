import Image from "next/image";
import loading from "../../../../public/icon/loadingFrame.png";
import dot from "../../../../public/icon/loadingDot.png";

export default function LoadingUrr() {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="relative w-36 h-36 mb-[80px]">
          <Image 
            src={loading} 
            alt="로딩" 
            fill
            sizes="144px" 
            className="ml-[12px] mt-2 object-cover" />
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="flex space-x-3">
              <Image src={dot} alt="dot 1" width={12} height={12} className="dot-animation dot-1" />
              <Image src={dot} alt="dot 2" width={12} height={12} className="dot-animation dot-2" />
              <Image src={dot} alt="dot 3" width={12} height={12} className="dot-animation dot-3" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
