import BottomNav from "@/components/common/bottomnav/BottomNav";
import UpButton from "@/components/common/button/UpButton";
import Footer from "@/components/common/footer/Footer";
import Test from "@/components/common/header/Test";
import MobileHeader from "@/components/common/header/MobileHeader";
import { WebHeader } from "@/components/common/header/WebHeader";

import React, { PropsWithChildren } from "react";

const Mainlayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="xl:hidden">
        <MobileHeader />
      </div>
      <div className="hidden xl:block">
        <WebHeader />
      </div>
      <main className="grow overflow-auto">
        <Test />
        {children}
        <Footer />
      </main>
      <UpButton />
      <div className="xl:hidden">
        <BottomNav />
      </div>
    </>
  );
};

export default Mainlayout;
