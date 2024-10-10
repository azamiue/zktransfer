import { useGetRemaingTime } from "./hooks/useGetRemainingTime";

export function TimeCountDown({ timeStart }: { timeStart: number }) {
  const data = useGetRemaingTime(timeStart);

  return (
    <div className="flex md:w-[400px] items-center justify-between md:justify-start gap-[8px]">
      <div className="flex-1 md:grow md:shrink md:basis-0 h-14 md:p-3 bg-zinc-100 rounded-lg justify-center items-center gap-1 flex">
        <p className="text-black text-2xl min-w-[30px]">{data.days}</p>
        <p className="text-sm text-[rgb(167,174,173)] translate-y-1">D</p>
      </div>

      <div className="flex-1 md:grow md:shrink md:basis-0 h-14 md:p-3 bg-zinc-100 rounded-lg justify-center items-center gap-1 flex">
        <p className="text-black text-2xl min-w-[30px]">{data.hours}</p>
        <p className="text-sm text-[#A7AEAD] translate-y-1">H</p>
      </div>

      <div className="flex-1 md:grow md:shrink md:basis-0 h-14 md:p-3 bg-zinc-100 rounded-lg justify-center items-center gap-1 flex">
        <p className="text-black text-2xl min-w-[30px]">{data.minutes}</p>
        <p className="text-sm text-[#A7AEAD] translate-y-1">M</p>
      </div>

      <div className="flex-1 md:grow md:shrink md:basis-0 h-14 md:p-3 bg-zinc-100 rounded-lg justify-center items-center gap-1 flex">
        <p className="text-black text-2xl min-w-[30px]">{data.seconds}</p>
        <p className="text-sm text-[#A7AEAD] translate-y-1">S</p>
      </div>
    </div>
  );
}
