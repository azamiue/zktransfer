"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import { autoair_feature_data } from "./data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AutoAirFeature() {
  const main = useRef<any>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context((_) => {
      const lines: any[] = gsap.utils.toArray(".three-line-update");

      for (let i = 0; i < lines.length; i++) {
        const elm = lines[i];

        gsap.to(".three-line-update", {
          width: "100%",
          scrollTrigger: {
            trigger: elm,
            scrub: true,
            id: "ii",
            start: "top center",
            end: "top+=100 center",
            invalidateOnRefresh: true,
          },
        });
      }
    }, main.current);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="mx-[16px] md:mx-[40px] mb-[64px] lg:mb-[240px]">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(200px,_363px)_minmax(200px,_363px)_minmax(200px,_363px)] justify-between gap-[16px] lg:gap-[4px] mb-[40px] lg:mb-[72px]">
        <h2 className="text-[48px] lg:text-[80px] leading-[56px] lg:leading-[80px] text-black min-w-[336px]">
          ZKTransfer Features
        </h2>

        <div className="flex flex-col gap-[8px] col-span-2">
          <p className="max-w-[690px] text-[20px] lg:text-[24px] leading-[28px] lg:leading-[32px] font-medium text-[#686A6C]">
            ZKTransfer AI simplifies transfer and swap processes, removing any
            complexity. By analyzing on-chain transactions from high-performing
            wallets, we offer an effortless solution for users of all experience
            levels.
          </p>
          <h3 className="text-[28px] lg:text-[32px] leading-[36px] lg:leading-[40px] font-medium">
            Our key features
          </h3>
        </div>
      </div>

      <div
        ref={main}
        className="grid grid-cols-1 lg:grid-cols-[minmax(200px,_363px)_minmax(200px,_363px)_minmax(200px,_363px)] justify-between gap-[48px] lg:gap-[4px]"
      >
        {autoair_feature_data.map((item, idx) => {
          return (
            <div key={idx} className="flex flex-col gap-[8px] lg:gap-[16px]">
              <p className="text-[20px] leading-[28px]">{item.number}</p>

              <div className="relative w-full h-[1px] bg-[#E1E2E2]">
                <div className="three-line-update absolute h-full bg-[#686A6C]" />
              </div>

              <div>
                <h3 className="text-[24px] leading-[32px] font-medium text-black mb-[8px]">
                  {item.title}
                </h3>

                <p className="text-[20px] leading-[26px] font-medium text-[#686A6C]">
                  {item.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
