import { StakeInfoContext } from "@/app/(staking)/staking/type";
import { Staking__factory } from "@/contract";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { ethers } from "ethers";
import { useContext } from "react";
import useSWR from "swr";
import { contract_name } from "../data";

export async function fetcher({
  address,
  provider,
}: {
  address: string;
  provider: ethers.providers.JsonRpcProvider | undefined;
}) {
  if (!provider) {
    return [ethers.BigNumber.from(0), ethers.BigNumber.from(0)];
  }

  const contract = Staking__factory.connect(contract_name, provider);

  const data = await Promise.all([
    contract.currentEpoch(),
    contract.currentEpochStartAt(),
  ]);

  return data;
}

export function useGetCurrentEpoch() {
  const { address } = useWeb3ModalAccount();
  const { provider } = useContext(StakeInfoContext);

  const { data, mutate, isLoading } = useSWR(
    { key: "getCurrent", address: address ?? "", provider },
    fetcher,
    {
      dedupingInterval: 60000,
    }
  );

  return {
    currentEpoch: data?.[0],
    currentEpochStartAt: data?.[1],
    mutate,
    isLoading,
  };
}
