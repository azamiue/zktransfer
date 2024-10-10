"use client";

import LoadingPrimary from "@/components/Loading/LoadingPrimary";
import { ReactNode } from "react";
import NumberChange from "./NumberChange";

type Props = {
  title: string;
  number: number;
  isLoading: boolean;
  children?: ReactNode;
};

export default function Box({ title, number, isLoading, children }: Props) {
  return (
    <div className="py-8 md:py-[60px] ">
      <h2 className="text-2xl font-medium mb-6">{title}</h2>

      <div className="flex items-center gap-x-4 md:gap-x-5 ">
        {isLoading ? (
          <LoadingPrimary />
        ) : (
          <>
            <NumberChange
              number={number ?? 0}
              className="text-[64px] md:text-[80px] text-black xl:min-w-[172px]"
            />
            {children && children}
          </>
        )}
      </div>
    </div>
  );
}
