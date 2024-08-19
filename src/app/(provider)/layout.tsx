"use client";

import QueryProvider from "@/queries/QueryProvider";
import { PropsWithChildren } from "react";
import BottomNav from "@/components/common/bottomnav/BottomNav";
import Footer from "@/components/common/footer/Footer";
import MobileHeader from "@/components/common/header/MobileHeader";
import { WebHeader } from "@/components/common/header/WebHeader";
import { usePathname } from "next/navigation";

function ProviderLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const MB = pathname === "/signup" || pathname.startsWith("/products/detail");

  return (
    <QueryProvider>
      <div className="xl:hidden">
        <MobileHeader />
      </div>
      <div className="hidden xl:block">
        <WebHeader />
      </div>
      <main className={`grow overflow-auto ${!MB ? "mb-[93px]" : "mb-0"} xl:mb-0`}>
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
