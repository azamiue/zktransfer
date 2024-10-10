import { ToastMessage } from "@/components/ToastMessage/ToastMessage";
import { Staking__factory } from "@/contract";
import { useSmartAccount } from "@/hooks/useSmartAccount";
import { formatDisplay } from "@/util/formatDisplay";
import { sendTransactionAa } from "@/util/sendTransactionAA";
import { walletSigner } from "@/util/walletClientToSigner";
import { sendGAEvent } from "@next/third-parties/google";
import { Button } from "@nextui-org/react";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers5/react";
import classNames from "classnames";
import { formatEther } from "ethers/lib/utils";
import Image from "next/image";
import { useCallback, useContext, useMemo, useState } from "react";
import { Tooltip } from "react-tooltip";
import AprContent from "../AprContent";
import { ContextProviderJsonRpcProvider } from "../ContextProvider";
import { useGetCalculateReward } from "../hooks/useGetCalculateReward";
import { useGetUserStakeUserLpInfo } from "../hooks/useStakingLpInfo";
import { claimReward } from "./action";
import { contract_name_lp } from "./data";

const LIST_REWARD = [
  {
    title: "AAI",
    url: "/staking/aai.png",
    balance: "--",
    address: "0x144b83555d8a3119b0a69a7bc2f0a0388308fee3",
  },
  {
    title: "HOLD",
    url: "/staking/hold.svg",
    balance: "--",
    address: "0xed4040fd47629e7c8fbb7da76bb50b3e7695f0f2",
  },
  {
    title: "ETH",
    url: "/staking/eth.png",
    balance: "--",
    address: "0x0000000000000000000000000000000000000000",
  },
];

export function Reward() {
  const [isLoading, setIsLoading] = useState(false);

  const provider = useContext(ContextProviderJsonRpcProvider);

  const { data: stakingAprInfo } = useGetUserStakeUserLpInfo();

  const { data: list, mutate } = useGetCalculateReward();

  const { address } = useWeb3ModalAccount();

  const { walletProvider } = useWeb3ModalProvider();

  const { isSmartWallet } = useSmartAccount();

  const rewards = useMemo(() => {
    if (!list || list[0].length === 0) {
      return [
        {
          address: "--",
          balance: "--",
          title: "AAI",
          url: "/staking/aai.png",
        },
        {
          address: "--",
          balance: "--",
          title: "HOLD",
          url: "/staking/hold.svg",
        },
        {
          address: "--",
          balance: "--",
          title: "ETH",
          url: "/staking/eth.png",
        },
      ];
    }

    const res = list[0].map((item, idx) => {
      const value = LIST_REWARD.find(
        (iem) => iem.address === item.toString().toLowerCase()
      );

      return {
        address: item.toString(),
        balance: formatDisplay(Number(formatEther(list[1][idx])), {
          decimalToShow:
            item === "0x0000000000000000000000000000000000000000" ? 5 : 2,
        }),
        url: value?.url || "",
        title: value?.title || "",
      };
    });

    return res;
  }, [list]);

  const isDisabledButton = useMemo(() => {
    return (
      !list ||
      !list[1].some((item) => Number(item)) ||
      isLoading ||
      !list[1].length
    );
  }, [isLoading, list]);

  const claim = useCallback(async () => {
    if (!walletProvider || !address) {
      return;
    }

    sendGAEvent({
      event: "ClaimUnstakingLp",
      value: "ClaimUnstakingLp",
    });

    setIsLoading(true);

    try {
      const signer = await walletSigner(walletProvider, address);

      let receipt = null;

      if (isSmartWallet) {
        const hash = await sendTransactionAa({
          signer: signer,
          abi: Staking__factory.abi,
          contractAddress: contract_name_lp,
          method: "claimReward",
          selectedAddress: address,
          params: [],
        });

        receipt = await provider?.waitForTransaction(hash);
      } else {
        receipt = await claimReward({
          selectedAddress: address,
          signer,
        });
      }

      if (!receipt?.status) {
        throw new Error("claim Error");
      }

      await mutate();

      ToastMessage.success({
        title: "Claim Reward Successful",
        description: "",
      });
    } catch (error) {
      console.error("Error", error);

      ToastMessage.error({
        title: "Claim Reward Failed",
        description: "",
      });
    } finally {
      setIsLoading(false);
    }
  }, [address, isSmartWallet, mutate, provider, walletProvider]);

  return (
    <div>
      <div className="flex items-center gap-[8px] mb-[16px]">
        <h2 className="text-[24px] leading-[32px] text-black">Rewards</h2>

        <div className="flex items-center gap-[4px] border border-[#000000] px-[8px] py-[4px] rounded-full">
          <div data-tooltip-id="tooltip-staking-1">
            <span className="text-[16px] leading-[24px] text-[#686A6C]">
              Staking
            </span>
            <span className="text-[16px] leading-[24px] text-[#202025]">
              {" "}
              APR{" "}
              {formatDisplay(Number(stakingAprInfo?.totalApy), {
                decimalToShow: 2,
              }) ?? 0}
              %
            </span>
          </div>

          <Tooltip id="tooltip-staking-1" noArrow place="bottom">
            <AprContent stakingAprInfo={stakingAprInfo} />
          </Tooltip>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch bg-white rounded-[16px]">
        {rewards.map((item, idx) => {
          if (item.title === "ETH") {
            return null;
          }

          return (
            <div
              key={idx}
              className={classNames(
                "px-[40px] py-6 md:py-8 flex flex-col justify-between  border-b border-[#E1E2E2] h-[150px] md:h-[204px]",
                {
                  "lg:border-r": idx === 0,
                }
              )}
            >
              <div className="flex items-center gap-[8px]">
                <Image
                  src={item.url}
                  width={48}
                  height={48}
                  alt="aai"
                  className="w-[24px] aspect-square"
                />

                <p className="text-[24px] leading-[32px] text-[#202025]">
                  {item.title}
                </p>
              </div>

              <p className="text-[40px] leading-[48px] text-[#202025]">
                {item.balance}
              </p>
            </div>
          );
        })}

        <div className="lg:col-span-2 px-[40px] py-[32px] flex items-center justify-center h-[150px] md:h-[204px] w-full">
          <Button
            isDisabled={isDisabledButton}
            isLoading={isLoading}
            onClick={claim}
            className={classNames(
              "px-[40px] py-[16px] rounded-full w-full bg-black text-[16px] leading-[24px] h-[72px] text-white md:w-[300px] flex items-center justify-center"
            )}
          >
            Claim Rewards
            <Image
              src={"/staking/three-image.png"}
              width={160}
              height={96}
              alt="three-image"
              className="w-[40px] aspect-[160/96]"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
