import { StakeInfoContext } from "@/app/(staking)/staking/type";
import { Skeleton } from "@nextui-org/react";
import Image from "next/image";
import { useContext, useMemo } from "react";
import { Tooltip } from "react-tooltip";
import { useGetCurrentEpoch } from "./hooks/useGetCurrentEpoch";
import { TimeCountDown } from "./time-count-down";

export const timeOneEpoch = 5 * 24 * 60 * 60 * 1000;

export function Apr() {
  const { apr_info: stakingAprInfo } = useContext(StakeInfoContext);

  return (
    <div className="p-4 bg-white rounded-2xl flex-col justify-start items-start gap-3 inline-flex">
      <div className="self-stretch justify-between items-start inline-flex gap-[48px]">
        <p className="text-black text-sm">AAI </p>
        <p className="text-black text-sm">{stakingAprInfo?.apyAai ?? "--"}%</p>
      </div>

      <div className="self-stretch h-[0px] border border-[#F2F4F4]" />

      <div className="self-stretch justify-between items-start inline-flex gap-[48px]">
        <p className="text-black text-sm">HOLD</p>
        <p className="text-black text-sm">{stakingAprInfo?.apyHold ?? "--"}%</p>
      </div>

      {/* <div className="self-stretch h-[0px] border border-[#F2F4F4]"></div>

      <div className="self-stretch justify-between items-start inline-flex gap-[48px]">
        <p className="text-black text-sm">ETH</p>
        <p className="text-black text-sm">
          APR {stakingAprInfo?.apyEth ?? "--"}%
        </p>
      </div> */}
    </div>
  );
}

export function CountDown() {
  const {
    currentEpoch,
    isLoading,
    currentEpochStartAt: currentEpochStart,
  } = useGetCurrentEpoch();

  const { apr_info: stakingAprInfo } = useContext(StakeInfoContext);

  const timeStart = useMemo(() => {
    return Number(currentEpochStart || 0) * 1000 + timeOneEpoch - Date.now();
  }, [currentEpochStart]);

  const content = useMemo(() => {
    if (!currentEpoch) {
      return {
        currentEpoch: "--",
        nextEpoch: "--",
      };
    }

    return {
      currentEpoch: String(currentEpoch),
      nextEpoch: (Number(currentEpoch) + 1).toString(),
    };
  }, [currentEpoch]);

  return (
    <div className="p-[16px] lg:p-[24px] bg-white rounded-2xl flex flex-col lg:flex-row flex-wrap justify-between items-center gap-[24px] mb-[40px]">
      <div className="justify-start items-center gap-4 flex w-full md:w-auto">
        <div className="px-7 py-[10px] lg:py-3.5 rounded-[90px] border border-[#E1E2E2] flex justify-center items-center gap-2">
          <Skeleton isLoaded={!isLoading}>
            <p className="truncate text-black text-xl">
              Epoch {content.currentEpoch}
            </p>
          </Skeleton>
        </div>

        <Image
          src="/icon/icon-arrow-time.svg"
          width={41}
          height={8}
          alt={"ARROW"}
        />

        <Skeleton isLoaded={!isLoading}>
          <p className="truncate text-[#686A6C] text-xl">
            Epoch {content.nextEpoch}
          </p>
        </Skeleton>
      </div>

      <div className="flex-1 w-full ">
        <TimeCountDown timeStart={timeStart} />
      </div>

      <p
        data-tooltip-id="tooltip-staking-2"
        className="text-center lg:text-start text-black text-2xl"
      >
        Staking APR {stakingAprInfo ? Number(stakingAprInfo.totalApy) : "--"}%
      </p>

      <Tooltip id="tooltip-staking-2" noArrow place="bottom">
        <Apr />
      </Tooltip>
    </div>
  );
}
