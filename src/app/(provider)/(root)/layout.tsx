import AlertMessage from "@/components/common/alert/AlertMessage";
import BottomNav from "@/components/common/bottomnav/BottomNav";
import Footer from "@/components/common/footer/Footer";
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
        {children}
        <Footer />
      </main>
      <div className="xl:hidden">
        <BottomNav />
      </div>
    </>
  );
};

export default Mainlayout;
