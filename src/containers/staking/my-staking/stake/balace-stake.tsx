import { StakeInfoContext } from "@/app/(staking)/staking/type";
import { formatDisplay } from "@/util/formatDisplay";
import BigNumber from "bignumber.js";
import { formatEther } from "ethers/lib/utils";
import Image from "next/image";
import { useContext, useMemo } from "react";
import { useGetAAIBalance } from "../hooks/useGetAAIBalance";

export function BalaceStake() {
  const { apr_info } = useContext(StakeInfoContext);

  const { data: balanceData } = useGetAAIBalance();

  const aai_balance = useMemo(() => {
    if (!balanceData) {
      return "--";
    }

    const value = formatEther(balanceData);

    return formatDisplay(Number(value), { decimalToShow: 2 });
  }, [balanceData]);

  const price = useMemo(() => {
    if (!apr_info?.aaiPrice) {
      return "--";
    }

    const value = new BigNumber(apr_info.aaiPrice)
      .multipliedBy(balanceData?.toString() || "0")
      .dividedBy(Math.pow(10, 18))
      .toNumber();

    return formatDisplay(value, { decimalToShow: 2 });
  }, [apr_info?.aaiPrice, balanceData]);

  return (
    <div className="w-full px-6 py-4 rounded-xl flex justify-between bg-[#F2F4F4] mb-[16px]">
      <div className="justify-start items-center gap-1 flex">
        <Image
          src="/staking/aai.png"
          width={48}
          height={48}
          alt="aai"
          className="w-[20px] aspect-square"
        />

        <p className="text-black text-[16px] leading-[24px]">
          {aai_balance} AAI
        </p>
      </div>

      <p className="text-[#686A6C] flex-shrink-0">${price}</p>
    </div>
  );
}
