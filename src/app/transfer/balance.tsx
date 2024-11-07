import { Button, Input } from "@nextui-org/react";
import { ethers } from "ethers";
import { useCallback } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Provider, Wallet } from "zksync-web3";
import { TransferSchema } from "./type";

export function Balance() {
  const { control, setValue, setError } = useFormContext<TransferSchema>();

  const wallet = useWatch({ control, name: "wallet" });
  const ether = useWatch({ control, name: "ether" });
  const toWallet = useWatch({ control, name: "toWallet" });
  const amount = useWatch({ control, name: "amount" });
  const pk = useWatch({ control, name: "pk" });
  const loading = useWatch({ control, name: "loading" });
  const tx = useWatch({ control, name: "tx" });

  const handleTransfer = useCallback(async () => {
    setValue("loading", true);
    if (!toWallet) {
      setError("toWallet", {
        type: "manual",
        message: "Recipient address is required",
      });
      return;
    }

    if (!amount || isNaN(Number(amount))) {
      setError("amount", {
        type: "manual",
        message: "Valid amount is required",
      });
      return;
    }

    try {
      const wallet = new Wallet(pk);

      // Connect to provider
      const provider = new Provider(
        "https://ethereum-sepolia-rpc.publicnode.com"
      );

      // Create wallet from private key and provider
      const senderWallet = wallet.connect(provider);

      // Create transaction
      const tx = {
        to: toWallet, // Recipient address
        value: ethers.utils.parseEther(amount.toString()), // Amount to send (in wei)
      };

      // Send transaction
      const transactionResponse = await senderWallet.sendTransaction(tx);

      // Wait for the transaction to be mined
      //   await transactionResponse.wait();

      // Update success in form state
      setValue("tx", transactionResponse.hash);
      setValue("txSuccess", true);
      console.log("transactionResponse", transactionResponse.hash);
    } catch (error) {
      console.log("error", error);
      setValue("txFail", true);
    }
  }, [toWallet, amount, pk, setValue, setError]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-start gap-y-3">
      {/* <h1 className="text-[20px] font-semibold">Transfer Function</h1> */}
      <div>
        <h1 className="text-[18px]">Your Wallet: {wallet}</h1>
        <h1 className="text-[15px]">
          Your Balance: {Number(ether).toFixed(3)} ETH
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-3 w-[600px]">
        <Input
          type="string"
          label="To Wallet"
          className="w-full"
          value={toWallet}
          onChange={(e) => setValue("toWallet", e.target.value)}
        />
        <Input
          type="string"
          label="Amount"
          className="w-full"
          value={amount}
          onChange={(e) => setValue("amount", e.target.value)}
        />
        <Button color="primary" onClick={handleTransfer} isLoading={loading}>
          Send
        </Button>
      </div>
      {tx == "" ? (
        ""
      ) : (
        <a href={`https://sepolia.etherscan.io/tx/${tx}`}>Your Receipt</a>
      )}
    </div>
  );
}
