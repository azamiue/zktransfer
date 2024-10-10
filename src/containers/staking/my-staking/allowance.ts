import { Erc20__factory } from "@/contract";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { ethers } from "ethers";
import useSWR from "swr";
import { aai_token, contract_name, rpc_url } from "./data";

export async function fetcher({ address }: { address: string }) {
  const provider = new ethers.providers.JsonRpcProvider(rpc_url);

  const contract = Erc20__factory.connect(aai_token, provider);
  const allowance = contract.allowance(address, contract_name);

  return allowance;
}

export function useAllowanceAAI() {
  const { address } = useWeb3ModalAccount();

  const { data, mutate } = useSWR(
    { key: "getallowance", address: address ?? "" },
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
