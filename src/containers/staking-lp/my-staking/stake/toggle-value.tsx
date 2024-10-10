import { sendGAEvent } from "@next/third-parties/google";
import classNames from "classnames";
import { useCallback, useState } from "react";
import { data_value } from "../data";

type Props = {
  onChangeValue: (rate: number) => void;
};

export function ToggleValue({ onChangeValue }: Props) {
  const [selectRate, setSelectRate] = useState(0);

  const handleSelect = useCallback(
    (value: number) => {
      sendGAEvent({
        event: "ToggleValue",
        value: value,
      });

      setSelectRate(value);
      onChangeValue(value);
    },
    [onChangeValue]
  );

  return (
    <div className="grid grid-cols-4 gap-[8px]">
      {data_value.map((item, idx) => {
        return (
          <button
            key={idx}
            onClick={() => handleSelect(item.value)}
            className={classNames(
              "text-[14px] leading-[20px] text-black px-[16px] py-[8px] bg-[#F2F4F4] rounded-full",
              { "bg-black text-white": selectRate === item.value }
            )}
          >
            {item.title}
          </button>
        );
      })}
    </div>
  );
}
