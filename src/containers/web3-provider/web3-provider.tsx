"use client";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";

const projectId = "5fd96e847468a764619be85d06486d6c";

const mainnet = {
  chainId: 324,
  name: "zkSync Era",
  currency: "ETH",
  explorerUrl: "https://explorer.zksync.io",
  rpcUrl: "https://mainnet.era.zksync.io",
};

const metadata = {
  name: "AutoAir AI",
  description:
    "Effortlessly farm airdrops with AutoAir Telegram Bot. Utilizing AI-generated strategy for instant, 1-click auto-farming.",
  url: "https://autoair.xyz",
  icons: ["https://autoair.xyz/icon/aai-token.png"],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
  projectId,
  enableAnalytics: true,
  chainImages: {
    324: "/icon/zksync.png",
  },
});

export default function Web3ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
