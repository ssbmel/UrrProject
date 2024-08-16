"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { bottomMenu } from "./BottomMenu";
import { useMenuStore } from "@/zustand/MenuStore";

export default function BottomNav() {
  const pathname = usePathname();
  const { activeMenu, setActiveMenu } = useMenuStore();

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
      <div className="bg-[#FFFFFE] pb-[28px] h-[93px] pt-[8px] w-full shrink-0 shadow-[0_1px_8px_0px_rgba(0,0,0,0.25)]">
        <div className="flex justify-between items-center mx-[20px]">
          {bottomMenu.map((menu) => (
            <div key={menu.id} onClick={() => setActiveMenu(menu.link)}>
              <Link href={menu.link}>
                <div className={liStyle}>
                  <div className="flex flex-col items-center gap-[4px] px-[6px]">
                    <div className="">{activeMenu !== menu.link ? menu.icon : menu.blueIcon}</div>
                    <p className={activeMenu !== menu.link ? "" : "text-primarystrong"}>{menu.label}</p>
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
