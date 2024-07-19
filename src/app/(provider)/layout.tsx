import QueryProvider from "@/queries/QueryProvider";
import { PropsWithChildren } from "react";

function ProviderLayout({ children }: PropsWithChildren) {
  return <QueryProvider>{children}</QueryProvider>;
}

export default ProviderLayout;
