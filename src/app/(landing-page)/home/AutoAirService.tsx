"use client";

import classNames from "classnames";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import { auto_service_data } from "./data";

gsap.registerPlugin(ScrollTrigger);

export function AutoAirService() {
  const main = useRef<any>(null);

  useLayoutEffect(() => {
    if (window.innerWidth < 768) {
      return;
    }

    const ctx = gsap.context((self) => {
      const cards = gsap.utils.toArray(".cards");

      cards.forEach((card: any, index) => {
        const height = card.getBoundingClientRect().height;

        ScrollTrigger.create({
          trigger: card,
          start: `top top`,
          endTrigger: main.current,
          end: `bottom top+=${height}`,
          pin: true,
          pinSpacing: false,
          id: "pin-1",
          invalidateOnRefresh: true,
        });
      });
    }, main); // <- Scope!
    return () => ctx.revert(); // <- Cleanup!
  }, [main]);

  return (
    <section
      ref={main}
      className="px-[16px] lg:px-[40px] py-[32px] lg:py-[80px] bg-black"
    >
      <h2 className="text-[48px] lg:text-[80px] leading-[56px] lg:leading-[80px] lg:text-center text-white mb-[16px] lg:mb-[80px]">
        ZKTransfer <br className="lg:hidden" /> Service
      </h2>

      {auto_service_data.map((item, idx) => {
        return (
          <div
            key={idx}
            className={classNames(
              "cards bg-black lg:min-h-[100vh] grid grid-cols-[48px_1fr] lg:grid-cols-[2fr_7fr_3fr] 2xl:grid-cols-[2fr_8fr_2fr] gap-[16px] lg:gap-0 py-[16px] lg:py-[56px] border-t border-w20",
              {
                "border-b": idx !== auto_service_data.length,
              }
            )}
          >
            <p className="text-[24px] leading-[32px] text-white">{item.tag}</p>

            <div className="lg:pl-[40px] flex flex-col gap-[16px] lg:gap-[56px] lg:border-l border-w20">
              <p className="text-[24px] leading-[32px] text-white">
                {item.title}
              </p>

              <p
                className={classNames(
                  "text-[20px] lg:text-[32px] leading-[28px] lg:leading-[40px] text-[#686A6C]",
                  {
                    "xl:w-1/2": idx < 2,
                  }
                )}
              >
                {item.content}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
