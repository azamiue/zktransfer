import SkeletonView from "@/components/Skeleton/SkeletonLoading";
import { formatDisplay } from "@/util/formatDisplay";
import { sendGAEvent } from "@next/third-parties/google";
import Image from "next/image";
import { useMemo } from "react";
import { useStakingLpInfo } from "../hooks/useStakingLpInfo";

export function StakeTab({
  setSelected,
}: {
  setSelected: (tabName: string) => void;
}) {
  const { data, isLoading } = useStakingLpInfo();

  const formatData = useMemo(() => {
    if (!data) {
      return {
        percentStaked: "--",
        staker: "--",
        stakingApr: "--",
        totalStake: "--",
        tvl: "--",
      };
    }

    return {
      percentStaked: data.percentStaked,
      staker: data.staker,
      stakingApr: data.stakingApr,
      totalStake: data.totalStake,
      tvl: data.tvl,
    };
  }, [data]);

  return (
    <div className="grid items-stretch grid-cols-1 xl:grid-cols-[2fr_1fr] gap-[8px]">
      <div className="flex flex-col justify-between gap-[8px] px-6 md:px-[40px] py-[32px] bg-white rounded-[24px] min-h-[184px]">
        <p className="text-base leading-[24px] text-[#686A6C]">Total Stake</p>

        <div className="flex flex-col md:flex-row items-center gap-[16px]">
          <div className="min-w-[150px] w-full md:w-auto min-h-[56px] flex items-start md:items-center">
            <div className="flex h-full w-8 md:w-[44px] relative mr-8 items-center shrink-0">
              <Image
                src="/staking/aai.png"
                width={48}
                height={48}
                alt="aai"
                className="w-8 h-8 md:w-[44px] md:h-[44px] z-20 aspect-square "
              />
              <Image
                src="/staking/eth.png"
                width={48}
                height={48}
                alt="aai"
                className="w-8 h-8 md:w-[44px] md:h-[44px] absolute left-6 z-0 aspect-square"
              />
            </div>
            <div className="flex items-end">
              <SkeletonView
                isLoading={isLoading}
                className="flex rounded-xl w-[100px] h-10 my-auto"
              >
                <p className="text-[32px] md:text-[48px] leading-[56px] text-[#202025]">
                  {formatDisplay(Number(formatData.totalStake ?? 0), {
                    decimalToShow: 2,
                  })}
                </p>
              </SkeletonView>
              <span className="pl-[4px] text-[24px] leading-[48px] md:leading-[38px] text-[#A7AEAD]">
                LP
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              sendGAEvent({
                event: "StakingTabStake",
                value: "StakingTabStake",
              });

              setSelected("staking");
            }}
            className="px-6 py-4 md:py-[10px] bg-black text-white rounded-full w-full md:w-auto"
          >
            Stake
          </button>
        </div>
      </div>

      <div className="flex flex-col justify-between px-[40px] py-6 md:py-[32px] bg-white rounded-[24px] md:min-h-[184px]">
        <p className="text-[16px] leading-[24px] mb-4 md:mb-auto text-[#686A6C]">
          Staking APR
        </p>

        <div className="text-[32px] md:text-[48px] leading-[56px] text-[#202025]">
          <SkeletonView
            isLoading={isLoading}
            className="flex rounded-xl w-full h-10 my-auto"
          >
            {`APR ${formatDisplay(Number(formatData.stakingApr ?? 0), {
              decimalToShow: 2,
            })}%`}
          </SkeletonView>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[8px]">
        <div className="flex flex-col justify-between px-[40px] py-6 md:py-8 bg-white rounded-[24px] md:min-h-[184px]">
          <p className="text-[16px] leading-[24px] text-[#686A6C]">TVL</p>

          <div className="text-[32px] md:text-[48px] leading-[56px] text-[#202025]">
            <SkeletonView
              isLoading={isLoading}
              className="flex rounded-xl w-full h-10 my-auto"
            >
              {`$${formatDisplay(Number(formatData.tvl ?? 0), {
                decimalToShow: 2,
              })}`}
            </SkeletonView>
          </div>
        </div>

        <div className="flex flex-col justify-between px-[40px] py-6 md:py-8 bg-white rounded-[24px] md:min-h-[184px]">
          <p className="text-[16px] leading-[24px] text-[#686A6C]">Staker</p>

          <div className="text-[32px] md:text-[48px] leading-[56px] text-[#202025]">
            <SkeletonView
              isLoading={isLoading}
              className="flex rounded-xl w-full h-10 my-auto"
            >
              {formatData.staker}
            </SkeletonView>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between px-[40px] py-6 md:py-8 bg-white rounded-[24px] md:min-h-[184px]">
        <p className="text-[16px] leading-[24px] text-[#686A6C]">
          Percent Staked (%)
        </p>

        <div className="text-[32px] md:text-[48px] leading-[56px] text-[#202025]">
          <SkeletonView
            isLoading={isLoading}
            className="flex rounded-xl w-full h-10 my-auto"
          >
            {`${formatData.percentStaked}%`}
          </SkeletonView>
        </div>
      </div>
    </div>
  );
}
