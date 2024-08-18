import QueryProvider from "@/queries/QueryProvider";
import { PropsWithChildren } from "react";
import AlertMessage from "@/components/common/alert/AlertMessage";
import BottomNav from "@/components/common/bottomnav/BottomNav";
import Footer from "@/components/common/footer/Footer";
import MobileHeader from "@/components/common/header/MobileHeader";
import { WebHeader } from "@/components/common/header/WebHeader";

function ProviderLayout({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <div className="xl:hidden">
        <MobileHeader />
      </div>
      <div className="hidden xl:block">
        <WebHeader />
      </div>
      <main className="grow overflow-auto mb-[93px] xl:mb-0">
        <div>{children}</div>
        <Footer />
      </main>
      <div className="xl:hidden fixed z-30 bottom-0 left-0 w-full">
        <BottomNav />
      </div>
    </QueryProvider>
  );
}

export default ProviderLayout;
