import { Staking__factory } from "@/contract";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { ethers } from "ethers";
import { useContext } from "react";
import useSWR from "swr";
import { ContextProviderJsonRpcProvider } from "../ContextProvider";
import { contract_name_lp } from "../my-staking/data";

function listUnStakeRequestsByDataContract(
  listUnStakeRequests: [ethers.BigNumber[], ethers.BigNumber[]],
  currentEpoch: number
) {
  if (!listUnStakeRequests) {
    return [];
  }

  const data = listUnStakeRequests[1]
    .map((item, index) => {
      return Number(item) > 0
        ? {
            amount: item,
            epoch: Number(listUnStakeRequests[0][index]),
            isRedeem: Number(listUnStakeRequests[0][index]) <= currentEpoch,
          }
        : null;
    })
    .filter((value) => value);

  return data;
}

export async function fetcher({
  address,
  provider,
}: {
  address: string;
  provider: ethers.providers.JsonRpcProvider;
}) {
  const contract = Staking__factory.connect(contract_name_lp, provider);
  const listRequest = await contract.getUnstakeRequests(address, {
    from: address,
  });

  const currentEpoch = await contract.currentEpoch();

  return listUnStakeRequestsByDataContract(listRequest, Number(currentEpoch));
}

export function useGetListRequestLp() {
  const provider = useContext(ContextProviderJsonRpcProvider);

  const { address } = useWeb3ModalAccount();

  const { data, error, isLoading, mutate } = useSWR(
    { key: `getListUnstake-${address}`, address: address ?? "", provider },
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
