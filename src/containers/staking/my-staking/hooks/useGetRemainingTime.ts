import { calculateTimeRemaining } from "@/util/groudTime";
import { useEffect, useMemo, useState } from "react";

export function useGetRemaingTime(timeStart: number) {
  const [time, setTime] = useState(0);

  const data = useMemo(() => {
    if (time <= 0) {
      return calculateTimeRemaining(0);
    }

    return calculateTimeRemaining(time);
  }, [time]);

  useEffect(() => {
    if (timeStart < 0) {
      return;
    }

    setTime(timeStart);
  }, [timeStart]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prev) => prev - 1000);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return data;
}
