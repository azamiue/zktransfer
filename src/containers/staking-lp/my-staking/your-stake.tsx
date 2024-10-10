import SkeletonView from "@/components/Skeleton/SkeletonLoading";
import { formatDisplayFloor } from "@/util/formatDisplay";
import { formatEther } from "ethers/lib/utils";
import { useCallback, useMemo } from "react";
import { useGetLpBalance } from "../hooks/useGetLpBalance";
import { useGetUserStaked } from "../hooks/useGetUserStaked";
import { ListUnstake } from "./list-unstake";
import { ButtonActionStake } from "./stake-button";

export function YourStake() {
  const {
    data: balanceData,
    mutate: mutateBalance,
    isLoading,
  } = useGetLpBalance();

  const { data: balanceStaked } = useGetUserStaked();

  const userStaked = useMemo(() => {
    if (!balanceStaked) {
      return "--";
    }

    const value = formatEther(balanceStaked);

    return formatDisplayFloor(Number(value), { decimalToShow: 2 });
  }, [balanceStaked]);

  const aai_balance = useMemo(() => {
    if (!balanceData) {
      return "--";
    }

    const value = formatEther(balanceData);

    return formatDisplayFloor(Number(value), { decimalToShow: 2 });
  }, [balanceData]);

  const onRedeemSuccess = useCallback(() => {
    mutateBalance();
  }, [mutateBalance]);

  return (
    <div className="p-2 bg-black rounded-[16px] pl-2  md:pl-2 mb-[40px]">
      <div className="flex flex-col md:flex-row items-center justify-between px-1 md:px-0 md:pl-10">
        <div className="flex w-full flex-col pt-2 md:pt-0  gap-[8px] px-5 md:px-0">
          <p className="text-[16px] leading-[24px] text-[#A7AEAD]">
            Your Staked
          </p>

          <div className="flex flex-col md:flex-row md:items-center mb-[64px] md:mb-0  md:gap-[24px]">
            <div className="text-[32px] 2xl:text-[48px] leading-[1.16] text-white flex items-center gap-x-1">
              <SkeletonView
                isLoading={isLoading}
                className="flex rounded-xl w-[80px] h-8 my-auto"
              >
                {userStaked}
              </SkeletonView>

              <span className="text-[24px] leading-[48px] text-[#A7AEAD] translate-y-1 md:translate-y-[3px] lg:translate-y-[3px] 2xl:translate-y-2">
                AAI/ETH LP
              </span>
            </div>

            <div className="flex md:justify-between items-center gap-[16px] mt-4 md:mt-0">
              <ButtonActionStake />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[8px] px-8 py-6 mb-2 md:mb-0 bg-white rounded-[16px] min-w-[283px] md:max-w-fit 2xl:max-w-[507px] w-full">
          <p>Your balance</p>

          <div className="text-[32px] 2xl:text-[48px] leading-[56px] text-[#202025] flex items-center gap-x-1">
            <SkeletonView
              isLoading={isLoading}
              className="flex rounded-xl w-[80px] h-8 my-auto"
            >
              <p>
                {aai_balance}
                <span className="text-[24px] leading-[48px] text-[#A7AEAD]">
                  {" "}
                  AAI/ETH LP
                </span>
              </p>
            </SkeletonView>
          </div>
        </div>
      </div>

      <ListUnstake onRedeemSuccess={onRedeemSuccess} />
    </div>
  );
}
