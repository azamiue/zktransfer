import { StakeInfoContext } from "@/app/(staking)/staking/type";
import { formatDisplay } from "@/util/formatDisplay";
import { sendGAEvent } from "@next/third-parties/google";
import Image from "next/image";
import { useContext, useMemo } from "react";

export function Stats({
  setSelected,
}: {
  setSelected: (tabName: string) => void;
}) {
  const data = useContext(StakeInfoContext);

  const formatData = useMemo(() => {
    if (!data.staking_info) {
      return {
        percentStaked: "--",
        staker: "--",
        stakingApr: "--",
        totalStake: "--",
        tvl: "--",
      };
    }

    return {
      percentStaked: formatDisplay(Number(data.staking_info.percentStaked), {
        decimalToShow: 2,
      }),
      staker: formatDisplay(Number(data.staking_info.staker), {
        decimalToShow: 2,
      }),
      stakingApr: formatDisplay(Number(data.staking_info.stakingApr), {
        decimalToShow: 2,
      }),
      totalStake: formatDisplay(Number(data.staking_info.totalStake), {
        decimalToShow: 2,
      }),
      tvl: formatDisplay(Number(data.staking_info.tvl), { decimalToShow: 2 }),
    };
  }, [data.staking_info]);

  return (
    <div className="grid items-stretch grid-cols-1 xl:grid-cols-[2fr_1fr] gap-[8px]">
      <div className="flex flex-col justify-between gap-[16px] lg:gap-[8px] px-[24px] lg:px-[40px] py-[24px] lg:py-[32px] bg-white rounded-[24px] min-h-[184px]">
        <p className="text-[16px] leading-[24px] text-[#686A6C]">Total Stake</p>

        <div className="flex flex-col lg:flex-row lg:items-center gap-[16px]">
          <div className="flex items-center gap-[8px]">
            <Image
              src="/staking/aai-x4.png"
              width={176}
              height={176}
              alt="aai"
              className="w-[32px] lg:w-[44px] aspect-square"
            />

            <p className="text-[32px] lg:text-[48px] leading-[40px] lg:leading-[56px] text-[#202025]">
              {formatData.totalStake}{" "}
              <span className="text-[24px] leading-[48px] text-[#A7AEAD]">
                AAI
              </span>
            </p>
          </div>

          <button
            onClick={() => {
              sendGAEvent({
                event: "StakingJoin",
                value: "StakingJoin",
              });
              setSelected("staking");
            }}
            className="self-stretch lg:self-center px-[24px] py-[10px] bg-black text-white rounded-full"
          >
            Stake
          </button>
        </div>
      </div>

      <div className="flex flex-col justify-between px-[24px] lg:px-[40px] gap-[16px] py-[24px] lg:py-[32px] bg-white rounded-[24px] lg:min-h-[184px]">
        <p className="text-[16px] leading-[24px] text-[#686A6C]">Staking APR</p>

        <p className="text-[32px] lg:text-[48px] leading-[40px] lg:leading-[56px] text-[#202025]">
          APR {formatData.stakingApr}%
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[8px]">
        <div className="flex flex-col justify-between gap-[16px] px-[24px] lg:px-[40px] py-[24px] lg:py-[32px] bg-white rounded-[24px] lg:min-h-[184px]">
          <p className="text-[16px] leading-[24px] text-[#686A6C]">TVL</p>

          <p className="truncate text-[32px] lg:text-[48px] leading-[40px] lg:leading-[56px] text-[#202025]">
            ${formatData.tvl}
          </p>
        </div>

        <div className="flex flex-col justify-between gap-[16px] px-[24px] lg:px-[40px] py-[24px] lg:py-[32px] bg-white rounded-[24px] lg:min-h-[184px]">
          <p className="text-[16px] leading-[24px] text-[#686A6C]">Staker</p>

          <p className="truncate text-[32px] lg:text-[48px] leading-[40px] lg:leading-[56px] text-[#202025]">
            {formatData.staker}
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-[16px] px-[24px] lg:px-[40px] py-[24px] lg:py-[32px] bg-white rounded-[24px] lg:min-h-[184px]">
        <p className="text-[16px] leading-[24px] text-[#686A6C]">
          Percent Staked (%)
        </p>

        <p className="truncate text-[32px] lg:text-[48px] leading-[40px] lg:leading-[56px] text-[#202025]">
          {formatData.percentStaked}%
        </p>
      </div>
    </div>
  );
}
