import { Button } from "@nextui-org/react";
import { useWeb3Modal } from "@web3modal/ethers5/react";
import Image from "next/image";
import Link from "next/link";

export function NotLogin() {
  const { open } = useWeb3Modal();

  return (
    <div className="relative min-h-[100vh] grid grid-cols-1 lg:grid-cols-2 items-center">
      <div className="hidden lg:flex flex-col justify-between self-stretch bg-black px-[40px] py-[24px]">
        <Link href={"/"} className="flex items-center gap-[4px] h-[16px]">
          <Image src="/logo/logo-white.svg" alt="LOGO" width={28} height={16} />
          <span className="text-white font-medium leading-[16px]">
            AutoAir AI
          </span>
        </Link>

        <p className="text-[56px] leading-[64px] text-white">
          Welcome to AAI terminal
        </p>
      </div>

      <div className="absolute lg:hidden top-[24px] left-[24px] right-[24px]">
        <Link
          href={"/"}
          className="flex items-center gap-[4px] h-[16px] mb-[67px]"
        >
          <Image
            src="/staking/logo-black.svg"
            alt="LOGO"
            width={28}
            height={16}
          />
          <span className="text-black font-medium leading-[16px]">
            AutoAir AI
          </span>
        </Link>

        <p className="text-[32px] leading-[40px] text-black">
          Welcome to AAI terminal
        </p>
      </div>

      <div className="max-w-[400px] md:w-full mx-[16px] md:mx-auto p-[8px] py-[24px] bg-white rounded-[24px] flex flex-col items-center gap-[24px]">
        <h4 className="text-[24px] leading-[32px]text-black">
          Please sign-in to continue
        </h4>

        <Button
          onClick={() => open()}
          className="min-h-[64px] bg-[#F2F4F4] w-full flex items-center gap-[8px] p-[16px] rounded-[16px]"
        >
          <Image
            src="/staking/metamask.svg"
            alt="LOGO"
            width={32}
            height={32}
          />

          <p className="text-[20px] leading-[28px] text-[#686A6C]">Metamask</p>
        </Button>
      </div>
    </div>
  );
}
