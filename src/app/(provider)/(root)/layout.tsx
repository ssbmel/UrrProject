import BottomNav from "@/components/common/bottomnav/BottomNav";
import UpButton from "@/components/common/button/UpButton";
import Footer from "@/components/common/footer/Footer";
import MobileHeader from "@/components/common/header/MobileHeader";
import { WebHeader } from "@/components/common/header/WebHeader";

import React, { PropsWithChildren } from "react";

export const metadata = {
  title: "URR(우르르)",
  description: "인플루언서와 소통하고 공구상품을 구매해보세요!",
  ogImage: "/main.png",
  url: "https://urr-final.vercel.app"
} as const;

const Mainlayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="lg:hidden">
        <MobileHeader />
      </div>
      <div className="hidden lg:block">
        <WebHeader />
      </div>
      <main className="grow overflow-auto">
        {children}

        <Footer />
      </main>
      <UpButton />
      <div className="lg:hidden">
        <BottomNav />
      </div>
    </>
  );
};

export default Mainlayout;
