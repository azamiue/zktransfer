"use client";

import { useQueryState } from "@/hooks/useQueryState";
import { sendGAEvent } from "@next/third-parties/google";
import { Tab, Tabs } from "@nextui-org/react";
import Image from "next/image";
import { useCallback } from "react";
import ContextProvider from "./ContextProvider";
import { StakeTab } from "./Stake/stakeTab";
import { HowItWork } from "./how-it-work";
import { MyStaking } from "./my-staking/my-staking";

type StateQuery = {
  tab: string;
};

const currentState = {
  tab: "stats",
};

export default function StakingLp() {
  const { state, setQueryState } = useQueryState<StateQuery>(currentState);

  const handleChangeTabStaking = useCallback(
    (tabName: string) => {
      setQueryState({ tab: tabName });
    },
    [setQueryState]
  );

  return (
    <ContextProvider>
      <div className="mb-[42px] px-4 md:px-[40px]">
        <h1 className="text-[32px] leading-[40px] text-black mb-[20px]">
          LP Staking
        </h1>

        <Tabs
          selectedKey={state.tab}
          onSelectionChange={(key) => {
            sendGAEvent("TabStakingLp", {
              value: key,
            });
            setQueryState({ tab: String(key) });
          }}
          aria-label="Options"
          className="w-full"
          classNames={{
            tabList:
              "gap-[24px] w-full relative rounded-none p-0 bg-transparent mb-1 md:mb-[32px] border border-solid border-transparent border-b-[#E1E2E2]",
            cursor:
              "w-full shadow-none !bg-transparent border-b border-[#000000] rounded-none",
            tab: "w-full md:max-w-fit px-0 h-[48px] bg-transparent",
            tabContent:
              "text-[16px] leading-[24px] font-medium text-[#A7AEAD] group-data-[selected=true]:text-[#202025] !group-data-[selected=true]:bg-transparent",
          }}
        >
          <Tab
            key="stats"
            title="Stake"
            className="shadow-none bg-transparent "
          >
            <StakeTab setSelected={handleChangeTabStaking} />
          </Tab>

          <Tab key="staking" title="My staking" href="">
            <MyStaking />
          </Tab>

          <Tab
            key="lp"
            title={
              <div className="flex items-center gap-x-[4px]">
                <span>Add LP</span>

                <Image
                  src={"/icon/up-right-gray.svg"}
                  width={21}
                  height={20}
                  alt="UP"
                />
              </div>
            }
            target="_blank"
            href="https://syncswap.xyz/pool/0x548b61b2B2AF4618aD58B2F579764F857e271Db9"
          />

          <Tab key="work" title="How it work">
            <HowItWork />
          </Tab>
        </Tabs>
      </div>
    </ContextProvider>
  );
}
