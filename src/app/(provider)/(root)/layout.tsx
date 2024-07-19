import Footer from "@/components/common/footer/Footer";
import Header from "@/components/common/header/Header";
import React, { PropsWithChildren } from "react";

const Mainlayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Mainlayout;
