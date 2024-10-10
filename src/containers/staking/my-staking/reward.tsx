import { StakeInfoContext } from "@/app/(staking)/staking/type";
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
import { claimReward } from "./action";
import { Apr } from "./coundown";
import { contract_name, image_list_data } from "./data";
import { useGetCalculateReward } from "./hooks/useGetCalculateReward";

export function Reward() {
  const [isLoading, setIsLoading] = useState(false);

  const { data: list, mutate } = useGetCalculateReward();
  const { address } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { apr_info: stakingAprInfo } = useContext(StakeInfoContext);
  const { isSmartWallet } = useSmartAccount();
  const { provider } = useContext(StakeInfoContext);

  const claim = useCallback(async () => {
    if (!walletProvider || !address || !provider) {
      return;
    }

    sendGAEvent({
      event: "ClaimUnstaking",
      value: "ClaimUnstaking",
    });

    setIsLoading(true);

    try {
      const signer = await walletSigner(walletProvider, address);

      let receipt;
      if (isSmartWallet) {
        const txhash = await sendTransactionAa({
          signer: signer,
          abi: Staking__factory.abi,
          contractAddress: contract_name,
          method: "claimReward",
          selectedAddress: address,
          params: [],
        });

        receipt = await provider.waitForTransaction(txhash);
      } else {
        receipt = await claimReward({
          selectedAddress: address,
          signer,
        });
      }

      if (receipt.status) {
        ToastMessage.success({
          title: "Claim Reward Successful",
          description: "",
        });

        await mutate();
      }
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

  const rewards = useMemo(() => {
    if (!list || list[0].length === 0) {
      return [
        {
          address: "--",
          balance: "--",
          title: "ETH",
          url: "/staking/eth.png",
        },
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
      ];
    }
    const res = list[0].map((item, idx) => {
      const value = image_list_data.find(
        (iem) => iem.address.toLowerCase() === item?.toLowerCase()
      );

      return {
        address: item.toString(),
        balance: formatDisplay(Number(formatEther(list[1][idx])), {
          decimalToShow: value?.decimals || 2,
        }),
        url: value?.src || "",
        title: value?.title || "",
      };
    });

    return res;
  }, [list]);

  const disable = useMemo(() => {
    if (isLoading || !list) {
      return true;
    }

    return !list[1].some((item) => item.gt(0));
  }, [isLoading, list]);

  return (
    <div>
      <div className="flex items-center gap-[8px] mb-[16px]">
        <h2 className="text-[24px] leading-[32px] text-black">Rewards</h2>

        <div className="flex items-center gap-[4px] border border-[#000000] px-[8px] py-[4px] rounded-full">
          <p
            data-tooltip-id="tooltip-staking-3"
            className="text-[16px] leading-[24px]"
          >
            <span className=" text-[#686A6C] mr-1">Staking</span>
            <span className="text-[#202025]">
              APR {stakingAprInfo ? Number(stakingAprInfo.totalApy) : "--"}%
            </span>
          </p>

          <Tooltip id="tooltip-staking-3" noArrow place="bottom">
            <Apr />
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
                "px-[24px] lg:px-[40px] py-[24px] lg:py-[32px] flex flex-col justify-between  border-b border-[#E1E2E2] h-[204px]",
                {
                  "lg:border-r": idx === 1,
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

        <div className="lg:col-span-2 px-[40px] py-[32px] flex items-center justify-center h-[204px]">
          <Button
            isLoading={isLoading}
            isDisabled={disable}
            onClick={claim}
            className={classNames(
              "px-[40px] py-[16px] rounded-full h-[72px] bg-black text-white w-fit flex items-center justify-center",
              { "opacity-30": disable }
            )}
          >
            {!isLoading && (
              <div className="flex items-center gap-[8px]">
                <p className="bg-black text-[16px] leading-[24px]">
                  Claim Rewards
                </p>

                <Image
                  src={"/staking/three-image.png"}
                  width={160}
                  height={96}
                  alt="three-image"
                  className="w-[40px] aspect-[160/96]"
                />
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
