import { formatDisplay } from "@/util/formatDisplay";
import { StakeInfoProps } from "./hooks/useStakingLpInfo";

type Props = {
  stakingAprInfo: StakeInfoProps | undefined;
};

export default function AprContent({ stakingAprInfo }: Props) {
  return (
    <div className="p-4 bg-white rounded-2xl flex-col justify-start items-start gap-3 inline-flex">
      <div className="self-stretch justify-between items-start inline-flex gap-[48px]">
        <p className="text-black text-sm">AAI </p>
        <p className="text-black text-sm">
          {formatDisplay(Number(stakingAprInfo?.apyAai ?? 0), {
            decimalToShow: 2,
          }) ?? "--"}
          %
        </p>
      </div>

      <div className="self-stretch h-[0px] border border-[#F2F4F4]" />

      <div className="self-stretch justify-between items-start inline-flex gap-[48px]">
        <p className="text-black text-sm">HOLD</p>
        <p className="text-black text-sm">
          {formatDisplay(Number(stakingAprInfo?.apyHold ?? 0), {
            decimalToShow: 2,
          })}
          %
        </p>
      </div>
    </div>
  );
}
