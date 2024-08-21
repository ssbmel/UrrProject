"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import github from "../../../../public/icon/githubicon.png";
import loginFooterImage from "../../../../public/bgImg/login_footer.png";
import mainFooterImage from "../../../../public/bgImg/main_footer.png";
import Link from "next/link";

const Footer = () => {
  const pathname = usePathname();
  const FOOTER_VER2 = pathname === "/signup" || pathname === "/login";
  const backgroundImage = FOOTER_VER2 ? loginFooterImage : mainFooterImage;

  return (
    <div className="relative w-full h-[210px] hidden xl:block">
      <div className="relative xl:w-[full] h-[210px] xl:block">
      <Image
        src={backgroundImage}
        alt="Footer Background"
        fill
        sizes="xl:w-[1920px]"
        priority
        className="object-cover"
      />
      </div>
      
      {/* Content */}
      <div className="absolute left-[10%] top-1/2 transform text-[14px] z-10">
        <ul className="flex gap-3">
          <li className="text-[#4C4F52] w-[50px]">서비스명</li>
          <li className="text-[#1B1C1D] font-medium">Urr</li> 
        </ul>
        <ul className="flex gap-3">
          <li className="text-[#4C4F52] w-[50px]">개발자</li>
          <li className="text-[#1B1C1D] font-medium">임현아 | 서샛별 | 박수미 | 장민영 | 이녕수</li>
        </ul>
        <ul className="flex gap-3">
          <li className="text-[#4C4F52] w-[50px]">디자이너</li>
          <li className="text-[#1B1C1D] font-medium">김예진</li>
        </ul>
      </div>
      <div className="absolute right-[10%] top-1/2 transform text-right text-[14px] z-10">
        <Link
          href={"https://github.com/URR-A-4/URR-final"}
          className="flex items-center justify-end mb-2"
          target="_blank"
        >
          <div className="w-[20px] h-[20px] relative mr-1">
            <Image
              src={github}
              alt="github"
              fill
              sizes="20px"
              className="object-cover"
            />
          </div>
          <p className="text-[#1B1C1D] font-medium text-[16px]">Urr Github</p>
        </Link>

        <p>Copyright ⓒ A4와르르</p>
      </div>
    </div>
  );
};

export default Footer;
