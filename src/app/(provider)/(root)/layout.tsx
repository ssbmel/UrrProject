"use client";

import { usePathname } from "next/navigation";
import React, { PropsWithChildren } from "react";

const Mainlayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const isFullWidth = pathname === "/signup" || pathname === "/login";

  return (
    <>
      <div className={`${!isFullWidth ? `container` : undefined}`}>
        <div className="min-h-[calc(100vh-278px)]">{children}</div>
      </div>
      {/* <main className={`grow overflow-auto ${!isFullWidth ? `container` : undefined}`}>{children}</main> */}
    </>
  );
};

export default Mainlayout;
