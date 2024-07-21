"use client";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { arbitrumSepolia, arbitrum } from "wagmi/chains";

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: "BlockFunders",
  projectId: process.env.WALLET_CONNECT_PROJECT_ID,
  chains: [arbitrumSepolia],
  ssr: true,
});

const RainbowKitProviderWrapper = ({ children }) => (
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>{children}</RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export default RainbowKitProviderWrapper;
