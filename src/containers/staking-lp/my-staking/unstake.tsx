"use client";

import { ToastMessage } from "@/components/ToastMessage/ToastMessage";
import { Staking__factory } from "@/contract";
import { useSmartAccount } from "@/hooks/useSmartAccount";
import { formatDisplay, numberFloor } from "@/util/formatDisplay";
import { sendTransactionAa } from "@/util/sendTransactionAA";
import { walletSigner } from "@/util/walletClientToSigner";
import { sendGAEvent } from "@next/third-parties/google";
import { Button } from "@nextui-org/react";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers5/react";
import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useCallback, useContext, useMemo } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { ContextProviderJsonRpcProvider } from "../ContextProvider";
import { useGetListRequestLp } from "../hooks/useGetListRequest";
import { useGetUserStaked } from "../hooks/useGetUserStaked";
import { useGetUserStakeUserLpInfo } from "../hooks/useStakingLpInfo";
import { makeRequest } from "./action";
import { contract_name_lp } from "./data";
import { BalanceStakeView } from "./stake/balace-stake";
import { ToggleValue } from "./stake/toggle-value";

interface UnStakeValueForm {
  valueUnStake: string;
}

type Props = {
  onActionSuccess: () => void;
};

export function UnStake({ onActionSuccess }: Props) {
  const methods = useForm<UnStakeValueForm>({
    defaultValues: {
      valueUnStake: "",
    },
  });

  const provider = useContext(ContextProviderJsonRpcProvider);

  const { address } = useWeb3ModalAccount();

  const { walletProvider } = useWeb3ModalProvider();

  const { setValue, handleSubmit, watch } = methods;

  const {
    data: listRequestUnStake,
    isLoading: isLoadingGetData,
    mutate: mutateListRequestLp,
  } = useGetListRequestLp();

  const { data: balanceStaked, mutate } = useGetUserStaked();

  const { data: dataInfoStake } = useGetUserStakeUserLpInfo();

  const { isSmartWallet } = useSmartAccount();

  const valueUnStake = watch("valueUnStake");

  const userStaked = useMemo(() => {
    if (!balanceStaked || !listRequestUnStake) {
      return 0;
    }

    const totalTokenListRequest = listRequestUnStake.reduce(
      (total, value) => total.add(value?.amount ?? 0),
      ethers.BigNumber.from(0)
    );

    const value = formatEther(balanceStaked.sub(totalTokenListRequest));
    return numberFloor(Number(value));
  }, [balanceStaked, listRequestUnStake]);

  const balanceUsdInput = useMemo(() => {
    if (!valueUnStake || !dataInfoStake) return 0;

    return formatDisplay(
      Number(Number(valueUnStake)) * Number(dataInfoStake.aaiPrice ?? 0),
      {
        decimalToShow: 2,
      }
    );
  }, [dataInfoStake, valueUnStake]);

  const textButton = useMemo(() => {
    if (Number(userStaked) < Number(valueUnStake)) {
      return "Insufficient Balance";
    }

    return "Unstake";
  }, [userStaked, valueUnStake]);

  const isDisabledButton = useMemo(() => {
    return (
      !Number(valueUnStake) ||
      methods.formState.isSubmitting ||
      Number(valueUnStake) > Number(userStaked)
    );
  }, [methods.formState.isSubmitting, userStaked, valueUnStake]);

  const handleSelectValue = useCallback(
    (rate: number) => {
      setValue("valueUnStake", numberFloor(userStaked * rate).toString());
    },
    [setValue, userStaked]
  );

  const handleUnStake = useCallback(
    async (value: UnStakeValueForm) => {
      if (!address || !walletProvider) {
        return;
      }

      sendGAEvent({
        event: "handleUntakingLp",
        value: "handleUntakingLp",
      });

      try {
        const signer = await walletSigner(walletProvider, address);

        let receipt = null;
        if (isSmartWallet) {
          const amount = `0x${new BigNumber(value.valueUnStake)
            .multipliedBy(Math.pow(10, 18))
            .toString(16)}`;

          const hash = await sendTransactionAa({
            signer: signer,
            abi: Staking__factory.abi,
            contractAddress: contract_name_lp,
            method: "makeRequest",
            selectedAddress: address,
            params: [amount],
          });

          receipt = await provider?.waitForTransaction(hash);
        } else {
          receipt = await makeRequest({
            selectedAddress: address,
            signer,
            value: new BigNumber(value.valueUnStake),
          });
        }

        if (!receipt?.status) {
          throw new Error("status error");
        }

        mutate();

        mutateListRequestLp();

        onActionSuccess();

        ToastMessage.success({
          title: "UnStake Successful",
          description: "",
        });
      } catch (error) {
        ToastMessage.error({
          title: "UnStake Error",
          description: "",
        });

        console.error("Error", error);
      } finally {
      }
    },
    [
      address,
      isSmartWallet,
      mutate,
      mutateListRequestLp,
      onActionSuccess,
      provider,
      walletProvider,
    ]
  );

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col items-start gap-1">
        <p className="text-[14px] leading-[20px] text-[#A7AEAD]">
          Staked amount
        </p>

        <BalanceStakeView
          balanceStake={userStaked}
          aaiPrice={Number(dataInfoStake?.aaiPrice ?? 0)}
        />

        <p className="text-[14px] leading-[20px] text-[#A7AEAD]">
          Unstake amount
        </p>

        <div className="w-full px-6 py-4 rounded-xl border border-[#E1E2E2] mb-[16px]">
          <div className="flex items-center justify-between mb-[16px]">
            {/* <p className="text-black text-[40px] leading-[48px]">2,031</p> */}
            <Controller
              control={methods.control}
              name="valueUnStake"
              render={({ field: { value, onChange } }) => {
                return (
                  <NumericFormat
                    value={value}
                    className="text-black text-[40px] leading-[48px] w-full"
                    defaultValue=""
                    placeholder="0"
                    allowNegative={false}
                    maxLength={13}
                    onValueChange={(values) => {
                      onChange({
                        target: {
                          name: "value",
                          value: values.floatValue
                            ? values.floatValue
                            : undefined,
                        },
                      });
                    }}
                    decimalScale={2}
                    thousandSeparator
                  />
                );
              }}
            />

            <p className="text-[#686A6C]">${balanceUsdInput}</p>
          </div>

          <ToggleValue onChangeValue={handleSelectValue} />
        </div>

        <Button
          isDisabled={isDisabledButton}
          isLoading={methods.formState.isSubmitting}
          onClick={handleSubmit(handleUnStake)}
          className="self-stretch px-[24px] h-[56px] flex items-center justify-center gap-[8px] bg-black rounded-full text-[16px] leading-[24px] text-white mb-[16px]"
        >
          {textButton}
        </Button>

        <p className="self-stretch text-[14px] leading-[20px] text-[#A7AEAD] text-center">
          Staked AAI will be locked for 3 epochs
        </p>
      </div>
    </FormProvider>
  );
}
