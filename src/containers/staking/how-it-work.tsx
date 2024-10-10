import classNames from "classnames";
import { notation_data } from "./data";

export function HowItWork() {
  return (
    <div>
      {notation_data.map((item, idx) => {
        return (
          <div
            key={idx}
            className={classNames(
              " pb-[40px] lg:pb-[72px] flex lg:gap-[102px]",
              {
                "border-b border-[#E1E2E2]": idx !== 2,
                "pt-[40px] lg:pt-[56px]": idx !== 0,
              }
            )}
          >
            <p className="hidden lg:block text-[56px] leading-[64px] text-black min-w-[40px]">
              {item.id}
            </p>

            <div className="flex flex-col gap-[8px]">
              <p className="text-[24px] leading-[32px] text-black">
                <span className="lg:hidden">{`${idx + 1}. `}</span>
                {item.title}
              </p>
              <p className="text-[16px] leading-[24px] text-[#686A6C]">
                {item.desc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
