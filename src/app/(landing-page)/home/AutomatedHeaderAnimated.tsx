"use client";

import classNames from "classnames";
import { motion } from "framer-motion";
import Image from "next/image";
import { network_data } from "./data";

export function AutomatedHeaderAnimated({
  setActiveChainId,
  activeChainId,
}: {
  activeChainId: number;
  setActiveChainId: any;
}) {
  return (
    <div className="flex flex-row lg:flex-col items-start gap-[8px] lg:gap-[16px] overflow-x-auto mb-[16px]">
      {network_data.map((item, idx) => {
        return (
          <div key={idx} className="relative flex-shrink-0">
            {activeChainId === item.chainId && (
              <motion.div
                className="absolute inset-0 w-full rounded-full border border-black lg:border-none bg-white"
                layoutId="underline"
              />
            )}

            <button
              disabled={item.chainId === -1}
              onClick={() => setActiveChainId(item.chainId)}
              className={classNames(
                "px-[20px] py-[10px] relative z-10 cursor-pointer rounded-full flex justify-start items-center gap-[8px]"
              )}
            >
              <Image
                src={item.imageUrl}
                className="w-[20px] aspect-square"
                width={40}
                height={40}
                alt="NETWORK"
              />
              <p className="text-[16px] leading-[28px] font-medium text-black">
                {item.title}
              </p>
            </button>
          </div>
        );
      })}
    </div>
  );
}
