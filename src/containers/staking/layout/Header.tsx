"use client";

import { ModalHeaderDropDown } from "@/components/ModalDropDown/ModalHeaderDropDown";
import { formatAddress, formatDisplay } from "@/util/formatDisplay";
import { Button, Skeleton } from "@nextui-org/react";
import {
  useDisconnect,
  useWeb3Modal,
  useWeb3ModalAccount,
} from "@web3modal/ethers5/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo } from "react";

import { sendGAEvent } from "@next/third-parties/google";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { formatEther } from "ethers/lib/utils";
import { useGetAAIBalance } from "../my-staking/hooks/useGetAAIBalance";
import { useGetUserStakeInfo } from "../my-staking/hooks/useGetUserStakeInfo";

function HeaderMobile() {
  const { address } = useWeb3ModalAccount();
  const { open } = useWeb3Modal();

  const handleConnect = useCallback(() => {
    open();
  }, [open]);

  return (
    <header className="flex lg:hidden justify-between items-center h-[52px] px-[16px] mx-[16px] rounded-tr-[20px] rounded-bl-[20px] bg-white mb-[24px]">
      <Link href={"/"} className="flex items-center gap-[4px] h-[16px]">
        <Image src="/logo/logo.svg" alt="LOGO" width={28} height={16} />
        <span className="font-medium leading-[16px]">AutoAir AI</span>
      </Link>

      <div className="flex-1 flex justify-end lg:mr-10">
        {address ? (
          <DropdownMenuConnect />
        ) : (
          <Button
            onClick={handleConnect}
            className="border border-solid border-gray md:h-[44px] h-[36px] pb-[1px] flex items-center gap-x-1 px-3 lg:px-2 xl:px-4 2xl:px-6 whitespace-nowrap rounded-full bg-[#ffffff] text-[12px] md:text-[14px] leading-[16px] text-black"
          >
            <p> {address ? formatAddress(address) : "Connect Wallet"} </p>
            {address && (
              <Image src="/icon/icon-down.svg" width={20} height={20} alt="" />
            )}
          </Button>
        )}
      </div>

      <ModalHeaderDropDown />
    </header>
  );
}

export default function Header() {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();

  const handleConnect = useCallback(() => {
    open();
  }, [open]);

  return (
    <>
      <div className="hidden lg:flex justify-end mt-4 lg:mr-10">
        {address ? (
          <DropdownMenuConnect />
        ) : (
          <Button
            isLoading={isConnected}
            onClick={() => {
              sendGAEvent({
                event: "ButtonConnect",
                value: "Connected",
              });
              handleConnect();
            }}
            className="border border-solid border-gray h-[36px] xl:h-[40px] flex items-center gap-x-1 px-4 whitespace-nowrap rounded-full bg-[#ffffff] text-[12px] md:text-[14px] leading-[16px] text-black"
          >
            <p> {address ? formatAddress(address) : "Connect Wallet"} </p>
            {address && (
              <Image
                src="/icon/icon-down.svg"
                width={20}
                height={20}
                alt="ICON"
              />
            )}
          </Button>
        )}
      </div>

      <HeaderMobile />
    </>
  );
}

export function DropdownMenuConnect() {
  const { address } = useWeb3ModalAccount();

  const { data, isLoading: isLoadingGetBalance } = useGetUserStakeInfo();

  const { disconnect } = useDisconnect();

  const { data: balanceData, isLoading: isLoadingAAi } = useGetAAIBalance();

  const aai_balance = useMemo(() => {
    if (!address) {
      return "--";
    }

    const value = formatEther(balanceData ?? "0");

    return formatDisplay(Number(value), { decimalToShow: 2 });
  }, [address, balanceData]);

  const aaiBalanceToken = useMemo(() => {
    if (!balanceData) {
      return "--";
    }

    const value = formatEther(balanceData);

    return formatDisplay(Number(value) * Number(data?.aaiPrice ?? 0), {
      decimalToShow: 2,
    });
  }, [balanceData, data?.aaiPrice]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(address ?? "");
  }, [address]);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="border border-solid border-gray h-[36px] xl:h-[40px] flex items-center gap-x-1 px-4 whitespace-nowrap rounded-full bg-[#ffffff] text-[12px] md:text-[14px] leading-[16px] text-black">
          <p> {formatAddress(address ?? "")} </p>
          {address && (
            <Image src="/icon/icon-down.svg" width={20} height={20} alt="" />
          )}
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label="Dynamic Actions"
        closeOnSelect={false}
        itemClasses={{
          wrapper: "bg-[#ffffff]",
          base: "hover:!bg-white",
        }}
      >
        <DropdownItem classNames={{ wrapper: "bg-white" }} textValue="12">
          <div className="w-[344px] h-[228px] p-6 bg-white  shadow flex-col justify-center items-start gap-2 inline-flex">
            <div className="self-stretch flex-col justify-start items-start gap-5 inline-flex">
              <div className="justify-start items-center gap-3 inline-flex">
                <Image
                  src="/icon/icon-aai-large.svg"
                  width={44}
                  height={44}
                  alt=""
                />
                <div className="flex-col justify-center items-start inline-flex">
                  <div className="justify-start items-center gap-1.5 inline-flex">
                    <div className="text-black text-xl font-medium font-['PP Neue Montreal'] leading-7">
                      {formatAddress(address ?? "")}
                    </div>
                    <div
                      className="px-3 py-2 bg-zinc-100 rounded-[90px] justify-center items-center gap-2 flex"
                      onClick={handleCopy}
                    >
                      <p className="text-neutral-800 text-xs font-medium font-['PP Neue Montreal'] leading-3">
                        Copy
                      </p>
                    </div>
                  </div>
                  <p className="text-zinc-400 text-sm font-medium font-['PP Neue Montreal'] leading-tight">
                    zkSync Era
                  </p>
                </div>
              </div>
              <div className="h-14 p-4 rounded-xl border border-neutral-200 flex-col justify-start items-start gap-6 flex w-full">
                <div className="self-stretch justify-between items-center inline-flex">
                  <div className="justify-start items-center gap-1 flex">
                    <Image
                      src={"/staking/aai.png"}
                      width={48}
                      height={48}
                      alt="aai"
                      className="w-[24px] aspect-square"
                    />
                    <div>
                      <span className="text-black text-base font-medium font-['PP Neue Montreal'] leading-normal">
                        {aai_balance}{" "}
                      </span>
                      <span className="text-zinc-400 text-base font-medium font-['PP Neue Montreal'] leading-normal">
                        AAI
                      </span>
                    </div>
                  </div>
                  <div className="text-black flex text-[15px] font-medium font-['PP Neue Montreal'] leading-normal">
                    {isLoadingGetBalance ? (
                      <Skeleton className="flex w-[100px] rounded-xl h-6 my-auto" />
                    ) : (
                      <span className="text-black text-base font-medium font-['PP Neue Montreal'] leading-normal">
                        ${aaiBalanceToken}{" "}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Button
              onPress={() => disconnect()}
              className="self-stretch px-5 py-3.5 bg-zinc-100 rounded-[90px] justify-center items-center gap-1 inline-flex"
            >
              <div className="text-neutral-500 text-sm font-medium font-['PP Neue Montreal'] leading-tight">
                Disconnect
              </div>
            </Button>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
