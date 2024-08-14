"use client";

import { useAddrStore } from "@/zustand/addrStore";
import { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
}

const ComponentForScrollUpButton = ({ children }: Props) => {
  const upButtonRef = useRef<HTMLDivElement>(null);
  const { setRefContent } = useAddrStore();

  useEffect(() => {
    setRefContent(upButtonRef); // refContent 상태에 useRef 객체를 직접 설정
  }, [setRefContent]);

  return <div ref={upButtonRef}>{children}</div>;
};

export default ComponentForScrollUpButton;
