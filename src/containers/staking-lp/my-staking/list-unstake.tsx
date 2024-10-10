import { ToastMessage } from "@/components/ToastMessage/ToastMessage";
import { Staking__factory } from "@/contract";
import { useSmartAccount } from "@/hooks/useSmartAccount";
import { formatDisplay } from "@/util/formatDisplay";
import { sendTransactionAa } from "@/util/sendTransactionAA";
import { walletSigner } from "@/util/walletClientToSigner";
import { Button } from "@nextui-org/react";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers5/react";
import { formatEther } from "ethers/lib/utils";
import { useCallback, useContext, useState } from "react";
import { ContextProviderJsonRpcProvider } from "../ContextProvider";
import { useGetListRequestLp } from "../hooks/useGetListRequest";
import { onRedeem } from "./action";
import { contract_name_lp } from "./data";

type Props = {
  onRedeemSuccess: () => void;
};

export function ListUnstake({ onRedeemSuccess }: Props) {
  const provider = useContext(ContextProviderJsonRpcProvider);

  const { data, mutate } = useGetListRequestLp();

  const [isLoading, setLoading] = useState(false);

  const { walletProvider } = useWeb3ModalProvider();

  const { address } = useWeb3ModalAccount();

  const { isSmartWallet } = useSmartAccount();

  const handleRedeem = useCallback(
    async (epoch: number | undefined) => {
      if (!address || !walletProvider || !epoch) {
        return;
      }

      setLoading(true);
      try {
        const signer = await walletSigner(walletProvider, address);

        let receipt = null;

        if (isSmartWallet) {
          const hash = await sendTransactionAa({
            signer: signer,
            abi: Staking__factory.abi,
            contractAddress: contract_name_lp,
            method: "unstake",
            selectedAddress: address,
            params: [epoch.toString()],
          });

          receipt = await provider?.waitForTransaction(hash);
        } else {
          receipt = await onRedeem({
            selectedAddress: address,
            signer,
            epoch: epoch,
          });
        }

        if (!receipt?.status) {
          throw new Error("status error");
        }
        mutate();
        onRedeemSuccess();
        ToastMessage.success({
          title: "Redeem Successful",
          description: "",
        });
      } catch {
        ToastMessage.error({
          title: "Redeem Error",
          description: "",
        });
      } finally {
        setLoading(false);
      }
    },
    [address, isSmartWallet, mutate, onRedeemSuccess, provider, walletProvider]
  );

  return (
    <div className="flex flex-col">
      {data?.map((item, index) => {
        const amount = formatEther(item?.amount ?? 0);
        return (
          <div
            key={index}
            className="flex items-center justify-between pl-[32px] pr-[16px] py-[20px] bg-[#262626] rounded-[12px] mt-[8px]"
          >
            <p className="text-[16px] leading-[24px] text-[#A7AEAD]">
              Epoch {item?.epoch}
            </p>

            <p className="text-[16px] leading-[24px] text-[#A7AEAD]">
              {formatDisplay(Number(amount) ?? 0, { decimalToShow: 2 })} AAI/ETH
              LP
            </p>

            <Button
              isLoading={isLoading}
              isDisabled={!item?.isRedeem || isLoading}
              onPress={() => handleRedeem(item?.epoch)}
              className="text-[14px] leading-[20px] text-black px-[20px] py-[10px] bg-white rounded-full"
            >
              Redeem
            </Button>
          </div>
        );
      })}
    </div>
  );
}
