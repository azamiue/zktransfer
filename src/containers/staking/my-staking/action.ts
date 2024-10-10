import { GAS_PRICE } from "@/config";
import { Staking__factory } from "@/contract";
import BigNumber from "bignumber.js";
import { Signer } from "ethers";
import { contract_name } from "./data";

export async function staking(props: {
  selectedAddress: string;
  signer: Signer;
  value: BigNumber;
}) {
  const { selectedAddress, signer, value } = props;

  const contract = Staking__factory.connect(contract_name, signer);
  const amount = `0x${value.multipliedBy(Math.pow(10, 18)).toString(16)}`;
  const gasLimit = await contract.estimateGas.stake(amount.toString(), {
    from: selectedAddress,
  });

  const res = await contract.stake(amount.toString(), {
    from: selectedAddress,
    gasLimit: gasLimit.mul(2),
    gasPrice: GAS_PRICE,
    type: 0,
  });

  const receipt = await res.wait();
  return receipt;
}

export async function makeRequest(props: {
  selectedAddress: string;
  signer: Signer;
  value: BigNumber;
}) {
  const { selectedAddress, signer, value } = props;

  const contract = Staking__factory.connect(contract_name, signer);
  const amount = `0x${value.multipliedBy(Math.pow(10, 18)).toString(16)}`;

  const gasLimit = await contract.estimateGas.makeRequest(amount, {
    from: selectedAddress,
  });

  const res = await contract.makeRequest(amount, {
    from: selectedAddress,
    gasLimit: gasLimit.mul(2),
    gasPrice: GAS_PRICE,
    type: 0,
  });

  const receipt = await res.wait();
  return receipt;
}

export async function redeem(props: {
  selectedAddress: string;
  signer: Signer;
  epoch: string;
}) {
  const { selectedAddress, signer, epoch } = props;

  const contract = Staking__factory.connect(contract_name, signer);

  const gasLimit = await contract.estimateGas.unstake(epoch, {
    from: selectedAddress,
  });

  const res = await contract.unstake(epoch, {
    from: selectedAddress,
    gasLimit: gasLimit.mul(2),
    gasPrice: GAS_PRICE,
    type: 0,
  });

  const receipt = await res.wait();
  return receipt;
}

export async function claimReward(props: {
  selectedAddress: string;
  signer: Signer;
}) {
  const { selectedAddress, signer } = props;

  const contract = Staking__factory.connect(contract_name, signer);

  const gasLimit = await contract.estimateGas.claimReward({
    from: selectedAddress,
  });

  const res = await contract.claimReward({
    from: selectedAddress,
    gasLimit: gasLimit.mul(2),
    gasPrice: GAS_PRICE,
    type: 0,
  });

  const receipt = await res.wait();
  return receipt;
}
