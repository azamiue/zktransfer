import { NotFound } from "@/components/not-found/not-found";
import { useGetUserStakeUserLpInfo } from "@/containers/staking-lp/hooks/useStakingLpInfo";
import { formatDisplay } from "@/util/formatDisplay";
import classNames from "classnames";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { toast } from "react-toastify";
import { useGetUserStakeInfo } from "../my-staking/hooks/useGetUserStakeInfo";
import { staking_data } from "./data";

export function Navbar() {
  const pathname = usePathname();

  const { data: stakingAprInfo } = useGetUserStakeUserLpInfo();
  const { data: dataInfoStake } = useGetUserStakeInfo();

  const dataNavbar = useMemo(() => {
    return staking_data.map((item) => {
      const des = item.des
        ? item.path === "/staking"
          ? dataInfoStake?.totalApy
          : stakingAprInfo?.totalApy
        : 0;
      return {
        ...item,
        des,
      };
    });
  }, [dataInfoStake?.totalApy, stakingAprInfo?.totalApy]);

  return (
    <div className="hidden lg:flex flex-col gap-[8px] bg-white py-[24px]">
      <Link
        href={"/"}
        className="flex items-center gap-[4px] h-[16px] px-[24px] mb-[48px]"
      >
        <Image src="/logo/logo.svg" alt="LOGO" width={28} height={16} />
        <span className="font-medium leading-[16px]">AutoAir AI</span>
      </Link>

      <div className="ml-[16px]">
        {dataNavbar.map((item, idx) => {
          return (
            <Link
              onClick={(e) => {
                const array_path = ["/staking-lp", "/staking"];

                if (!array_path.includes(item.path)) {
                  e.preventDefault();

                  return toast.success(<NotFound />, {
                    position: "top-center",
                    className:
                      "text-center !mb-[0px] !rounded-full !px-[24px] !py-[12px]",
                    autoClose: 1500,
                  });
                }
              }}
              key={idx}
              href={item.path}
              className="relative flex items-center gap-[12px] p-[12px]"
            >
              {pathname === item.path && (
                <motion.div
                  layoutId="underline"
                  className="-left-[16px] absolute w-[4px] h-full bg-black"
                />
              )}

              <Image
                src={pathname === item.path ? item.src1 : item.src}
                alt={item.title}
                width={24}
                height={24}
              />

              <div
                className={classNames(
                  "text-[16px] leading-[24px] text-[#A7AEAD] transition-all flex flex-wrap justify-start items-center gap-x-2",
                  { "text-black": pathname === item.path }
                )}
              >
                {item.title}
                {item?.des !== 0 && (
                  <p className=" px-1 text-xs border border-solid border-black rounded-full">
                    APR{" "}
                    {formatDisplay(Number(item?.des ?? "0"), {
                      decimalToShow: 2,
                    })}{" "}
                    %
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
