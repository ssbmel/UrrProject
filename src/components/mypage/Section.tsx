"use client";

import React, { useState } from "react";
import TabList from "./TabList";
import TabButton from "./TabButton";
import Shopping from "./Shopping";
import Activity from "./Activity";

const Section = () => {
  const [active, setActive] = useState<number>(0);

  const tabOn =
    "p-[14px] text-[#0068E5] text-[16px] border-b-[4px] border-b-[#0068E5] w-[50%] xl:w-[172px] xl:bg-[#0068E5] xl:border-0 xl:font-[600] xl:text-[#FFFFFE] xl:text-[20px] xl:rounded-t-[8px] transition-colors";
  const tabOff =
    "p-[14px] text-[#989C9F] text-[16px] border-b-[4px] border-b-[#F4F4F4] w-[50%] xl:w-[172px] xl:bg-[#F2F2F2] xl:border-0 xl:font-[600] xl:text-[#989C9F] xl:text-[20px] xl:rounded-t-[8px] transition-colors";

  const Tabs = [
    { button: "쇼핑", content: <Shopping /> },
    { button: "활동", content: <Activity /> }
  ];

  return (
    <div className="xl:w-[1129px] xl:mx-auto">
      <TabList>
        {Tabs.map((tab, idx) => (
          <TabButton key={idx} idx={idx} active={active} tabOn={tabOn} tabOff={tabOff} setActive={setActive}>
            {tab.button}
          </TabButton>
        ))}
      </TabList>
      <hr className="xl:border-y-[2px] xl:block border-[#F4F4F4] hidden" />
      <div>{Tabs[active].content}</div>
    </div>
  );
};

export default Section;
