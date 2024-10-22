"use client";

import { HeaderLineProgress } from "@/components/HeaderLinePage";
import classNames from "classnames";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLayoutEffect } from "react";
import { freemium_data, premium_data } from "./data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function AutoPriceCheckEligible({
  data,
  isRight,
}: {
  data: any[];
  isRight?: boolean;
}) {
  return (
    <div
      className={classNames("flex flex-col gap-[12px] pt-[16px] lg:pt-[24px]", {
        "lg:pl-[32px] lg:border-l lg:border-[#A7AEAD]": isRight,
        "lg:pr-[32px]": !isRight,
      })}
    >
      {data.map((item, idx) => {
        return (
          <div
            key={idx}
            className={classNames("flex items-center gap-[8px]", {
              "justify-end flex-row-reverse lg:flex-row": !isRight,
            })}
          >
            {isRight && (
              <Image
                src={item.isEligible ? "/icon/check_v2.svg" : "/icon/x_v2.svg"}
                width={20}
                height={20}
                alt="ICON"
              />
            )}

            <p
              className={classNames("text-[15px] leading-[24px] ", {
                "text-[#686A6C]": !item.isEligible,
              })}
            >
              {item.title}
            </p>

            {!isRight && (
              <Image
                src={item.isEligible ? "/icon/check_v2.svg" : "/icon/x_v2.svg"}
                width={20}
                height={20}
                alt="ICON"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function AutoAirPrice() {
  useLayoutEffect(() => {
    const tween = gsap.to(".secondary-line", {
      width: "100%",
      scrollTrigger: {
        trigger: ".secondary-line",
        scrub: true,
        id: "ii",
        start: "top center",
        end: "top+=100 center",
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section
      id="pricing"
      className="mx-[16px] md:mx-[40px] mb-[64px] lg:mb-[240px]"
    >
      <HeaderLineProgress
        className="mt-[24px] mb-[24px] lg:mb-[40px]"
        page="02"
        content="Pricing"
      >
        <div className="relative w-full h-[1px] bg-[#D5D5D5]">
          <div className="secondary-line absolute h-full bg-[#686A6C]" />
        </div>
      </HeaderLineProgress>

      {/* <HeaderLinePage
        className="mt-[24px] mb-[24px] lg:mb-[40px]"
        page="02"
        content="Pricing"
      /> */}

      <h2 className="text-[48px] lg:text-[80px] leading-[56px] lg:leading-[80px] lg:text-center max-w-[930px] mx-auto mb-[16px] lg:mb-[20px]">
        Simplify your transfer journey: ZKTransfer,{" "}
        <br className="hidden lg:block" /> Expert function solution
      </h2>
      <p className="text-[20px] lg:text-[24px] leading-[28px] lg:leading-[32px] text-[#686A6C] lg:text-center mb-[32px] lg:mb-[104px]">
        Simple Pricing. Exceptional Benefits.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 justify-center gap-[24px] lg:gap-0">
        {/* content 1 */}
        <div className="bg-white rounded-[16px] p-[20px] lg:p-[0] lg:bg-[#F2F2F2]">
          <div className="lg:ml-auto w-fit lg:w-full lg:max-w-[320px] flex justify-center items-center gap-[8px] px-[24px] py-[12px] rounded-full  lg:rounded-r-none lg:rounded-l-full bg-tp10">
            <p className="text-[20px] leading-[28px]">Standard Tier</p>
            <div className="border border-black rounded-full px-[8px]">
              <p className="text-[16px] leading-[24px]">Free</p>
            </div>
          </div>

          <AutoPriceCheckEligible data={freemium_data} />
        </div>

        {/* content 2 */}
        <div className="bg-white rounded-[16px] p-[20px] lg:p-[0] lg:bg-[#F2F2F2]">
          <div className="w-fit lg:w-full lg:max-w-[320px] flex justify-center items-center gap-[8px] px-[24px] py-[12px] rounded-full lg:rounded-l-none lg:rounded-r-full bg-black">
            <p className="text-[20px] leading-[28px] text-white">
              Premium Tier
            </p>
            <div className="border border-white rounded-full px-[8px]">
              <p className="text-[16px] leading-[24px] text-white">Beta Free</p>
            </div>
          </div>

          <AutoPriceCheckEligible data={premium_data} isRight />
        </div>
      </div>
    </section>
  );
}
