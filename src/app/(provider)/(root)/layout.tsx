import BottomNav from "@/components/common/bottomnav/BottomNav";
import UpButton from "@/components/common/button/UpButton";
import Footer from "@/components/common/footer/Footer";
import Header from "@/components/common/header/Header";

import React, { PropsWithChildren } from "react";

export const metadata = {
  title: "URR(우르르)",
  description: "인플루언서와 소통하고 공구상품을 구매해보세요!",
  ogImage: "/main.png",
  url: "https://urr-final.vercel.app"
};

const Mainlayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="grow overflow-auto">{children}</main>
      <Footer />
      <UpButton />
      <BottomNav />
    </>
  );
};

export default Mainlayout;
