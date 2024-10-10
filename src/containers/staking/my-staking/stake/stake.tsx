"use client";

import { StakeInfoContext } from "@/app/(staking)/staking/type";
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
import classNames from "classnames";
import { formatEther } from "ethers/lib/utils";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { staking } from "../action";
import { useAllowanceAAI } from "../allowance";
import { approveToken } from "../approve";
import { aai_token, contract_name } from "../data";
import { useGetAAIBalance } from "../hooks/useGetAAIBalance";
import { useGetUserStaked } from "../hooks/useGetUserStaked";
import { BalaceStake } from "./balace-stake";
import { ToggleValue } from "./toggle-value";

export interface StakeValueForm {
  value?: number | string;
  toggleActiveId: number;
}

export function Stake({
  setIsVisible,
}: {
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}) {
  const methods = useForm<StakeValueForm>({
    defaultValues: {
      value: undefined,
      toggleActiveId: -1,
    },
  });
  const { handleSubmit, setValue } = methods;
  const [isLoading, setIsLoading] = useState(false);

  const { data: allowance, mutate: mutateAllowance } = useAllowanceAAI();
  const { address } = useWeb3ModalAccount();
  const { mutate, data: aai_balance } = useGetAAIBalance();
  const { mutate: mutateStaked } = useGetUserStaked();
  const [input_value, toggleActiveId] = useWatch({
    control: methods.control,
    name: ["value", "toggleActiveId"],
  });
  const { apr_info } = useContext(StakeInfoContext);

  const { isSmartWallet } = useSmartAccount();
  const { provider } = useContext(StakeInfoContext);

  const { walletProvider } = useWeb3ModalProvider();

  const isNeedApprove = useMemo(() => {
    if (!input_value || !allowance) {
      return false;
    }

    if (
      new BigNumber(allowance.toString()).lt(
        new BigNumber(input_value).multipliedBy(Math.pow(10, 18))
      )
    ) {
      return true;
    }

    return false;
  }, [allowance, input_value]);

  const disableButton = useMemo(() => {
    if (isLoading || !input_value) {
      return true;
    }

    if (new BigNumber(input_value).eq(0)) {
      return true;
    }

    if (
      aai_balance &&
      new BigNumber(aai_balance.toString()).lt(
        new BigNumber(input_value).multipliedBy(Math.pow(10, 18))
      )
    ) {
      return true;
    }

    return false;
  }, [aai_balance, input_value, isLoading]);

  const text_button = useMemo(() => {
    if (isNeedApprove) {
      return "Approve";
    }

    if (
      aai_balance &&
      input_value &&
      new BigNumber(aai_balance.toString()).lt(
        new BigNumber(input_value).multipliedBy(Math.pow(10, 18))
      )
    ) {
      return "Insufficent Balance";
    }

    return "Stake";
  }, [aai_balance, input_value, isNeedApprove]);

  const price = useMemo(() => {
    if (!apr_info?.aaiPrice) {
      return "--";
    }

    const value = new BigNumber(apr_info.aaiPrice)
      .multipliedBy(input_value || "0")

      .toNumber();

    return formatDisplay(value, { decimalToShow: 2 });
  }, [apr_info?.aaiPrice, input_value]);

  const handleApprove = useCallback(
    async (value: number | string) => {
      if (
        !address ||
        !walletProvider ||
        !allowance ||
        !provider ||
        !aai_balance
      ) {
        return;
      }

      let valueChain = value;

      if (toggleActiveId === 3) {
        valueChain = formatEther(aai_balance);
      }

      let receipt;
      try {
        const signer = await walletSigner(walletProvider, address);
        const amount = `0x${new BigNumber(valueChain)
          .multipliedBy(Math.pow(10, 18))
          .toString(16)}`;

        if (isSmartWallet) {
          const txhash = await sendTransactionAa({
            signer: signer,
            abi: Erc20__factory.abi,
            contractAddress: aai_token,
            method: "approve",
            selectedAddress: address,
            params: [contract_name, amount],
          });

          receipt = await provider.waitForTransaction(txhash);
        } else {
          receipt = await approveToken({
            selectedAddress: address,
            signer,
            value: new BigNumber(valueChain),
          });
        }

        if (receipt.status) {
          ToastMessage.success({
            title: "Approve Successful",
            description: "",
          });

          await mutateAllowance();

          setIsLoading(false);
        }
      } catch (error) {
        ToastMessage.error({
          title: "Approve Failed",
          description: "",
        });

        console.log("Error approve", error);
      }
    },
    [
      aai_balance,
      address,
      allowance,
      isSmartWallet,
      mutateAllowance,
      provider,
      toggleActiveId,
      walletProvider,
    ]
  );

  const handleStake = useCallback(
    async (value: StakeValueForm) => {
      if (
        !address ||
        !walletProvider ||
        !allowance ||
        !value.value ||
        !provider ||
        !aai_balance
      ) {
        return;
      }

      sendGAEvent({
        event: "HandleStake",
        value: "HandleStake",
      });

      setIsLoading(true);

      if (isNeedApprove) {
        return handleApprove(value.value);
      }

      let valueChain = value.value;

      if (toggleActiveId === 3) {
        valueChain = formatEther(aai_balance);
      }

      let receipt;
      try {
        const signer = await walletSigner(walletProvider, address);
        const amount = `0x${new BigNumber(valueChain)
          .multipliedBy(Math.pow(10, 18))
          .toString(16)}`;

        if (isSmartWallet) {
          const txhash = await sendTransactionAa({
            signer: signer,
            abi: Staking__factory.abi,
            contractAddress: contract_name,
            method: "stake",
            selectedAddress: address,
            params: [amount],
          });

          receipt = await provider.waitForTransaction(txhash);
        } else {
          receipt = await staking({
            selectedAddress: address,
            signer,
            value: new BigNumber(valueChain),
          });
        }

        if (receipt.status) {
          setValue("value", "");
          setIsVisible(false);

          ToastMessage.success({
            title: "Stake Successful",
            description: "",
          });
        }

        await Promise.all([mutate(), mutateStaked()]);
      } catch (error) {
        console.error("Error", error);

        ToastMessage.error({
          title: "Stake Failed",
          description: "",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [
      aai_balance,
      address,
      allowance,
      handleApprove,
      isNeedApprove,
      isSmartWallet,
      mutate,
      mutateStaked,
      provider,
      setIsVisible,
      setValue,
      toggleActiveId,
      walletProvider,
    ]
  );

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col items-start gap-1">
        <p className="text-[14px] leading-[20px] text-[#A7AEAD]">Balance</p>

        <BalaceStake />

        <p className="text-[14px] leading-[20px] text-[#A7AEAD]">Stake</p>

        <div className="w-full px-6 py-4 rounded-xl border border-[#E1E2E2] mb-[16px]">
          <div className="flex items-center justify-between mb-[16px]">
            <Controller
              control={methods.control}
              rules={{ required: true }}
              name="value"
              render={({ field: { value, onChange } }) => {
                return (
                  <NumericFormat
                    value={numberFloor(Number(value))}
                    className="text-black text-[40px] leading-[48px] w-full"
                    defaultValue=""
                    placeholder="0"
                    allowNegative={false}
                    maxLength={13}
                    onKeyDown={() => {
                      if (toggleActiveId !== -1) {
                        setValue("toggleActiveId", -1);
                      }
                    }}
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

            <p className="text-[#686A6C] flex-shrink-0">${price}</p>
          </div>

          <ToggleValue />
        </div>

        <Button
          isLoading={isLoading}
          isDisabled={disableButton}
          onClick={handleSubmit(handleStake)}
          className={classNames(
            "self-stretch px-[24px] h-[56px] flex items-center justify-center gap-[8px] bg-black rounded-full text-[16px] leading-[24px] text-white mb-[16px]",
            {
              "opacity-30": disableButton,
            }
          )}
        >
          {text_button}
        </Button>

        <p className="self-stretch text-[14px] leading-[20px] text-[#A7AEAD] text-center">
          Staked AAI will be locked for 3 epochs
        </p>
      </div>
    </FormProvider>
  );
}
