"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function RoadMapYear() {
  useLayoutEffect(() => {
    const tween = gsap.fromTo(
      ".year-id",
      {
        x: "50%",
      },
      {
        x: "0%",
        scrollTrigger: {
          trigger: ".year-id",
          start: "top 80%",
          end: "bottom center",
          scrub: true,
          toggleActions: "play play reverse reverse",
        },
      }
    );

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div className="year-id flex flex-col items-center mb-[16px]">
      <p className="text-[145px] lg:text-[384px] leading-[1] font-medium text-black">
        2024
      </p>
      <p className="text-[22px] lg:text-[60px] leading-[1] lg:leading-[60px]  font-medium text-black">
        The Year of Launch and Expansion
      </p>
    </div>
  );
}
