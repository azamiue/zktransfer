"use client";

import { useQueryState } from "@/hooks/useQueryState";
import { sendGAEvent } from "@next/third-parties/google";
import { Tab, Tabs } from "@nextui-org/react";
import { useCallback } from "react";
import { HowItWork } from "./how-it-work";
import { MyStaking } from "./my-staking/my-staking";
import { Stats } from "./stats";

type StateQuery = {
  tab: string;
};

const currentState = {
  tab: "stats",
};

export default function Staking() {
  const { state, setQueryState } = useQueryState<StateQuery>(currentState);

  const handleChangeTabStaking = useCallback(
    (tabName: string) => {
      setQueryState({ tab: tabName });
    },
    [setQueryState]
  );
  return (
    <div className="mb-[42px] px-[16px] lg:px-[40px]">
      <h1 className="text-[32px] leading-[40px] text-black mb-[20px]">
        AAI Staking
      </h1>

      <Tabs
        selectedKey={state.tab}
        onSelectionChange={(key) => {
          sendGAEvent("TabStaking", {
            value: key,
          });
          setQueryState({ tab: String(key) });
        }}
        aria-label="Options"
        className="w-full"
        classNames={{
          tabList:
            "gap-[24px] w-full relative rounded-none p-0 bg-transparent mb-[32px] border border-solid border-transparent border-b-[#E1E2E2]",
          cursor:
            "w-full shadow-none !bg-transparent border-b border-[#000000] rounded-none",
          tab: "w-full md:max-w-fit px-0 h-[48px] bg-transparent",
          tabContent:
            "text-[16px] leading-[24px] font-medium text-[#A7AEAD] group-data-[selected=true]:text-[#202025] !group-data-[selected=true]:bg-transparent",
        }}
      >
        <Tab
          key="stake"
          title="Stake"
          className="shadow-none bg-transparent py-0"
        >
          <Stats setSelected={handleChangeTabStaking} />
        </Tab>

        <Tab key="staking" title="My staking" className="py-0">
          <MyStaking />
        </Tab>

        <Tab key="work" title="How it work" className="py-0">
          <HowItWork />
        </Tab>
      </Tabs>
    </div>
  );
}
