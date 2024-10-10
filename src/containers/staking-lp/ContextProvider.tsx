import { ethers } from "ethers";
import { PropsWithChildren, createContext } from "react";
import { rpc_url } from "./my-staking/data";

type Props = {};

export const ContextProviderJsonRpcProvider =
  createContext<ethers.providers.JsonRpcProvider | null>(null);

export default function ContextProvider({ children }: PropsWithChildren) {
  const provider = new ethers.providers.JsonRpcProvider(rpc_url);

  return (
    <ContextProviderJsonRpcProvider.Provider value={provider}>
      {children}
    </ContextProviderJsonRpcProvider.Provider>
  );
}
