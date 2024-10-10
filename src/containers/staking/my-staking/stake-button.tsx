"use client";

import { ModalCenter } from "@/components/ModalCenter/ModalCenter";
import { sendGAEvent } from "@next/third-parties/google";
import { Tab, Tabs } from "@nextui-org/react";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { useCallback, useState } from "react";
import { Stake } from "./stake/stake";
import { UnStake } from "./unstake/unstake";

export function ButtonStake() {
  const [state, setState] = useState({
    isVisible: false,
    key: "stake",
  });

  const { address } = useWeb3ModalAccount();

  const { open } = useWeb3Modal();

  const handleChangeTab = useCallback(
    (key: string) => {
      if (!address) {
        return open();
      }
      setState((v) => ({
        ...v,
        isVisible: true,
        key: key,
      }));
    },
    [address, open]
  );

  return (
    <>
      <button
        onClick={() => {
          sendGAEvent({
            event: "UnstakeMystaking",
            value: "UnstakeMystaking",
          });
          handleChangeTab("unstake");
        }}
        className="px-[24px] py-[12px] rounded-full bg-[#202025] text-[16px] leading-[24px] text-[#FFF]"
      >
        Unstake
      </button>

      <button
        onClick={() => {
          sendGAEvent({
            event: "UnstakeMystaking",
            value: "UnstakeMystaking",
          });
          handleChangeTab("stake");
        }}
        className="px-[24px] py-[12px] rounded-full bg-white text-[16px] leading-[24px] text-black"
      >
        Stake
      </button>

      {state.isVisible && (
        <ModalCenter
          isVisible={state.isVisible}
          isHeader
          setIsVisible={() => {
            setState((v) => ({ ...v, isVisible: false }));
          }}
          title={"Staking"}
          className="bg-white !max-w-[440px] w-full p-[20px] lg:p-[24px] mb-[24px]"
        >
          <Tabs
            defaultSelectedKey={state.key}
            aria-label="Tabs stake"
            classNames={{
              base: "flex items-center justify-center",
            }}
          >
            <Tab key="stake" title="Stake">
              <Stake
                setIsVisible={() => {
                  setState((v) => ({ ...v, isVisible: false }));
                }}
              />
            </Tab>

            <Tab key="unstake" title="Unstake">
              <UnStake
                setIsVisible={() => {
                  setState((v) => ({ ...v, isVisible: false }));
                }}
              />
            </Tab>
          </Tabs>
        </ModalCenter>
      )}
    </>
  );
}
