import { formatDisplay, formatDisplayFloor } from "@/util/formatDisplay";
import Image from "next/image";
import { memo, useMemo } from "react";

type Props = {
  balanceStake: number | undefined;
  aaiPrice: number | null;
};

function BalanceStake({ balanceStake, aaiPrice }: Props) {
  const aaiBalanceToken = useMemo(() => {
    if (!balanceStake) {
      return 0;
    }

    return formatDisplay(Number(balanceStake) * Number(aaiPrice ?? 0), {
      decimalToShow: 2,
    });
  }, [balanceStake, aaiPrice]);

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
          {formatDisplayFloor(balanceStake ?? 0, { decimalToShow: 2 })} AAI/ETH
          LP
        </p>
      </div>
      {/* TODO :  Chua get Data */}
      <p className="text-[#686A6C] flex-shrink-0">${aaiBalanceToken}</p>
    </div>
  );
}

export const BalanceStakeView = memo(BalanceStake);
