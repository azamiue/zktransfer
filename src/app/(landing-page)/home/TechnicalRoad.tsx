"use client";

import { HeaderLineProgress } from "@/components/HeaderLinePage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import SplitType from "split-type";
import { RoadMapYear } from "./RoadMap/RoadMapYear";
import { auto_air_ai_data } from "./data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function TechnicalRoad() {
  const containerTechnical = useRef<HTMLDivElement>(null);
  const wordRefTechnical = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (window.innerWidth < 768) {
      return;
    }

    const timeline = gsap.timeline();
    const boxes = gsap.utils.toArray(".box-content1");
    const text = document.querySelector(".text-fixed-2") as any;
    const height = window.innerHeight - 300;

    const textRef = new SplitType(wordRefTechnical?.current || "", {
      types: "words",
    });

    const bgTechnical = wordRefTechnical.current?.dataset.bgColor;
    const fgTechnical = wordRefTechnical.current?.dataset.fgColor;

    const tween2 = gsap.from(".text-reveal-container-technical", {
      scrollTrigger: {
        trigger: ".text-reveal-container-technical",
        pin: false,
        scrub: 2,
        id: "oi",
        start: "top 700px",
        end: "top",
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.to(".middle-line", {
            height: `${Math.floor(self.progress * 100)}%`,
          });
        },
      },
    });
    const tween3 = gsap.from(".text-reveal-container-technical", {
      scrollTrigger: {
        trigger: ".text-reveal-container-technical",
        pin: false,
        scrub: 2,
        id: "oi",
        start: "bottom 150px",
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.to(".middle-line-2", {
            height: `${Math.floor(self.progress * 100)}%`,
          });
        },
      },
    });

    const ctx = gsap.context((self) => {
      gsap.fromTo(
        textRef.words || "",
        {
          color: bgTechnical,
        },
        {
          color: fgTechnical,
          duration: 2,
          stagger: 0.5,
          scrollTrigger: {
            trigger: wordRefTechnical.current,
            start: "center bottom",
            end: "top 300px",
            scrub: true,
            // markers: true,
            toggleActions: "play play reverse reverse",
          },
        }
      );
    }, wordRefTechnical);

    timeline
      .to(".text-fixed-1", {
        scrollTrigger: {
          trigger: ".text-fixed-1",
          endTrigger: ".section-pin-1",
          pin: true,
          // markers: true,
          start: "top 20px",
          end: "bottom bottom",
        },
      })
      .fromTo(
        ".text-fixed-2",
        { y: 0 },
        {
          y: height,
          scrollTrigger: {
            trigger: ".text-fixed-2",
            endTrigger: ".section-pin-1",
            pin: true,
            scrub: true,
            // markers: true,
            start: "top 100px",
            end: "bottom bottom",
            toggleActions: "play play reverse reverse",
          },
        }
      );

    boxes.forEach((elm: any, i) => {
      ScrollTrigger.create({
        trigger: elm as any,
        start: () => {
          if (i === 1) {
            return "top 78%";
          }

          if (i === 2) {
            return "top 80%";
          }

          return "top center";
        },
        end: "top center",
        onEnter: () => {
          if (i === 1) {
            return (text.innerText = "Q3");
          }

          if (i === 2) {
            return (text.innerText = "Q3");
          }
        },
        onLeaveBack: () => {
          if (i === 1) {
            return (text.innerText = "Q3");
          }

          if (i === 2) {
            return (text.innerText = "Q2");
          }
        },
        // markers: true,
      });
    });

    return () => {
      if (timeline) {
        timeline.kill();
      }

      ctx.revert();
      tween2.kill();
      tween3.kill();
    };
  }, []);

  return (
    <section
      id="roadmap"
      className="mx-[16px] md:mx-[40px] mb-[64px] lg:mb-[180px]"
    >
      <div
        className="fix-box-1 text-reveal-container-technical"
        ref={containerTechnical}
      >
        <HeaderLineProgress className="mb-[40px]" page="04" content="Roadmap">
          <div className="relative w-full h-[1px] bg-[#D5D5D5]">
            <div className="four-line absolute h-full bg-[#686A6C]" />
          </div>
        </HeaderLineProgress>

        <h2 className="text-[48px] lg:text-[80px] leading-[56px] lg:leading-[80px] font-medium text-black lg:text-center mb-[16px]">
          Technical Roadmap
        </h2>

        <div className="relative w-[1px] h-[688px] bg-[#E1E2E2] mx-auto mb-[16px]">
          <div className="absolute top-0 w-full bg-[#686A6C] line-vertical-1 middle-line" />
        </div>
      </div>

      {/* Mobile View Without Transition */}
      <p className="text-[32px] lg:text-[48px] leading-[40px] lg:leading-[56px] text-black max-w-[1064px] mx-auto lg:text-center block lg:hidden">
        Our roadmap is a dynamic blueprint designed to harness the synergy
        between AutoAir AI&lsquo;s technological prowess and the visionary
        investments of{" "}
        <Link href="https://a16z.com" target="_blank" className="underline">
          a16z
        </Link>{" "}
        &{" "}
        <Link
          href="https://labs.binance.com/en"
          target="_blank"
          className="underline"
        >
          Binance Labs
        </Link>
        . Here&lsquo;s how we&lsquo;re aligning our core offerings {"–"} AutoAir
        AI Bot
      </p>

      {/* Desktop view with transition */}
      <p
        ref={wordRefTechnical}
        data-bg-color="#A7AEAD"
        data-fg-color="black"
        className="text-[32px] lg:text-[48px] leading-[40px] lg:leading-[56px] text-[#A7AEAD] max-w-[1064px] mx-auto lg:text-center hidden lg:block"
      >
        Our roadmap is a dynamic blueprint crafted to leverage the synergy
        between ZKTransfer cutting-edge technology. Here&apos;s how we&apos;re
        aligning our core offerings with the ZKTransfer.
      </p>
      <div className="relative w-[1px] h-[688px] bg-[#E1E2E2] mx-auto mb-[16px]">
        <div className="absolute top-0 w-full bg-[#686A6C] line-vertical-1 middle-line-2" />
      </div>
      <RoadMapYear />
      <div className="grid grid-cols-[20px_1fr_1fr]">
        <div></div>
        <div className="h-[344px] border-r border-b border-[#A7AEAD] rounded-br-[32px] lg:rounded-br-[64px]"></div>
      </div>
      <div className="grid grid-cols-[0px_1fr] lg:grid-cols-[min-content_1fr] lg:gap-[20px]">
        <div className="border-l border-[#A7AEAD] rounded-l-[24px] flex flex-col gap-[100px]">
          <p className="text-fixed-1 w-fit h-[48px] text-[40px] leading-[1] text-white bg-black px-[8px] py-[4px] rounded-[12px] rounded-bl-[4px]">
            2024
          </p>

          <p className="hidden lg:block text-fixed-2 h-fit max-w-[76px] text-center lg:py-[4px] text-[32px] lg:text-[40px] leading-[1] font-medium border-[2px] rounded-[12px] rounded-bl-[4px] border-black">
            Q3
          </p>

          <div className="flex-1 flex flex-col justify-end">
            <p className="w-fit h-[48px] text-[40px] leading-[1] text-white bg-black px-[8px] py-[4px] rounded-[12px] rounded-tl-[4px]">
              2024
            </p>
          </div>
        </div>

        <div className="section-pin-1 pt-[130px] flex flex-col gap-[80px]">
          <div className="box-content1 flex gap-[16px]">
            <p className="lg:hidden h-fit w-fit px-[8px] lg:px-[12px] lg:py-[4px] text-[32px] lg:text-[40px] leading-[1] font-medium border-[2px] rounded-[12px] rounded-bl-[4px] border-black">
              Q1
            </p>
            <div>
              <h3 className="text-[32px] lg:text-[48px] leading-[40px] lg:leading-[56px] font-medium mb-[8px]">
                ZkTransfer
              </h3>

              <p className="text-[20px] lg:text-[28px] leading-[28px] lg:leading-[36px]">
                Introducing our flagship ZKTransfer, your ultimate tool for
                streamlined transfers and swaps.
              </p>

              <div className="w-full h-[1px] bg-[#A7AEAD] mt-[24px]" />

              {auto_air_ai_data.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="pt-[24px] flex flex-col gap-[24px]"
                  >
                    <div className="flex items-center gap-[12px]">
                      <div className="flex items-center gap-[12px] p-[4px] rounded-full pr-[12px] border border-black">
                        <div className="flex-shrink-0 w-[24px] lg:w-[32px] aspect-square rounded-full">
                          <Image
                            src={item.imageUrl}
                            width={41}
                            height={40}
                            alt="NETWORK"
                          />
                        </div>
                        <p className="text-[20px] lg:text-[24px] leading-[28px] lg:leading-[32px]">
                          {item.network}
                        </p>
                      </div>

                      <p className="text-[20px] lg:text-[24px] leading-[28px] lg:leading-[32px]">
                        Ecosystem
                      </p>
                    </div>

                    <ul className="flex flex-col gap-[16px]">
                      {item.data.map((val, idx) => {
                        return (
                          <li key={idx} className="flex items-center gap-[8px]">
                            <div className="w-[20px] h-[20px] rounded-full border border-[#A7AEAD]" />
                            <p className="text-[20px] leading-[28px] text-[#686A6C]">
                              {val.title}
                            </p>
                          </li>
                        );
                      })}
                    </ul>

                    <div className="w-full h-[1px] bg-[#A7AEAD]" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Q2 */}

          {/* Q3 */}
        </div>
      </div>
    </section>
  );
}
