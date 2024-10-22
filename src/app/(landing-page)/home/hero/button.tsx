"use client";

import { sendGAEvent } from "@next/third-parties/google";
import Image from "next/image";
import Link from "next/link";

export function Button() {
  return (
    <Link
      onClick={() => {
        sendGAEvent({ event: "buttonMeeted", value: " Meet ZKTransfer" });
      }}
      className="flex items-center gap-3 px-[32px] py-[14px] bg-white rounded-full"
      href={"/"}
      target="_blank"
    >
      <span className="text-[24px] leading-[32px] font-medium">
        Meet ZKTransfer
      </span>

      <Image src={"/icon/up-right.svg"} width={24} height={24} alt="UP" />
    </Link>
  );
}
