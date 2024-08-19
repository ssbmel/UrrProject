"use client";

import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const FOOTER_VER2 = pathname === "/signup" || pathname === "/login";

  return (
    <div
      className={`relative ${
        FOOTER_VER2
          ? "bg-[url('../../public/bgImg/login_footer.png')]"
          : "bg-[url('../../public/bgImg/main_footer.png')]"
      } w-full h-[170px] bg-center bg-cover bg-no-repeat hidden xl:block`}
    ></div>
  );
};

export default Footer;
