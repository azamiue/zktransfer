import { Staking__factory } from "@/contract";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { ethers } from "ethers";
import useSWR from "swr";
import { contract_name, rpc_url } from "../data";

export async function fetcher({ address }: { address: string }) {
  const provider = new ethers.providers.JsonRpcProvider(rpc_url);

  const contract = Staking__factory.connect(contract_name, provider);
  const userStaked = await contract.userStaked(address);

  return userStaked;
}

export function useGetUserStaked() {
  const { address } = useWeb3ModalAccount();

  const { data, mutate, isLoading } = useSWR(
    { key: "getUserStaked", address: address ?? "" },
    fetcher,
    {
      dedupingInterval: 60000,
    }
  );

  return {
    data,
    mutate,
    isLoading,
  };
}
