import { formatDisplay } from "@/util/formatDisplay";
import { Skeleton } from "@nextui-org/react";
import { formatEther } from "ethers/lib/utils";
import { useMemo } from "react";
import { useGetAAIBalance } from "./hooks/useGetAAIBalance";
import { useGetUserStaked } from "./hooks/useGetUserStaked";
import { ListUnstake } from "./list-unstake";
import { ButtonStake } from "./stake-button";

export function YourStake() {
  const { data, isLoading } = useGetUserStaked();
  const { data: balanceData, isLoading: isLoadingAAi } = useGetAAIBalance();

  const userStaked = useMemo(() => {
    if (!data) {
      return "--";
    }

    const value = formatEther(data);

    return formatDisplay(Number(value), { decimalToShow: 2 });
  }, [data]);

  const aai_balance = useMemo(() => {
    if (!balanceData) {
      return "--";
    }

    const value = formatEther(balanceData);

    return formatDisplay(Number(value), { decimalToShow: 2 });
  }, [balanceData]);

  return (
    <div className="pt-[24px] lg:p-[8px] p-[8px] bg-black rounded-[16px] mb-[40px]">
      <div className="md:ml-[32px] flex flex-col lg:flex-row items-stretch lg:items-center justify-between  gap-[64px] lg:gap-[8px]">
        <div className="flex flex-col gap-[8px] px-[16px] lg:px-0">
          <p className="text-[16px] leading-[24px] text-[#A7AEAD]">
            Your Staked
          </p>

          <div className="flex flex-col lg:flex-row lg:items-end gap-[24px]">
            <Skeleton isLoaded={!isLoading}>
              <p className="text-[32px] lg:text-[48px] leading-[1.16] text-white">
                {userStaked}
                <span className="text-[24px] leading-[48px] text-[#A7AEAD]">
                  {" "}
                  AAI
                </span>
              </p>
            </Skeleton>

            <div className="grid grid-cols-2 lg:flex items-center gap-[16px]">
              <ButtonStake />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[8px] px-[32px] py-[32px] lg:py-[24px] bg-white rounded-[16px] min-w-[203px] lg:max-w-fit 2xl:max-w-[437px] w-full">
          <p>Your balance</p>

          <Skeleton isLoaded={!isLoadingAAi}>
            <p className="text-[32px] lg:text-[48px] leading-[56px] text-[#202025]">
              {aai_balance}{" "}
              <span className="text-[24px] leading-[48px] text-[#A7AEAD]">
                AAI
              </span>
            </p>
          </Skeleton>
        </div>
      </div>

      <ListUnstake />
    </div>
  );
}
