import { Staking__factory } from "@/contract";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { ethers } from "ethers";

import useSWR from "swr";
import { contract_name_lp, rpc_url } from "../my-staking/data";

async function fetcher() {
  const provider = new ethers.providers.JsonRpcProvider(rpc_url);

  const contract = Staking__factory.connect(contract_name_lp, provider);

  const balance = await contract.totalStaked();
  return balance;
}

export function useTotalStakeLp() {
  const { address } = useWeb3ModalAccount();

  const { data, mutate, isLoading } = useSWR(
    { address: address ?? "", key: `totalStaked-${address}` },
    fetcher
  );

  return { data: data, mutate, isLoading };
}
