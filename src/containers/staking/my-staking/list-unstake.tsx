import { StakeInfoContext } from "@/app/(staking)/staking/type";
import { ToastMessage } from "@/components/ToastMessage/ToastMessage";
import { Staking__factory } from "@/contract";
import { useSmartAccount } from "@/hooks/useSmartAccount";
import { formatDisplay } from "@/util/formatDisplay";
import { sendTransactionAa } from "@/util/sendTransactionAA";
import { walletSigner } from "@/util/walletClientToSigner";
import { Button, Skeleton } from "@nextui-org/react";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers5/react";
import classNames from "classnames";
import { formatEther } from "ethers/lib/utils";
import { useCallback, useContext, useMemo, useState } from "react";
import { redeem } from "./action";
import { contract_name } from "./data";
import { useGetAAIBalance } from "./hooks/useGetAAIBalance";
import { useGetCurrentEpoch } from "./hooks/useGetCurrentEpoch";
import { useGetListRequest } from "./hooks/useGetListRequest";
import { useGetUserStaked } from "./hooks/useGetUserStaked";

export function ListUnstake() {
  const [state, setState] = useState({
    isLoading: true,
    index: "-1",
  });

  const { data, isLoading: isLoadingRequest, mutate } = useGetListRequest();
  const { mutate: mutateBalance } = useGetAAIBalance();
  const { mutate: mutateStaked } = useGetUserStaked();
  const { currentEpoch } = useGetCurrentEpoch();
  const { address } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const list = useMemo(() => {
    if (!data) {
      return [];
    }

    const list = data[0].map((item, idx) => {
      return {
        [item.toString()]: formatEther(data[1][idx]),
      };
    });

    return list;
  }, [data]);

  const filterList = list.filter((item) => Number(Object.values(item)) > 0);
  const { isSmartWallet } = useSmartAccount();
  const { provider } = useContext(StakeInfoContext);

  const handleRedeem = useCallback(
    async (epoch: string) => {
      if (!walletProvider || !address || !provider) {
        return;
      }

      setState((v) => ({ ...v, isLoading: true, index: epoch }));

      try {
        const signer = await walletSigner(walletProvider, address);

        let receipt;
        if (isSmartWallet) {
          const txhash = await sendTransactionAa({
            signer: signer,
            abi: Staking__factory.abi,
            contractAddress: contract_name,
            method: "unstake",
            selectedAddress: address,
            params: [epoch],
          });

          receipt = await provider.waitForTransaction(txhash);
        } else {
          receipt = await redeem({
            selectedAddress: address,
            signer,
            epoch: epoch,
          });

          if (receipt.status) {
            ToastMessage.success({
              title: "Unstake Successful",
              description: "",
            });
          }

          await Promise.all([mutateBalance(), mutate(), mutateStaked()]);
        }
      } catch (error) {
        console.error("Error", error);

        ToastMessage.error({
          title: "Unstake Failed",
          description: "",
        });
      } finally {
        setState((v) => ({ ...v, isLoading: false, index: "-1" }));
      }
    },
    [
      address,
      isSmartWallet,
      mutate,
      mutateBalance,
      mutateStaked,
      provider,
      walletProvider,
    ]
  );

  if (isLoadingRequest) {
    return <Skeleton className="w-full h-[80px] rounded-[12px] mt-[8px]" />;
  }

  return (
    <div className="flex flex-col">
      {filterList.map((item, idx) => {
        return (
          <div
            key={idx}
            className="grid grid-cols-[80px_1fr_92px] items-center pl-[32px] pr-[16px] py-[20px] bg-[#262626] rounded-[12px] mt-[8px]"
          >
            <p className="text-[16px] leading-[24px] text-[#A7AEAD]">
              Epoch {Object.keys(item)}
            </p>

            <p className="text-center text-[16px] leading-[24px] text-[#A7AEAD]">
              {formatDisplay(Number(Object.values(item)), { decimalToShow: 2 })}{" "}
              AAI
            </p>

            <Button
              isLoading={
                String(Object.keys(item)) === state.index && state.isLoading
              }
              onClick={() => handleRedeem(String(Object.keys(item)))}
              isDisabled={
                currentEpoch && Number(Object.keys(item)) > Number(currentEpoch)
              }
              className={classNames(
                "text-[14px] leading-[20px] text-black px-[20px] h-[40px] bg-white rounded-full flex items-center justify-center",
                {
                  "opacity-30":
                    currentEpoch &&
                    Number(Object.keys(item)) > Number(currentEpoch),
                }
              )}
            >
              Redeem
            </Button>
          </div>
        );
      })}
    </div>
  );
}
