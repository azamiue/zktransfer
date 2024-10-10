import { Erc20__factory } from "@/contract";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { ethers } from "ethers";
import { useContext } from "react";
import useSWR from "swr";
import { ContextProviderJsonRpcProvider } from "../ContextProvider";
import { contract_name_lp, lp_token } from "../my-staking/data";

export async function fetcher({
  address,
  provider,
}: {
  address: string;
  provider: ethers.providers.JsonRpcProvider;
}) {
  const contract = Erc20__factory.connect(lp_token, provider);
  const allowance = contract.allowance(address, contract_name_lp);

  return allowance;
}

export function useAllowanceLp() {
  const { address } = useWeb3ModalAccount();

  const provider = useContext(ContextProviderJsonRpcProvider);

  const { data, mutate } = useSWR(
    { key: `getallowanceLp-${address}`, address: address ?? "", provider },
    fetcher,
    {
      dedupingInterval: 60000,
    }
  );

  return {
    data,
    mutate,
  };
}
