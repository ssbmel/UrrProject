import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  idx: number;
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  tabOn: string;
  tabOff: string;
}

const TabButton = ({ children, idx, setActive, active, tabOn, tabOff }: Props) => {
  return (
    <button className={active === idx ? tabOn : tabOff} onClick={() => setActive(idx)}>
      {children}
    </button>
  );
};

export default TabButton;
