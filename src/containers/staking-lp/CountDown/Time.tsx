import { calculateTimeRemaining } from "@/util/groudTime";
import { useEffect, useMemo, useState } from "react";

type Props = {
  timeStart: number;
};

export function Time({ timeStart }: Props) {
  const [time, setTime] = useState(timeStart ?? 0);

  const data = useMemo(() => {
    if (time <= 0 || !time) {
      return calculateTimeRemaining(0);
    }

    return calculateTimeRemaining(time);
  }, [time]);

  useEffect(() => {
    setTime(timeStart ?? 0);
  }, [timeStart]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prev) => prev - 1000);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="flex-1 md:grow md:shrink md:basis-0 h-14 md:p-3 bg-zinc-100 rounded-lg justify-center items-center gap-1 flex">
        <div className="text-black text-2xl font-medium font-['PP Neue Montreal'] leading-loose">
          {data?.days ?? "--"}
        </div>
        <div className="text-zinc-400 text-sm font-medium font-['PP Neue Montreal'] leading-[25px] translate-y-1">
          D
        </div>
      </div>
      <div className="flex-1 md:grow md:shrink md:basis-0 h-14 md:p-3 bg-zinc-100 rounded-lg justify-center items-center gap-1 flex">
        <div className="text-black text-2xl font-medium font-['PP Neue Montreal'] leading-loose">
          {data.hours}
        </div>
        <div className="text-zinc-400 text-sm font-medium font-['PP Neue Montreal'] leading-[25px] translate-y-1">
          H
        </div>
      </div>
      <div className="flex-1 md:grow md:shrink md:basis-0 h-14 md:p-3 bg-zinc-100 rounded-lg justify-center items-center gap-1 flex">
        <div className="text-black text-2xl font-medium font-['PP Neue Montreal'] leading-loose">
          {data.minutes}
        </div>
        <div className="text-zinc-400 text-sm font-medium font-['PP Neue Montreal'] leading-[25px] translate-y-1">
          M
        </div>
      </div>
      <div className="flex-1 md:grow md:shrink md:basis-0 h-14 md:p-3 bg-zinc-100 rounded-lg justify-center items-center gap-1 flex">
        <div className="text-black text-2xl font-medium font-['PP Neue Montreal'] leading-loose">
          {data.seconds}
        </div>
        <div className="text-zinc-400 text-sm font-medium font-['PP Neue Montreal'] leading-[25px] translate-y-1">
          S
        </div>
      </div>
    </>
  );
}
