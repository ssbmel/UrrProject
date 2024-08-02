import React, { ReactNode } from "react";

interface ComponentProps {
  children: ReactNode;
}

const TabList = ({ children }: ComponentProps) => {
  return <ul className="pr-[16px] pl-[16px] border-t-[6px] border-t-gray-100">{children}</ul>;
};

export default TabList;
