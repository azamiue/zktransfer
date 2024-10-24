"use client";

import { Button, Input, Spinner } from "@nextui-org/react";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { Provider, Wallet } from "zksync-web3";

export default function Balance() {
  const [wallet, setWallet] = useState("");
  const [ether, setEther] = useState("");
  const [toWallet, setToWallet] = useState("");
  const [amount, setAmount] = useState("");
  const pk = "88ee3fd841711c6c36764090820fe79699a9ac52226c122dba9a80bded77f697";
  const [loading, setLoading] = useState(false);
  const [tx, setTx] = useState("");

  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  const handleTransfer = useCallback(async () => {
    setLoading(true);
    if (!toWallet) {
      alert("Recipient address is required");
      return;
    }

    if (!amount || isNaN(Number(amount))) {
      alert("Valid amount is required");
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
      setTx(transactionResponse.hash);
      setLoading(false);
      setSuccess(true);
      alert("Transaction sent successfully");
    } catch (error) {
      console.log("error", error);
      setFail(true);
      alert("Transaction failed");
    }
  }, [amount, toWallet]);

  useEffect(() => {
    const wallet = new Wallet(pk);

    // Connect to provider
    const provider = new Provider(
      "https://ethereum-sepolia-rpc.publicnode.com"
    );

    // Create wallet from private key and provider
    const senderWallet = wallet.connect(provider);

    // Get wallet balance
    provider.getBalance(senderWallet.address).then((balance) => {
      // Convert balance from wei to ether
      const balanceInEther = ethers.utils.formatEther(balance);
      setWallet(senderWallet.address);
      setEther(balanceInEther);
    });
  }, []);

  if (!wallet) {
    return (
      <div className="w-screen h-screen">
        <div className="w-full h-full flex justify-center items-center">
          <Spinner label="Loading..." color="primary" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="w-screen h-screen">
        <div className="w-full h-full flex flex-col justify-center items-center gap-y-3">
          <h1 className="text-[20px] font-semibold">Transfer Function</h1>
          <div>
            <h1 className="text-[20px]">Your Wallet: {wallet}</h1>
            <h1 className="text-[20px]">Your Balance: {ether} ETH</h1>
          </div>
          <div className="flex flex-col items-center justify-center gap-y-3 w-[600px]">
            <Input
              type="string"
              label="To Wallet"
              className="w-full"
              value={toWallet}
              onChange={(e) => setToWallet(e.target.value)}
            />
            <Input
              type="string"
              label="Amount"
              className="w-full"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Button
              color="primary"
              onClick={handleTransfer}
              isLoading={loading}
            >
              Send
            </Button>
          </div>
          {tx == "" ? (
            ""
          ) : (
            <a href={`https://sepolia.etherscan.io/tx/${tx}`}>Your Receipt</a>
          )}
        </div>
      </div>
    </div>
  );
}
