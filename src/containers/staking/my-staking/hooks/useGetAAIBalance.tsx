import { Erc20__factory } from "@/contract";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { ethers } from "ethers";

import useSWR from "swr";
import { aai_token, rpc_url } from "../data";

async function fetcher({ address }: { address: string }) {
  const provider = new ethers.providers.JsonRpcProvider(rpc_url);

  const contract1 = Erc20__factory.connect(aai_token, provider);

  const balance = await contract1.balanceOf(address);

  return balance;
}

export function useGetAAIBalance() {
  const { address } = useWeb3ModalAccount();

  const { data, mutate, isLoading } = useSWR(
    { address: address ?? "", key: "getbalance-aai" },
    fetcher
  );

  return { data: data, mutate, isLoading };
}
