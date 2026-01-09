import { createPublicClient, createWalletClient, http } from "viem";
import { sepolia } from "viem/chains";

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http("https://rpc.sepolia.org"),
});

export const walletClient = createWalletClient({
  chain: sepolia,
  transport: typeof window !== "undefined" ? window.ethereum : undefined,
});
