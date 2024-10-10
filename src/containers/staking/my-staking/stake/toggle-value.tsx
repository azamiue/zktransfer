import { sendGAEvent } from "@next/third-parties/google";
import classNames from "classnames";
import { formatEther } from "ethers/lib/utils";
import { useCallback } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { data_value } from "../data";
import { useGetAAIBalance } from "../hooks/useGetAAIBalance";
import { StakeValueForm } from "./stake";

export function ToggleValue() {
  const { setValue, control } = useFormContext<StakeValueForm>();
  const { data } = useGetAAIBalance();
  const activeId = useWatch({ control, name: "toggleActiveId" });

  const handleActive = useCallback(
    (item: (typeof data_value)[0]) => {
      sendGAEvent({
        event: "ToggleValue",
        value: item,
      });

      if (!data) {
        return;
      }

      setValue("toggleActiveId", item.id);

      let value = "0";
      if (item.id === 3) {
        value = formatEther(data.mul(item.mul).div(item.div));
      } else {
        value = Number(formatEther(data.mul(item.mul).div(item.div))).toFixed(
          2
        );
      }

      setValue("value", value);
    },
    [data, setValue]
  );

  return (
    <div className="grid grid-cols-4 gap-[8px]">
      {data_value.map((item, idx) => {
        return (
          <button
            onClick={() => handleActive(item)}
            key={idx}
            className={classNames(
              "text-[14px] leading-[20px] text-black px-[12px] lg:px-[16px] py-[8px] bg-[#F2F4F4] rounded-full",
              { "bg-black text-white": activeId === idx }
            )}
          >
            {item.title}
          </button>
        );
      })}
    </div>
  );
}
