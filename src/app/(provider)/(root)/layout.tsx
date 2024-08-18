"use client";

import { usePathname } from "next/navigation";
import React, { PropsWithChildren } from "react";

const Mainlayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const isFullWidth = pathname === "/signup" || pathname === "/login";

  return (
    <>
      <div className={!isFullWidth ? `container` : undefined}>{children}</div>
    </>
  );
};

export default Mainlayout;
