import { Reward } from "./reward";
import { YourStake } from "./your-stake";

export function MyStaking() {
  return (
    <div>
      <div className="mb-10">
        {/* <CountDown /> */}
      </div>
      <h2 className="text-[24px] leading-[32px] text-black mb-[16px]">
        Balance123
      </h2>

      <YourStake />

      <Reward />
    </div>
  );
}
