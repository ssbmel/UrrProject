import React, { ReactNode } from "react";

interface ComponentProps {
  children: ReactNode;
}

const TabList = ({ children }: ComponentProps) => {
  return (
    <ul className="px-[16px] border-t-[6px] border-t-gray-100 xl:border-0 xl:flex xl:gap-[4px] xl:px-0">{children}</ul>
  );
};

export default TabList;
