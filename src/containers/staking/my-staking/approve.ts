"use client";

import { Erc20__factory } from "@/contract";
import BigNumber from "bignumber.js";
import { Signer } from "ethers";
import { aai_token, contract_name } from "./data";

export async function approveToken(props: {
  selectedAddress: `0x${string}`;
  signer: Signer;
  value: BigNumber;
}) {
  const { selectedAddress, signer, value } = props;

  const contract = Erc20__factory.connect(aai_token, signer);
  const amount = `0x${value.multipliedBy(Math.pow(10, 18)).toString(16)}`;

  const gasLimit = await contract.estimateGas.approve(
    contract_name,
    amount.toString(),
    {
      from: selectedAddress,
    }
  );

  const data = await contract.approve(contract_name, amount.toString(), {
    from: selectedAddress,
    gasLimit: gasLimit,
    type: 0,
  });

  const receipt = await data.wait();
  return receipt;
}
