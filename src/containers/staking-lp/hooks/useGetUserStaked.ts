import { Staking__factory } from "@/contract";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { ethers } from "ethers";
import { useContext } from "react";
import useSWR from "swr";
import { ContextProviderJsonRpcProvider } from "../ContextProvider";
import { contract_name_lp } from "../my-staking/data";

export async function fetcher({
  address,
  provider,
}: {
  address: string;
  provider: ethers.providers.JsonRpcProvider;
}) {
  const contract = Staking__factory.connect(contract_name_lp, provider);
  const userStaked = await contract.userStaked(address);

  return userStaked;
}

export function useGetUserStaked() {
  const provider = useContext(ContextProviderJsonRpcProvider);

  const { address } = useWeb3ModalAccount();

  const { data, mutate } = useSWR(
    { key: `getUserStakedLp-${address}`, address: address ?? "", provider },
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
