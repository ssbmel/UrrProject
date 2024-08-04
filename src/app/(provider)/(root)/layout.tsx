import BottomNav from "@/components/common/bottomnav/BottomNav";
import UpButton from "@/components/common/button/UpButton";
import Footer from "@/components/common/footer/Footer";
import Header from "@/components/common/header/Header";
import LoadingUrr from "@/components/common/loading/LoadingUrr";
import React, { PropsWithChildren, Suspense } from "react";

const Mainlayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="grow">{children}</main>
      <Footer />
      <UpButton/>
      <BottomNav />
    </>
  );
};

export default Mainlayout;
