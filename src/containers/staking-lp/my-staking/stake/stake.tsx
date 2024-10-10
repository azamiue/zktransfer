"use client";

import { ToastMessage } from "@/components/ToastMessage/ToastMessage";
import { Erc20__factory, Staking__factory } from "@/contract";
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
import { formatEther } from "ethers/lib/utils";
import { useCallback, useContext, useMemo } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { ContextProviderJsonRpcProvider } from "../../ContextProvider";
import { useAllowanceLp } from "../../hooks/useAllowanceLp";
import { useGetLpBalance } from "../../hooks/useGetLpBalance";
import { useGetUserStaked } from "../../hooks/useGetUserStaked";
import { useGetUserStakeUserLpInfo } from "../../hooks/useStakingLpInfo";
import { approveTokenLp, staking } from "../action";
import { contract_name_lp, lp_token } from "../data";
import { BalanceStakeView } from "./balace-stake";
import { ToggleValue } from "./toggle-value";

interface StakeValueForm {
  valueStake: string;
}

type Props = {
  onActionSuccess: () => void;
};

export function Stake({ onActionSuccess }: Props) {
  const provider = useContext(ContextProviderJsonRpcProvider);

  const methods = useForm<StakeValueForm>({
    defaultValues: {
      valueStake: "",
    },
  });
  const { setValue, handleSubmit, watch } = methods;

  const { data: balanceStake, mutate } = useGetLpBalance();

  const { data: allowance, mutate: mutateAllowance } = useAllowanceLp();

  const { mutate: mutateUnStake } = useGetUserStaked();

  const { data: dataInfoStake } = useGetUserStakeUserLpInfo();

  const { isSmartWallet } = useSmartAccount();

  const valueStake = watch("valueStake");

  const isNeedApprove = useMemo(() => {
    if (!valueStake || !allowance) {
      return false;
    }

    if (
      new BigNumber(allowance.toString()).lt(
        new BigNumber(valueStake).multipliedBy(Math.pow(10, 18))
      )
    ) {
      return true;
    }

    return false;
  }, [allowance, valueStake]);

  const { address } = useWeb3ModalAccount();

  const { walletProvider } = useWeb3ModalProvider();

  const balanceStakeFormatNumber = useMemo(() => {
    if (!balanceStake) return 0;

    return Number(formatEther(balanceStake));
  }, [balanceStake]);

  const textButton = useMemo(() => {
    if (isNeedApprove) {
      return "Approve";
    }

    if (Number(valueStake) > Number(formatEther(balanceStake ?? 0))) {
      return "Insufficient Balance";
    }

    return "Stake";
  }, [balanceStake, isNeedApprove, valueStake]);

  const balanceUsdInput = useMemo(() => {
    if (!valueStake || !dataInfoStake) return 0;

    return formatDisplay(
      Number(Number(valueStake)) * Number(dataInfoStake.aaiPrice ?? 0),
      {
        decimalToShow: 2,
      }
    );
  }, [dataInfoStake, valueStake]);

  const aai_balance = useMemo(() => {
    if (!balanceStake) {
      return 0;
    }

    const value = formatEther(balanceStake);

    return Number(value);
  }, [balanceStake]);

  const isDisabledButton = useMemo(() => {
    return (
      !Number(valueStake) ||
      methods.formState.isSubmitting ||
      Number(valueStake) > Number(formatEther(balanceStake ?? 0))
    );
  }, [balanceStake, methods.formState.isSubmitting, valueStake]);

  const handleSelectValue = useCallback(
    (rate: number) => {
      setValue(
        "valueStake",
        numberFloor(balanceStakeFormatNumber * rate).toString()
      );
    },
    [balanceStakeFormatNumber, setValue]
  );

  const onApprove = useCallback(
    async (value: string) => {
      if (!address || !walletProvider || !allowance) {
        return;
      }

      try {
        const signer = await walletSigner(walletProvider, address);

        let receipt = null;

        if (isSmartWallet) {
          const amount = `0x${new BigNumber(value)
            .multipliedBy(Math.pow(10, 18))
            .toString(16)}`;

          const hash = await sendTransactionAa({
            signer: signer,
            abi: Erc20__factory.abi,
            contractAddress: lp_token,
            method: "approve",
            selectedAddress: address,
            params: [contract_name_lp, amount],
          });

          receipt = await provider?.waitForTransaction(hash);
        } else {
          receipt = await approveTokenLp({
            selectedAddress: address,
            signer,
            value: new BigNumber(value),
          });
        }

        if (!receipt?.status) {
          throw new Error("approveTokenLp Error");
        }

        mutateAllowance();
        ToastMessage.success({
          title: "Approve Successful",
          description: "",
        });
      } catch (error) {
        ToastMessage.error({
          title: "Approve Failed",
          description: "",
        });

        console.log("Error approve", error);
      } finally {
      }
    },
    [
      address,
      allowance,
      isSmartWallet,
      mutateAllowance,
      provider,
      walletProvider,
    ]
  );

  const handleStake = useCallback(
    async (value: StakeValueForm) => {
      if (!address || !walletProvider) {
        return;
      }

      sendGAEvent({
        event: "handleStakeLp",
        value: "handleStakeLp",
      });

      try {
        if (isNeedApprove) {
          return await onApprove(value.valueStake.toString());
        }
        let receipt = null;

        const signer = await walletSigner(walletProvider, address);

        if (isSmartWallet) {
          const amount = `0x${new BigNumber(value.valueStake)
            .multipliedBy(Math.pow(10, 18))
            .toString(16)}`;

          const hash = await sendTransactionAa({
            signer: signer,
            abi: Staking__factory.abi,
            contractAddress: contract_name_lp,
            method: "stake",
            selectedAddress: address,
            params: [amount],
          });

          receipt = await provider?.waitForTransaction(hash);
        } else {
          receipt = await staking({
            selectedAddress: address,
            signer,
            value: new BigNumber(value.valueStake),
          });
        }

        if (!receipt?.status) {
          throw new Error("Stake Error");
        }
        mutateUnStake();

        mutate();

        onActionSuccess();

        ToastMessage.success({
          title: "Stake Successful",
          description: "",
        });
      } catch (error) {
        ToastMessage.error({
          title: "Stake Error",
          description: "",
        });
        console.error("Error", error);
      }
    },
    [
      address,
      isNeedApprove,
      isSmartWallet,
      mutate,
      mutateUnStake,
      onActionSuccess,
      onApprove,
      provider,
      walletProvider,
    ]
  );

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col items-start gap-1">
        <p className="text-[14px] leading-[20px] text-[#A7AEAD]">Balance</p>

        <BalanceStakeView
          balanceStake={aai_balance}
          aaiPrice={Number(dataInfoStake?.aaiPrice ?? 0)}
        />

        <p className="text-[14px] leading-[20px] text-[#A7AEAD]">Stake</p>

        <div className="w-full px-6 py-4 rounded-xl border border-[#E1E2E2] mb-[16px]">
          <div className="flex items-center justify-between mb-[16px]">
            <Controller
              control={methods.control}
              name="valueStake"
              render={({ field: { value, onChange } }) => {
                return (
                  <NumericFormat
                    value={value}
                    className="text-black text-[40px] leading-[48px] w-full"
                    defaultValue=""
                    placeholder="0"
                    allowNegative={false}
                    maxLength={13}
                    onValueChange={(values: { floatValue: any }) => {
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

            <p className="text-[#686A6C] flex-shrink-0">${balanceUsdInput}</p>
          </div>

          <ToggleValue onChangeValue={handleSelectValue} />
        </div>

        <Button
          isDisabled={isDisabledButton}
          isLoading={methods.formState.isSubmitting}
          onClick={handleSubmit(handleStake)}
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
