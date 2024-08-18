"use client";

import QueryProvider from "@/queries/QueryProvider";
import { PropsWithChildren } from "react";
import AlertMessage from "@/components/common/alert/AlertMessage";
import BottomNav from "@/components/common/bottomnav/BottomNav";
import Footer from "@/components/common/footer/Footer";
import MobileHeader from "@/components/common/header/MobileHeader";
import { WebHeader } from "@/components/common/header/WebHeader";
import { usePathname } from "next/navigation";

function ProviderLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const SIGN_UP = pathname === "/signup";

  return (
    <QueryProvider>
      <div className="xl:hidden">
        <MobileHeader />
      </div>
      <div className="hidden xl:block">
        <WebHeader />
      </div>
      <main style={{ marginBottom: !SIGN_UP ? "93px" : "0px" }} className="grow overflow-auto xl:mb-0">
        <div>{children}</div>
        <Footer />
      </main>
      <div className="xl:hidden z-40 fixed bottom-0 left-0 w-full">
        <BottomNav />
      </div>
    </QueryProvider>
  );
}

export default ProviderLayout;
