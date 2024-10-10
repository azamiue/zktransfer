"use client";

import Image from "next/image";
import { useState } from "react";
import { CountDown } from "./CountDown";
import { ModalCenter } from "./ModalCenter/ModalCenter";

type Props = {};

export default function ModalBanner({}: Props) {
  const [isVisible, setIsVisible] = useState(
    1710684000000 - new Date().getTime() > 0
  );

  const closeModal = () => setIsVisible(false);
  return (
    <ModalCenter
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      title={"Modal"}
    >
      <div className="bg-white p-2 rounded-[32px] min-h-[343px] md:min-w-[300px] md:w-[500px] mx-4 md:mx-auto">
        <div className="relative ">
          <div className="bg-black rounded-b-[32px] md:rounded-b-[0] rounded-t-[32px]">
            <video
              className="w-full h-[300px] md:h-full rounded-b-[32px] md:rounded-b-[0] rounded-t-[32px]  opacity-60 object-cover"
              autoPlay
              loop
              muted
            >
              <source src={"/video/banner.mp4"} type="video/mp4" />
            </video>
          </div>
          <button
            className="absolute top-[-40px] md:top-4 right-2 md:right-4"
            onClick={closeModal}
          >
            <Image
              src="/icon/icon-close-white.svg"
              width={24}
              height={24}
              className=""
              alt={""}
            />
          </button>

          <div className="flex py-2 md:py-4 mt-2 justify-center items-center gap-x-3">
            <Image
              src="/icon/aai-token.png"
              width={36}
              height={36}
              className="md:w-auto md:h-auto w-8 h-8"
              alt={""}
            />
            <p className=" text-[24px] md:text-[32px] font-medium leading-[32px] ">
              AAI Listing Today 
            </p>
          </div>
          <div>
            <CountDown
              timeStart={1710684000000 - new Date().getTime()}
              onToggle={closeModal}
            />
          </div>
        </div>
      </div>
    </ModalCenter>
  );
}
