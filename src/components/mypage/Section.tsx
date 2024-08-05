"use client";

import React, { useState } from "react";
import TabList from "./TabList";
import TabButton from "./TabButton";
import Shopping from "./Shopping";
import Activity from "./Activity";

const Section = () => {
  const [active, setActive] = useState<number>(0);

  const tabOn = "p-[14px] text-[#0068E5] text-[16px] border-b-[4px] border-b-[#0068E5] w-[50%] transition-colors";
  const tabOff = "p-[14px] text-gray-300 text-[16px] text-gray-400 w-[50%] transition-colors";

  const Tabs = [
    { button: "쇼핑", content: <Shopping /> },
    { button: "활동", content: <Activity /> }
  ];

  return (
    <div>
      <TabList>
        {Tabs.map((tab, idx) => (
          <TabButton key={idx} idx={idx} active={active} tabOn={tabOn} tabOff={tabOff} setActive={setActive}>
            {tab.button}
          </TabButton>
        ))}
      </TabList>
      <div>{Tabs[active].content}</div>
    </div>
  );
};

export default Section;
