import SkeletonView from "@/components/Skeleton/SkeletonLoading";
import { formatDisplay } from "@/util/formatDisplay";
import Image from "next/image";
import { useMemo } from "react";
import { Tooltip } from "react-tooltip";
import AprContent from "../AprContent";
import { useCurrentEpoch } from "../hooks/useCurrentEpoch";
import { useCurrentEpochStartAt } from "../hooks/useCurrentEpochStartAt";
import { useGetUserStakeUserLpInfo } from "../hooks/useStakingLpInfo";
import { Time } from "./Time";

export const timeOneEpoch = 5 * 24 * 60 * 60 * 1000;

export function CountDown() {
  const { data: currentEpochStart } = useCurrentEpochStartAt();

  const { data: stakingAprInfo } = useGetUserStakeUserLpInfo();

  const { data: currentEpoch, isLoading } = useCurrentEpoch();

  const timeStart = useMemo(() => {
    const dateNow = Date.now();
    return Number(currentEpochStart) * 1000 + timeOneEpoch - dateNow;
  }, [currentEpochStart]);

  return (
    <div className="  bg-white rounded-2xl flex flex-col flex-wrap md:flex-row md:justify-between md:items-center px-4 md:px-6 py-4 md:py-auto">
      <div className="justify-start items-center gap-4 flex flex-col md:flex-row mb-4 md:mb-0">
        <div className="flex flex-row w-full md:w-auto items-center gap-x-3">
          <div className="px-7 py-[10px] md:py-3.5 rounded-[90px] border border-neutral-200 justify-center items-center gap-2 flex ">
            <SkeletonView
              isLoading={isLoading}
              className="flex rounded-xl w-[80px] h-8 md:h-10 my-auto"
            >
              <p className="text-black text-xl font-medium font-['PP Neue Montreal'] leading-7">
                {`Epoch ${Number(currentEpoch)}`}
              </p>
            </SkeletonView>
          </div>
          <Image
            src="/icon/icon-arrow-time.svg"
            width={41}
            height={8}
            alt={""}
          />
          <div className="text-neutral-500 text-xl font-medium font-['PP Neue Montreal'] leading-7 ">
            <SkeletonView
              isLoading={isLoading}
              className="flex rounded-xl w-[80px] h-8 md:h-10 my-auto"
            >
              {`Epoch ${Number(currentEpoch) + 1}`}
            </SkeletonView>
          </div>
        </div>
        <div className="w-full md:w-[400px] justify-start items-start gap-2 flex mb-4 md:mb-0">
          <Time timeStart={timeStart} />
        </div>
      </div>

      <div className="px-6 md:py-3 rounded-[90px] md:justify-start justify-center items-center gap-1 inline-flex">
        <p
          data-tooltip-id="tooltip-staking"
          className="text-center lg:text-start text-black text-2xl"
        >
          Staking APR{" "}
          {stakingAprInfo
            ? formatDisplay(Number(stakingAprInfo.totalApy), {
                decimalToShow: 2,
              })
            : "--"}
          %
        </p>

        <Tooltip id="tooltip-staking" noArrow place="bottom">
          <AprContent stakingAprInfo={stakingAprInfo} />
        </Tooltip>
      </div>
    </div>
  );
}
