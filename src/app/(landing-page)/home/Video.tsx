"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function VideoComponent() {
  useLayoutEffect(() => {
    const timeline = gsap.timeline({});

    timeline
      .to(".hero-section", {
        borderBottomLeftRadius: 56,
        borderBottomRightRadius: 56,
        marginRight: 40,
        marginLeft: 40,
        scrollTrigger: {
          trigger: ".hero-section",
          scrub: true,
          id: "ii",
          start: "top top",
          end: "bottom 70%",
          invalidateOnRefresh: true,
        },
      })
      .fromTo(
        ".overlay-hero11",
        {
          opacity: 0,
        },
        {
          opacity: 0.8,
          scrollTrigger: {
            trigger: ".hero-section",
            scrub: true,
            id: "ii",
            start: "top top",
            end: "bottom  top",
            invalidateOnRefresh: true,
          },
        }
      );

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <>
      <video
        className="absolute inset-0 w-full h-full bg-[#5f707e] object-cover"
        playsInline
        autoPlay
        loop
        muted
        preload="none"
        poster="/bg/preview.jpg"
      >
        <source
          src={"/video/bg2.mp4"}
          type="video/mp4"
          // media="screen and (min-width:800px)"
          // className="hidden lg:block"
        />
      </video>

      <div className="overlay-hero11 absolute inset-0 bg-black" />
    </>
  );
}
