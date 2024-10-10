import { formatNumber } from "@/util/numbers";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  number: number;
  className: string;
};

function animateValue(
  obj: any,
  start: number,
  value: number,
  value2: number,
  text: string,
  duration: number
) {
  let startTimestamp = 0 as any;
  const step = (timestamp: any) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML =
      Math.floor(progress * (value - start)) +
      (value2 > 0 ? "." : "") +
      (value2 > 0
        ? (value2 > 10 ? "" : "0") + Math.floor(progress * (value2 - start))
        : "") +
      text;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

export default function NumberChange({ number, className }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    const obj = document.getElementById(`${number}`);
    const { value, value2, text } = formatNumber(number);
    isInView && animateValue(obj, 0, value, value2, text, 500);
  }, [isInView, number]);

  return (
    <span ref={ref} id={`${number}`} className={className}>
      0
    </span>
  );
}
