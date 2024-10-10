import classNames from "classnames";
import React from "react";

interface HeaderLinePageProps {
  className?: string;
  page: string;
  content: string;
}

export function HeaderLinePage(props: HeaderLinePageProps) {
  const { className, page, content } = props;
  return (
    <div className={classNames("flex flex-col gap-[8px]", className)}>
      <div className="w-full h-[1px] bg-[#D5D5D5]" />
      <div className="flex items-center justify-between">
        <p className="text-[15px] leading-[24px] font-medium text-[#686A6C]">
          {page}
        </p>
        <p className="text-[15px] leading-[24px] font-medium text-[#686A6C]">
          {content}
        </p>
      </div>
    </div>
  );
}

export function HeaderLineProgress(
  props: HeaderLinePageProps & { children: React.ReactNode }
) {
  const { className, page, content, children } = props;
  return (
    <div className={classNames("flex flex-col gap-[8px]", className)}>
      {children}
      <div className="flex items-center justify-between">
        <p className="text-[15px] leading-[24px] font-medium text-[#686A6C]">
          {page}
        </p>
        <p className="text-[15px] leading-[24px] font-medium text-[#686A6C]">
          {content}
        </p>
      </div>
    </div>
  );
}
