import { Staking__factory } from "@/contract";
import { ethers } from "ethers";
import { useContext } from "react";
import useSWR from "swr";
import { ContextProviderJsonRpcProvider } from "../ContextProvider";
import { contract_name_lp } from "../my-staking/data";

export async function fetcher({
  provider,
}: {
  provider: ethers.providers.JsonRpcProvider;
}) {
  const contract = Staking__factory.connect(contract_name_lp, provider);
  const calculateRewardsEarned = await contract.currentEpoch();
  return calculateRewardsEarned;
}

export function useCurrentEpoch() {
  const provider = useContext(ContextProviderJsonRpcProvider);

  const { data, isLoading, mutate } = useSWR(
    { key: "currentEpochLp", provider: provider ?? "" },
    fetcher,
    {
      dedupingInterval: 60000,
    }
  );

  return {
    data,
    isLoading,
    mutate,
  };
}
