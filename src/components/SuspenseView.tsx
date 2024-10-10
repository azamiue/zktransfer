"use client";

import { motion, useInView } from "framer-motion";
import { PropsWithChildren, useRef } from "react";

const fadeInAnimationsVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export function SuspenseView({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
  });

  return (
    <section className={`w-full h-[280px] md:h-[440px] ${className}`}>
      <motion.div
        className="h-full w-full"
        ref={ref}
        variants={fadeInAnimationsVariants}
        initial="initial"
        whileInView="animate"
      >
        {isInView && children}
      </motion.div>
    </section>
  );
}
