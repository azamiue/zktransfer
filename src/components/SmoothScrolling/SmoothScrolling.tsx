"use client";

import ReactLenis from "@studio-freight/react-lenis";
import React from "react";

export default function SmoothScrolling({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis
      options={{
        duration: 0.5,
      }}
      root
    >
      {children}
    </ReactLenis>
  );
}
