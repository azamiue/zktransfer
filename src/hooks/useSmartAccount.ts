import { AccountRegistry__factory } from "@/contract";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { ethers } from "ethers";
import useSWR from "swr";

const registryAddress = "0x3627ceDF17554B3EaF01Ad4f6efA3e5D54c53142";
const rpcUrl = "https://mainnet.era.zksync.io";

export const validateSmartAccount = async (props: {
  key: string;
  address: string;
}) => {
  const { address } = props;

  if (!address) {
    return false;
  }

  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const contract = AccountRegistry__factory.connect(registryAddress, provider);

  try {
    const res: boolean = await contract.isAccount(address);
    return res;
  } catch (error: any) {
    console.error(`Error on: `, error);
    return false;
  }
};

export function useSmartAccount() {
  const { address } = useWeb3ModalAccount();

  const data = useSWR(
    { key: `get-smart-account`, address },
    validateSmartAccount,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000,
    }
  );

  return {
    isSmartWallet: data.data ?? false,
    isLoading: data.isLoading,
  };
}
