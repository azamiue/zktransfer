import { calculateTimeRemaining } from "@/util/groudTime";
import { useEffect, useMemo, useState } from "react";

type Props = {
  timeStart: number;
  onToggle: () => void;
  isHiddenView?: boolean;
};

export function CountDown({ timeStart, onToggle, isHiddenView }: Props) {
  const [time, setTime] = useState(timeStart);

  const data = useMemo(() => {
    if (time <= 0) {
      return calculateTimeRemaining(0);
    }

    return calculateTimeRemaining(time);
  }, [time]);

  useEffect(() => {
    if (time > 0 || timeStart < 0) return;
    onToggle();
  }, [onToggle, time, timeStart]);

  useEffect(() => {}, []);

  useEffect(() => {
    setTime(timeStart);
  }, [timeStart]);

  useEffect(() => {
    if (timeStart < 0) return;

    const intervalId = setInterval(() => {
      setTime((prev) => prev - 1000);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeStart]);

  if (isHiddenView) return <></>;

  return (
    <ul className="flex items-center justify-between gap-2 md:gap-8 mb-6 border border-solid border-black px-2 rounded-lg mx-8 md:mx-[80px]">
      <li className=" gap-1 w-full items-center ">
        <p className="w-full text-xl md:text-2xl  py-2 rounded-xl text-center">
          {data.days} <span className=" text-primary text-sm">D</span>
        </p>
      </li>

      <li className="w-full items-center ">
        <p className="w-full text-xl md:text-2xl  py-2 rounded-xl text-center">
          {data.hours} <span className=" text-primary text-sm">H</span>
        </p>
      </li>

      <li className="w-full items-center ">
        <p className="w-full text-xl md:text-2xl  py-2 rounded-xl text-center">
          {data.minutes} <span className=" text-primary text-sm">M</span>
        </p>
      </li>

      <li className=" w-full items-center ">
        <p className="w-full text-xl md:text-2xl  py-2 rounded-xl text-center">
          {data.seconds} <span className=" text-primary text-sm">S</span>
        </p>
      </li>
    </ul>
  );
}
