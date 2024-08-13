"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { bottomMenu } from "./BottomMenu";
import { useState } from "react";

export default function BottomNav() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<number>(1);

  const liStyle = "font-[600] flex justify-center px-[6px] w-[44px] text-[14px] whitespace-nowrap transition-colors";

  if (
    (pathname.startsWith("/chatlist/") && pathname.split("/").length === 3) ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup")
  ) {
    return null;
  }

  return (
    <>
      <div className="bg-[#FAFAFF] pb-[42px] h-[93px] pt-[8px] w-full sticky bottom-0 shrink-0">
        <div className="flex justify-between items-center mx-[20px]">
          {bottomMenu.map((menu) => (
            <div key={menu.id} onClick={() => setActiveMenu(menu.id)}>
              <Link href={menu.link}>
                <div className={liStyle}>
                  <div className="flex flex-col items-center gap-[4px] px-[6px]">
                    <div className="p-[6px]">{activeMenu !== menu.id ? menu.icon : menu.blueIcon}</div>
                    <p className={activeMenu !== menu.id ? "" : "text-primarystrong"}>{menu.label}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
