import dayjs from "dayjs";

export function groupTime(data: any[]) {
  try {
    if (!data.length) {
      return [];
    }
    const result: string[] = [];
    data.reduce((arr, item) => {
      if (!arr.includes(dayjs(item.start_date).format("M-DD"))) {
        result.push(dayjs(item.start_date).format("MMM DD"));
      }
      arr.push(dayjs(item.start_date).format("M-DD"));
      return arr;
    }, []);
    const item1 = result.slice(0, 1);
    const item2 = result.slice(
      Math.ceil(result.length / 2),
      Math.ceil(result.length / 2) + 1
    );

    const item3 = result.slice(-1);

    return [...item1, ...item2, ...item3];
  } catch {
    return [];
  }
}

export function formatNumberWithLeadingZero(number: number) {
  return number < 10 ? "0" + number : number;
}

export function calculateTimeRemaining(totalMilliseconds: number) {
  let totalSeconds = totalMilliseconds / 1000;

  let days = Math.floor(totalSeconds / (24 * 3600));
  totalSeconds %= 24 * 3600;

  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;

  let minutes = Math.floor(totalSeconds / 60);

  let seconds = Math.floor(totalSeconds % 60);
  return {
    days: formatNumberWithLeadingZero(days),
    hours: formatNumberWithLeadingZero(hours),
    minutes: formatNumberWithLeadingZero(minutes),
    seconds: formatNumberWithLeadingZero(seconds),
  };
}
