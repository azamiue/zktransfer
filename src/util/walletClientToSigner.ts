import { ethers } from "ethers";
import { Web3Provider } from "zksync-web3";

export async function walletClientToSigner(
  walletProvider: ethers.providers.ExternalProvider
) {
  const provider = new ethers.providers.Web3Provider(walletProvider);
  const signer = await provider.getSigner();

  return signer;
}

export async function walletSigner(
  walletProvider: ethers.providers.ExternalProvider,
  address: string
) {
  const network = {
    chainId: 324,
    name: "zkSync Era",
    ensAddress: "",
  };

  const provider = new Web3Provider(walletProvider, network);
  const signer = provider.getSigner(address);
  return signer;
}
