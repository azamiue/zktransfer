"use client";

import { sendGAEvent } from "@next/third-parties/google";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black pt-[98px] pb-[40px] flex flex-col items-center overflow-hidden">
      <div className="marquee mb-[99px] flex items-center gap-[80px] self-stretch">
        {Array(2)
          .fill(() => 1)
          .map((_, idx) => {
            return (
              <div
                key={idx}
                className="marquee__content_2 flex items-center gap-[80px]"
              >
                {[1, 2, 3, 4, 5].map((_, id) => {
                  return (
                    <p
                      key={id}
                      className=" text-[48px] lg:text-[80px] leading-[1] lg:leading-[90px] text-white whitespace-nowrap"
                    >
                      Meet ZKTransfer
                    </p>
                  );
                })}
              </div>
            );
          })}
      </div>

      <Link
        className="px-[32px] py-[16px] rounded-full bg-white mb-[69px] flex items-center gap-[8px]"
        onClick={() => {
          sendGAEvent({ event: "buttonMeeted", value: "Meet ZKTransfer" });
        }}
        href={""}
        target="_blank"
      >
        <span className="text-[24px] leading-[32px]">Meet ZKTransfer</span>

        <Image src={"/icon/up-right.svg"} width={24} height={24} alt="UP" />
      </Link>

      <div className="mx-[16px] lg:mx-[40px] self-stretch grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] justify-between lg:items-end">
        <div className="hidden lg:flex flex-col gap-[104px]">
          <div className="flex flex-col gap-[24px]">
            <p className="text-[16px] leading-[24px] text-[#555]">Legal</p>

            <div className="flex items-center gap-[48px]">
              <Link
                onClick={() => {
                  sendGAEvent({
                    event: "Termofservice",
                    value: "Term of Service",
                  });
                }}
                href={"/"}
                className="text-[18px] lg:text-[20px] leading-[26px] lg:leading-[28px] text-white"
              >
                Term and service
              </Link>

              <Link
                onClick={() => {
                  sendGAEvent({
                    event: "Privacypolicy",
                    value: "Privacy policy",
                  });
                }}
                href={"/"}
                className="text-[18px] lg:text-[20px] leading-[26px] lg:leading-[28px] text-white"
              >
                Privacy policy
              </Link>
            </div>
          </div>

          <p className="text-[32px] leading-[40px] text-[#202025]">
            2024, All Rights Reserved
          </p>
        </div>

        <button
          onClick={() => {
            const section = document.getElementById("main");

            if (section) {
              section.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="hidden cursor-pointer w-[366px] aspect-square rounded-full border border-w10 lg:flex flex-col items-center justify-center gap-[48px]"
        >
          <Image src={"/icon/up.svg"} width={96} height={96} alt="UP" />

          <p className="text-[32px] leading-[40px] text-[#555555]">
            Back to top
          </p>
        </button>

        <div className="flex flex-col gap-[16px] lg:gap-[80px]">
          <div className="flex flex-col lg:items-end gap-[24px]">
            <p className="text-[16px] leading-[24px] text-[#555]">About Us</p>

            <div className="self-stretch justify-between lg:justify-end flex items-center gap-[16px] lg:gap-[48px]">
              <Link
                onClick={() => {
                  sendGAEvent({
                    event: "GitBook",
                    value: "GitBook",
                  });
                }}
                href={"/"}
                target="_blank"
                className="text-[18px] lg:text-[20px] leading-[26px] lg:leading-[28px] text-white"
              >
                GitBook
              </Link>

              <Link
                onClick={() => {
                  sendGAEvent({
                    event: "Blog",
                    value: "Blog",
                  });
                }}
                href={"/"}
                className="text-[18px] lg:text-[20px] leading-[26px] lg:leading-[28px] text-white"
              >
                Blog
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-end gap-[24px]">
            <p className="text-[16px] leading-[24px] text-[#555]">Social</p>

            <div className="self-stretch flex items-center justify-between lg:justify-end gap-[16px] lg:gap-[48px]">
              <Link
                onClick={() => {
                  sendGAEvent({
                    event: "Telegram",
                    value: "Telegram",
                  });
                }}
                href={"/"}
                className="text-[18px] lg:text-[20px] leading-[26px] lg:leading-[28px] text-white"
                target="_blank"
              >
                Telegram
              </Link>

              {/* <Link
                href={"https://discord.com/invite/AutoAirAI"}
                target="blank"
                className="text-[18px] lg:text-[20px] leading-[26px] lg:leading-[28px] text-white"
              >
                Discord
              </Link> */}

              <Link
                onClick={() => {
                  sendGAEvent({
                    event: "Twitter",
                    value: "Twitter",
                  });
                }}
                href={"/"}
                target="_blank"
                className="text-[18px] lg:text-[20px] leading-[26px] lg:leading-[28px] text-white"
              >
                <span className="line-through">Twitter</span> X
              </Link>
            </div>
          </div>
        </div>

        {/* only show in mobile */}
        <button
          onClick={() => {
            const section = document.getElementById("main");
            if (section) {
              section.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="mt-[40px] mb-[29px] cursor-pointer mx-auto w-[279px] lg:w-[366px] aspect-square rounded-full border border-w10 flex lg:hidden flex-col items-center justify-center gap-[24px] lg:gap-[48px]"
        >
          <Image
            src={"/icon/up.svg"}
            width={96}
            height={96}
            alt="UP"
            className="w-[80px] lgw-[96px] aspect-square"
          />

          <p className="text-[28px] lg:text-[32px] leading-[36px] lg:leading-[40px] text-[#555555]">
            Back to top
          </p>
        </button>

        <p className="lg:hidden mx-auto text-[20px] leading-[24px] text-[#202025]">
          2024, All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
