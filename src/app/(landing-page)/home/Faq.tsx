"use client";

import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { faq_data } from "./data";

function GetDirection(event: MouseEvent, el: any) {
  const coordinates = { x: event.pageX, y: event.pageY };
  const w = el.clientWidth;
  const h = el.clientHeight;

  const newX = (coordinates.x - el.offsetLeft - w / 2) * (w > h ? h / w : 1);
  const newY = (coordinates.y - el.offsetTop - h / 2) * (h > w ? w / h : 1);

  let direction =
    Math.round((Math.atan2(newY, newX) * (180 / Math.PI) + 180) / 90 + 3) % 4;
  return direction;
}

function FaqItem({
  item,
}: {
  item: { title: string; detail: string; id: string };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useLayoutEffect(() => {
    function hover(e: MouseEvent) {
      const hoverLayer = ref.current;

      const direction = GetDirection(e, hoverLayer);
      const target_elm = hoverLayer?.querySelector(".button-faq-item");

      function tween(topVal: string | number, rightVal: string | number) {
        if (e.type === "mouseenter") {
          gsap.fromTo(
            target_elm || "",
            {
              top: topVal,
              right: rightVal,
              stagger: 0.1,
              duration: 0.1,
            },
            {
              top: 0,
              right: 0,
              stagger: 0.1,
              duration: 0.1,
            }
          );
        } else {
          gsap.to(target_elm || "", {
            top: topVal,
            right: rightVal,
            stagger: 0.1,
            duration: 0.2,
          });
        }
      }

      // 0: top, 1: right, 2: bottom, left: 3
      switch (direction) {
        case 0:
          tween("-100%", 0);
          break;
        case 1:
          tween(0, "-100%");
          break;
        case 2:
          tween("100%", 0);
          break;
        case 3:
          tween(0, "100%");
          break;
      }
    }

    if (ref.current) {
      ref.current.addEventListener("mouseenter", hover);
      ref.current.addEventListener("mouseleave", hover);
    }

    return () => {
      window.removeEventListener("mouseenter", hover);
      window.removeEventListener("mouseleave", hover);
    };
  }, []);

  return (
    <div
      ref={ref}
      onClick={() => setIsVisible((v) => !v)}
      className={classNames(
        "select-none lg:px-[40px] groud button-faq relative overflow-hidden py-[15px] lg:py-[48px] border-b border-[#E1E2E2] cursor-pointer flex flex-col group",
        {
          "gap-[16px]": isVisible,
        }
      )}
    >
      <div className="relative z-10 grid grid-cols-[40px_1fr_32px] lg:grid-cols-[229px_1fr_56px] items-center gap-[16px]">
        <p className="text-[24px] lg:text-[48px] leading-[32px] lg:leading-[56px] font-medium text-black group-hover:text-white transition-all ease-linear">
          {item.id}
        </p>

        <div>
          <p className="text-[24px] lg:text-[48px] leading-[32px] lg:leading-[56px] font-medium text-black group-hover:text-white transition-all ease-linear">
            {item.title}
          </p>
        </div>

        <div
          className={classNames(
            "w-[32px] lg:w-[56px] aspect-square bg-black group-hover:bg-white transition-all flex items-center justify-center rounded-full",
            { "bg-white": isVisible }
          )}
        >
          <Image
            src={!isVisible ? "/icon/plus.svg" : "/icon/close.svg"}
            width={24}
            height={24}
            alt="close"
            className="group-hover:hidden"
          />
          <Image
            src={!isVisible ? "/icon/plus-white.svg" : "/icon/close.svg"}
            width={24}
            height={24}
            alt="close"
            className="hidden group-hover:block"
          />
        </div>
      </div>
      {/* translate-y-[100%] group-hover:translate-y-0 */}
      <div className="button-faq-item absolute bg-black z-0 duration-500" />
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="modal"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="relative z-10 grid grid-cols-[40px_1fr_32px] lg:grid-cols-[229px_1fr_56px] items-center gap-[16px]"
          >
            <div />
            <p className="text-[20px] lg:text-[32px] leading-[28px] lg:leading-[40px] font-medium text-[#686A6C]">
              {item.detail}
            </p>
            <div />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FaqList() {
  return (
    <div className="mb-[48px]">
      {faq_data.map((item, idx) => {
        return <FaqItem key={idx} item={item} />;
      })}
    </div>
  );
}

export function Faq() {
  return (
    <section
      id="tokenomics"
      className="linear-bg-1 p-[16px] md:p-[40px] pb-[64px] lg:pb-[240px]"
    >
      <div className="flex flex-col gap-[16px] lg:items-center max-w-[744px] mx-auto">
        <Image
          src={"/icon/qmk.png"}
          width={248}
          height={160}
          alt="QKM"
          className="w-[186px] lg:w-[248px] aspect-[248/160]"
        />

        <h2 className="max-w-[675px] text-[48px] lg:text-[80px] leading-[56px] lg:leading-[80px] text-black font-medium lg:text-center">
          Find Solutions in Our FAQs
        </h2>

        <p className="text-[20px] lg:text-[24px] leading-[28px] lg:leading-[32px] font-medium text-[#686A6C]">
          Frequently Asked Questions
        </p>
      </div>

      <div className="w-full h-[1px] bg-[#E1E2E2] mt-[24px] lg:mt-[40px]" />

      <FaqList />

      <div className="flex items-center justify-center">
        <Link
          href={
            "https://autobots-organization.gitbook.io/autoair-ai/getting-started/mission"
          }
          target="_brach"
          className="flex"
        >
          <button className="text-[24px] leading-[32px] font-medium text-black px-[32px] py-[14px] rounded-[16px] rounded-br-none bg-tp10">
            Learn more
          </button>
          <div className="w-[60px] h-[60px] bg-tp10 rounded-full grid place-items-center">
            <Image src="/icon/link.svg" width={25} height={24} alt="link" />
          </div>
        </Link>
      </div>
    </section>
  );
}
