import { Contract, ethers } from "ethers";
import { Provider, Signer, types, utils } from "zksync-web3";

const rpcUrl = "https://mainnet.era.zksync.io";
const chainId = 324;

export const sendTransactionAa = async (opts: {
  signer: Signer;
  contractAddress: string;
  selectedAddress: string;
  method: string;
  params: any[];
  abi: any;
}) => {
  const { signer, contractAddress, method, params, abi, selectedAddress } =
    opts;

  const provider = new Provider(rpcUrl);
  const contract = new Contract(contractAddress, abi, provider);
  const populateContract = await contract.populateTransaction[method](
    ...params,
    {
      from: selectedAddress,
    }
  );

  const gasLimit = await provider.estimateGas({
    ...populateContract,
    from: selectedAddress,
  });

  populateContract.gasLimit = gasLimit;
  populateContract.maxFeePerGas = await provider.getGasPrice();
  populateContract.maxPriorityFeePerGas = ethers.BigNumber.from(0);
  populateContract.chainId = chainId;
  populateContract.from = selectedAddress;
  populateContract.value = ethers.BigNumber.from("0");
  populateContract.nonce = await provider.getTransactionCount(selectedAddress);
  populateContract.type = 113;
  populateContract.customData = {
    ...populateContract.customData,
    gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
  } as types.Eip712Meta;

  const signature = ethers.utils.arrayify(
    ethers.utils.joinSignature(await signer.eip712.sign(populateContract))
  );
  populateContract.customData = {
    ...populateContract.customData,
    customSignature: signature,
  };

  const tx = await provider.sendTransaction(utils.serialize(populateContract));

  return tx.hash;
};
