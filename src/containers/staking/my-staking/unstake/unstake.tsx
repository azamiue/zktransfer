"use client";

import { StakeInfoContext } from "@/app/(staking)/staking/type";
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
import classNames from "classnames";
import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import Image from "next/image";
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
import { makeRequest } from "../action";
import { contract_name } from "../data";
import { useGetListRequest } from "../hooks/useGetListRequest";
import { useGetUserStaked } from "../hooks/useGetUserStaked";
import { ToggleValue } from "./toggle-value";

export interface UnStakeValueForm {
  value?: number | string;
  toggleActiveId: number;
}

export function UnStake({
  setIsVisible,
}: {
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}) {
  const methods = useForm<UnStakeValueForm>({
    defaultValues: {
      value: undefined,
      toggleActiveId: -1,
    },
    mode: "all",
  });

  const [isLoading, setIsLoading] = useState(false);

  const { address } = useWeb3ModalAccount();
  const { data, mutate } = useGetUserStaked();
  const { data: listRequest, mutate: mutateRequest } = useGetListRequest();
  const { isSmartWallet } = useSmartAccount();
  const { provider, apr_info } = useContext(StakeInfoContext);

  const aai_permission_withdraw = useMemo(() => {
    if (!listRequest || !data) {
      return ethers.BigNumber.from(0);
    }

    const total = listRequest[1].reduce((prev, cur) => {
      return prev.add(cur);
    }, ethers.BigNumber.from(0));

    return data.sub(total);
  }, [data, listRequest]);

  const { walletProvider } = useWeb3ModalProvider();
  const { control, handleSubmit, setValue } = methods;
  const [input_value, toggleActiveId] = useWatch({
    control,
    name: ["value", "toggleActiveId"],
  });

  const price = useMemo(() => {
    if (!apr_info?.aaiPrice) {
      return "--";
    }

    const value = new BigNumber(apr_info.aaiPrice)
      .multipliedBy(input_value || "0")

      .toNumber();

    return formatDisplay(value, { decimalToShow: 2 });
  }, [apr_info?.aaiPrice, input_value]);

  const disable = useMemo(() => {
    if (isLoading || !input_value) {
      return true;
    }

    if (new BigNumber(input_value).eq(0)) {
      return true;
    }

    if (
      aai_permission_withdraw &&
      new BigNumber(aai_permission_withdraw.toString()).lt(
        new BigNumber(input_value).multipliedBy(Math.pow(10, 18))
      )
    ) {
      return true;
    }

    return false;
  }, [aai_permission_withdraw, input_value, isLoading]);

  const userStaked = useMemo(() => {
    if (aai_permission_withdraw.eq(0)) {
      return "--";
    }

    const value = formatEther(aai_permission_withdraw);

    return formatDisplay(Number(value), { decimalToShow: 2 });
  }, [aai_permission_withdraw]);

  const priceUserStaked = useMemo(() => {
    if (!apr_info?.aaiPrice) {
      return "--";
    }

    const value = new BigNumber(apr_info.aaiPrice)
      .multipliedBy(aai_permission_withdraw?.toString() || "0")
      .dividedBy(Math.pow(10, 18))
      .toNumber();

    return formatDisplay(value, { decimalToShow: 2 });
  }, [aai_permission_withdraw, apr_info?.aaiPrice]);

  const handleUnStake = useCallback(
    async (value: UnStakeValueForm) => {
      if (!address || !walletProvider || !value.value || !provider) {
        return;
      }

      sendGAEvent({
        event: "HandleStake",
        value: "HandleStake",
      });

      setIsLoading(true);

      let valueChain = value.value;

      if (toggleActiveId === 3) {
        valueChain = formatEther(aai_permission_withdraw);
      }

      try {
        const signer = await walletSigner(walletProvider, address);
        const amount = `0x${new BigNumber(valueChain)
          .multipliedBy(Math.pow(10, 18))
          .toString(16)}`;

        let receipt;
        if (isSmartWallet) {
          const txhash = await sendTransactionAa({
            signer: signer,
            abi: Staking__factory.abi,
            contractAddress: contract_name,
            method: "makeRequest",
            selectedAddress: address,
            params: [amount],
          });

          receipt = await provider.waitForTransaction(txhash);
        } else {
          receipt = await makeRequest({
            selectedAddress: address,
            signer,
            value: new BigNumber(valueChain),
          });
        }

        if (receipt.status) {
          ToastMessage.success({
            title: "Unstake Success",
            description: "",
          });

          setValue("value", "");
          setIsVisible(false);
        }

        await Promise.all([mutateRequest(), mutate()]);
      } catch (error) {
        console.error("Error", error);

        ToastMessage.error({
          title: "Unstake Failed",
          description: "",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [
      aai_permission_withdraw,
      address,
      isSmartWallet,
      mutate,
      mutateRequest,
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
        <p className="text-[14px] leading-[20px] text-[#A7AEAD]">
          Staked amount
        </p>

        <div className="w-full px-6 py-4 rounded-xl flex justify-between bg-[#F2F4F4] mb-[16px]">
          <div className="justify-start items-center gap-1 flex">
            <Image
              src="/staking/aai.png"
              width={48}
              height={48}
              alt="aai"
              className="w-[20px] aspect-square"
            />

            <p className="text-black text-[16px] leading-[24px]">
              {userStaked} AAI
            </p>
          </div>

          <p className="text-[#686A6C]">${priceUserStaked}</p>
        </div>

        <p className="text-[14px] leading-[20px] text-[#A7AEAD]">
          Unstake amount
        </p>

        <div className="w-full px-6 py-4 rounded-xl border border-[#E1E2E2] mb-[16px]">
          <div className="flex items-center justify-between mb-[16px]">
            <Controller
              control={control}
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
          isDisabled={disable}
          onClick={handleSubmit(handleUnStake)}
          className={classNames(
            "self-stretch px-[24px] h-[56px] flex items-center justify-center gap-[8px] bg-black rounded-full text-[16px] leading-[24px] text-white mb-[16px]",
            {
              "opacity-30": disable,
            }
          )}
        >
          Unstake
        </Button>

        <p className="self-stretch text-[14px] leading-[20px] text-[#A7AEAD] text-center">
          Staked AAI will be locked for 3 epochs
        </p>
      </div>
    </FormProvider>
  );
}
