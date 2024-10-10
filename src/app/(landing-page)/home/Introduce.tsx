"use client";

import { HeaderLineProgress } from "@/components/HeaderLinePage";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export function Introduce() {
  const container = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (window.innerWidth < 768) {
      return;
    }

    const text = new SplitType(wordRef?.current || "", { types: "words" });

    const bg = wordRef.current?.dataset.bgColor;
    const fg = wordRef.current?.dataset.fgColor;

    const tween1 = gsap.from(".text-reveal-container", {
      scrollTrigger: {
        trigger: ".text-reveal-container",
        pin: true,
        scrub: 2,
        id: "oi",
        start: "top 15px",
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.to(".top-line", {
            width: `${Math.floor(self.progress * 100)}%`,
          });
        },
      },
    });

    const ctx = gsap.context((self) => {
      gsap.fromTo(
        text.words || "",
        {
          color: bg,
        },
        {
          color: fg,
          duration: 2,
          stagger: 0.5,
          scrollTrigger: {
            trigger: wordRef.current,
            start: "top center",
            // end: "bottom 200",
            scrub: true,
            // markers: true,
            toggleActions: "play play reverse reverse",
          },
        }
      );
    }, wordRef); // <- Scope!
    return () => {
      ctx.revert();
      tween1.kill();
    }; // <- Cleanup!
  }, []);

  return (
    <section
      id="introduction"
      className="mx-[16px] lg:mx-[40px] mt-[24px] lg:mt-[38px] mb-[64px] lg:mb-[212px]"
    >
      <div className="text-reveal-container" ref={container}>
        <HeaderLineProgress
          className="mb-[24px] lg:mb-[124px] 2xl:mb-[156px]"
          page="01"
          content="Introduction"
        >
          <div className="relative w-full h-[1px] bg-[#D5D5D5]">
            <div className="top-line absolute h-full bg-[#686A6C]" />
          </div>
        </HeaderLineProgress>

        {/* mobile view */}
        <p className="lg:hidden text-[32px] leading-[40px] font-medium text-black">
          Introducing ZKTransfer – your go-to solution for seamless transfer and
          swap functionality! Leveraging advanced AI, ZKTransfer analyzes
          previous transaction data to create a strategy optimized for your
          needs. With effortless 1-click access across platforms, you can unlock
          a world of opportunities while enjoying top-tier performance. Get
          ready to experience the future of transfers with ZKTransfer by your
          side!
        </p>

        <p
          ref={wordRef}
          data-bg-color="#A7AEAD"
          data-fg-color="black"
          className="hidden lg:block max-w-[1019px] mx-auto text-center text-[48px] leading-[56px] font-medium text-[#A7AEAD]"
        >
          Introducing ZKTransfer – your go-to solution for seamless transfer and
          swap functionality! Leveraging advanced AI, ZKTransfer analyzes
          previous transaction data to create a strategy optimized for your
          needs. Get ready to experience the future of transfers with ZKTransfer
          by your side!
        </p>
      </div>
    </section>
  );
}
