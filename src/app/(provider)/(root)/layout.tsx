import BottomNav from "@/components/common/bottomnav/BottomNav";
import Footer from "@/components/common/footer/Footer";
import Header from "@/components/common/header/Header";
import React, { PropsWithChildren } from "react";

const Mainlayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="grow">{children}</main>
      <Footer />
      <BottomNav />
    </>
  );
};

export default Mainlayout;
