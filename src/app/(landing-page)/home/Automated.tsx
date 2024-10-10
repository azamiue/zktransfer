"use client";

import Image from "next/image";
import { useState } from "react";
import { AutomatedHeaderAnimated } from "./AutomatedHeaderAnimated";
import { automated_data } from "./data";

export function Automated() {
  const [activeChainId, setActiveChainId] = useState(324);

  return (
    <section
      id="automated-by"
      className="mx-[16px] md:mx-[40px] mb-[64px] lg:mb-[240px]"
    >
      <h2 className="lg:text-center max-w-[860px] mx-auto text-[48px] lg:text-[80px] leading-[56px] lg:leading-[80px] font-medium text-black mb-[16px] lg:mb-[20px]">
        Crosschain Network <br /> by{" "}
        <div className="inline-flex items-center gap-[8px] bg-black p-[12px] rounded-[12px] rounded-br-[2px] max-h-[44px] lg:max-h-[68px]">
          <p className="text-[32px] lg:text-[56px] text-white">ZKTransfer</p>
        </div>
      </h2>

      <p className="lg:text-center text-[20px] lg:text-[24px] leading-[28px] lg:leading-[32px] lg:max-w-[551px] lg:mx-auto font-medium text-[#686A6C] mb-[32px] lg:mb-[40px]">
        ZKTransfer automates a range of tasks across multiple protocols,
        seamlessly functioning on different blockchain networks.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[126px_1fr] items-start lg:gap-[103px]">
        <AutomatedHeaderAnimated
          activeChainId={activeChainId}
          setActiveChainId={setActiveChainId}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(200px,_1fr)_minmax(200px,_1fr)] justify-center gap-[8px]">
          {automated_data.map((item, idx) => {
            let title = item.title;

            return (
              <div
                key={idx}
                className="relative h-[214px] bg-white rounded-[24px] p-[24px] flex flex-col justify-between gap-[4px]"
              >
                <div className="flex gap-[10px]">
                  <div className="w-[32px] h-[32px]">
                    <Image
                      src={item.symbol}
                      width={32}
                      height={32}
                      className="w-full h-full"
                      alt="ICON"
                    />
                  </div>

                  <p className="text-[24px] leading-[32px] font-medium text-black">
                    {title}
                  </p>
                </div>
                {activeChainId === 324 ? (
                  ""
                ) : (
                  <div className="text-sm w-full text-center">Coming soon</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
