"use client";

import { sendGAEvent } from "@next/third-parties/google";
import classNames from "classnames";
import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useCallback, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { data_value } from "../data";
import { useGetListRequest } from "../hooks/useGetListRequest";
import { useGetUserStaked } from "../hooks/useGetUserStaked";
import { UnStakeValueForm } from "./unstake";

export function ToggleValue() {
  const { setValue, control } = useFormContext<UnStakeValueForm>();
  const { data } = useGetUserStaked();
  const { data: listRequest } = useGetListRequest();
  const activeId = useWatch({ control, name: "toggleActiveId" });

  const aai_permission_withdraw = useMemo(() => {
    if (!listRequest || !data) {
      return ethers.BigNumber.from(0);
    }

    const total = listRequest[1].reduce((prev, cur) => {
      return prev.add(cur);
    }, ethers.BigNumber.from(0));

    return data.sub(total);
  }, [data, listRequest]);

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
        value = formatEther(
          aai_permission_withdraw.mul(item.mul).div(item.div)
        );
      } else {
        value = Number(
          formatEther(aai_permission_withdraw.mul(item.mul).div(item.div))
        ).toFixed(2);
      }

      setValue("value", value);
    },
    [aai_permission_withdraw, data, setValue]
  );

  return (
    <div className="grid grid-cols-4 gap-[8px]">
      {data_value.map((item, idx) => {
        return (
          <button
            onClick={() => handleActive(item)}
            key={idx}
            className={classNames(
              "text-[14px] leading-[20px] text-black px-[16px] py-[8px] bg-[#F2F4F4] rounded-full",
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
