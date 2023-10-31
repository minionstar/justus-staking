import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import React from "@heroicons/react";
import NavComponent from "./components/navbar";
import { useState } from "react";
import StakeComponent from "./scenes/stake/stake";
import PartnerComponent from "./scenes/partner/partner";
import Dashboard from "./scenes/dashboard/dashboard";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { polygonMumbai, bsc } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { Buffer } from "buffer";

window.Buffer = window.Buffer || Buffer;
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "JTT Stake",
  projectId: "JS",
  chains,
});

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export default function App() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains}>
        <main className="main">
          <NavComponent setActiveTab={setActiveTab} activeTab={activeTab} />
          <div className="content h-[100%]">
            {activeTab === 0 ? (
              <Dashboard />
            ) : activeTab === 1 ? (
              <StakeComponent />
            ) : (
              <PartnerComponent />
            )}
          </div>
        </main>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

// set chain from polygon to bsc
