import BottomNav from "@/components/common/bottomnav/BottomNav";
import UpButton from "@/components/common/button/UpButton";
import Footer from "@/components/common/footer/Footer";
import Header from "@/components/common/header/Header";
import React, { PropsWithChildren } from "react";

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
