"use client";

import { sendGAEvent } from "@next/third-parties/google";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { ModalDropDown } from "../ModalDropDown/ModalDropDown";
import { NavBar } from "./NavBar";
import { useScrollDirection } from "./useScrollHeaderData";

export function Header() {
  const scrollDirection = useScrollDirection();

  return (
    <header
      id="header"
      className={classNames(
        "fixed w-full z-[100] transition-all duration-700",
        {
          "top-0": scrollDirection === "up",
          "-top-24": scrollDirection === "down",
        }
      )}
    >
      <div className=" flex items-center justify-between gap-[18px] lg:gap-[56px] h-[56px] mx-[24px] md:mx-auto md:w-fit bg-white py-[8px] pr-[16px] pl-[22px] rounded-tr-[20px] rounded-bl-[20px]">
        <Link href={"/"} className="flex items-center gap-[4px] h-[16px]">
          <Image src="/logo/logo.svg" alt="LOGO" width={28} height={16} />
          <span className="font-medium leading-[16px]">AutoAir AI</span>
        </Link>

        <NavBar />

        <div className="flex items-center gap-x-5">
          <Link
            onClick={() => {
              sendGAEvent({ event: "buttonMeeted", value: "Meet ZKTransfer" });
            }}
            className="marquee flex items-center flex-nowrap gap-[16px] overflow-hidden w-[121px] py-[8px] bg-black rounded-[12px] rounded-br-[4px]"
            href={"https://t.me/AutoAirBot"}
            target="_blank"
          >
            {[1, 2].map((item, idx) => {
              return (
                <div
                  key={idx}
                  className="marquee__content cursor-pointer flex items-center justify-center gap-[8px] flex-nowrap flex-shrink-0"
                >
                  <Image
                    src="/icon/dot-triangle.svg"
                    alt="LOGO"
                    width={8}
                    height={8}
                  />

                  <p className="text-[16px] leading-[24px] font-medium text-white">
                    Meet ZKTransfer
                  </p>

                  <Image
                    src="/icon/dot-circle.svg"
                    alt="LOGO"
                    width={8}
                    height={8}
                  />

                  <p className="text-[16px] leading-[24px] font-medium text-white">
                    Meet ZKTransfer
                  </p>
                </div>
              );
            })}
          </Link>

          {/* Menu Mobile */}
          <div className="block md:hidden">
            <ModalDropDown />
          </div>
        </div>
        {/* <button className="md:hidden">
          <Image src="/icon/menu.svg" alt="LOGO" width={24} height={24} />
        </button> */}
      </div>

      <Link
        onClick={() => {
          sendGAEvent({ event: "buttonLaunchapp", value: " Launch App" });
        }}
        href={"/staking"}
        className="absolute hidden lg:block right-[24px] top-[4px] px-[24px] py-[12px] rounded-full bg-white text-[15px] leading-[24px] text-black"
      >
        Launch App
      </Link>
    </header>
  );
}
