"use client"; // Add this line at the top of the file

import { Button, Input } from "@nextui-org/react";
import { ethers } from "ethers";
import { useCallback } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Provider, Wallet } from "zksync-web3";
import { TransferSchema } from "./type";

export function PrivateKey() {
  const { control, setValue, setError } = useFormContext<TransferSchema>();

  const pk = useWatch({ control, name: "pk" });
  const wallet = useWatch({ control, name: "wallet" });

  const handleClick = useCallback(async () => {
    if (!pk) {
      setError("pk", { type: "manual", message: "Private key is required" });
      return;
    }

    try {
      // Create wallet using ethers
      const wallet = new Wallet(pk);

      // Connect to zkSync provider
      const provider = new Provider(
        "https://ethereum-sepolia-rpc.publicnode.com"
      ); // zkSync mainnet or testnet provider
      const connectedWallet = wallet.connect(provider);

      // Get wallet balance
      const balance = await provider.getBalance(connectedWallet.address);

      // Convert balance from wei to ether
      const balanceInEther = ethers.utils.formatEther(balance);

      setValue("success", true);
      setValue("wallet", connectedWallet.address);
      setValue("ether", balanceInEther);

      // Optionally, you can set additional form state or other actions here
    } catch (error) {
      setValue("fail", true);
    }
  }, [pk, setError, setValue]);

  return (
    <div className="flex flex-col justify-center items-center gap-y-3 w-full h-full">
      <div className="text-[20px]">Wallet Management</div>
      <div className="flex items-center justify-center gap-x-3">
        <Input
          type="string"
          label="Import Private Key"
          className="w-[500px]"
          value={pk}
          onChange={(e) => setValue("pk", e.target.value)}
        />
        <Button color="primary" className="h-[56px]" onClick={handleClick}>
          Confirm
        </Button>
      </div>
    </div>
  );
}
