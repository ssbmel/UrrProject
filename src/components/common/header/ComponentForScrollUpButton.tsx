"use client";

import { useAddrStore } from "@/zustand/addrStore";
import { useEffect, useRef } from "react";

const ComponentForScrollUpButton = () => {
  const upButtonRef = useRef<HTMLDivElement>(null);
  const { setRefContent } = useAddrStore();

  useEffect(() => {
    setRefContent(upButtonRef); // refContent 상태에 useRef 객체를 직접 설정
  }, [setRefContent]);
  return <div ref={upButtonRef}></div>;
};

export default ComponentForScrollUpButton;
