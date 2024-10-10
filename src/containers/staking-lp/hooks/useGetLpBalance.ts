import { Erc20__factory } from "@/contract";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { ethers } from "ethers";

import useSWR from "swr";
import { lp_token, rpc_url } from "../my-staking/data";

async function fetcher({ address }: { address: string }) {
  const provider = new ethers.providers.JsonRpcProvider(rpc_url);

  const contract = Erc20__factory.connect(lp_token, provider);

  const balance = await contract.balanceOf(address);

  return balance;
}

export function useGetLpBalance() {
  const { address } = useWeb3ModalAccount();

  const { data, mutate, isLoading } = useSWR(
    { key: `getbalanceLp-${address}`, address: address ?? "" },
    fetcher
  );

  return { data: data, mutate, isLoading };
}
