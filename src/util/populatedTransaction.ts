import { Contract, Provider } from "zksync-web3";

export const populatedTransaction = async (opts: {
  rpcUrl: string;
  contractAddress: string;
  method: string;
  selectedAddress: string;
  abi: any;
  params: any;
  customData?: any;
}) => {
  const {
    rpcUrl,
    contractAddress,
    method,
    selectedAddress,
    abi,
    params,
    customData,
  } = opts;
  const provider = new Provider(rpcUrl);
  const contract = new Contract(contractAddress, abi, provider);
  try {
    const populateContract = await contract.populateTransaction[method](
      ...params,
      {
        ...customData,
        from: selectedAddress,
      }
    );
    return populateContract;
  } catch (error: any) {
    console.error("error in populated tx: ", error);
    throw new Error("Error populate Tx");
  }
};
