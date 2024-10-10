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
    return undefined;
  }

  const contract = Staking__factory.connect(contract_name, provider);
  const list = await contract.getUnstakeRequests(address, {
    from: address,
  });

  return list;
}

export function useGetListRequest() {
  const { address } = useWeb3ModalAccount();
  const { provider } = useContext(StakeInfoContext);

  const { data, mutate, isLoading } = useSWR(
    { key: "getListUnstake", address: address ?? "", provider },
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
