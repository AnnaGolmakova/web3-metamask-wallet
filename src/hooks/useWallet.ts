import { useState, useCallback } from "react";
import { ethers } from "ethers";
import { useMetaMask } from "./useMetaMask";

const USDT_CONTRACT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const USDT_ABI = [
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

interface WalletState {
  address: string | null;
  ethBalance: string | null;
  usdtBalance: string | null;
  error: string | null;
  isConnecting: boolean;
}

export function useWallet() {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    ethBalance: null,
    usdtBalance: null,
    error: null,
    isConnecting: false,
  });

  const disconnect = useCallback(() => {
    setWallet({
      address: null,
      ethBalance: null,
      usdtBalance: null,
      error: null,
      isConnecting: false,
    });
  }, []);

  const fetchBalances = useCallback(
    async (address: string, provider: ethers.BrowserProvider) => {
      try {
        const ethBalanceWei = await provider.getBalance(address);
        const ethBalance = ethers.formatEther(ethBalanceWei);

        const usdtContract = new ethers.Contract(
          USDT_CONTRACT_ADDRESS,
          USDT_ABI,
          provider,
        );

        const usdtBalanceRaw = await usdtContract.balanceOf(address);
        const usdtBalance = ethers.formatUnits(usdtBalanceRaw, 6);

        setWallet((prev) => ({
          ...prev,
          ethBalance,
          usdtBalance,
          error: null,
        }));
      } catch (error) {
        console.error("Error fetching balances:", error);
        setWallet((prev) => ({
          ...prev,
          error: "Failed to fetch balances. Please try again.",
        }));
      }
    },
    [],
  );

  const handleAccountsChanged = useCallback(
    (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnect();
      } else {
        setWallet((prev) => ({ ...prev, address: accounts[0] }));
        const ethereum = window.ethereum;
        if (ethereum) {
          const provider = new ethers.BrowserProvider(ethereum);
          fetchBalances(accounts[0], provider);
        }
      }
    },
    [disconnect, fetchBalances],
  );

  const handleChainChanged = useCallback(() => {
    window.location.reload();
  }, []);

  const { getProvider, isInstalled } = useMetaMask(
    handleAccountsChanged,
    handleChainChanged,
  );

  const connect = useCallback(async () => {
    if (!isInstalled()) {
      setWallet((prev) => ({
        ...prev,
        error:
          "MetaMask is not installed. Please install MetaMask to continue.",
      }));
      return;
    }

    setWallet((prev) => ({ ...prev, isConnecting: true, error: null }));

    try {
      const ethereum = getProvider();
      if (!ethereum) return;

      const provider = new ethers.BrowserProvider(ethereum);

      const accounts = await provider.send("eth_requestAccounts", []);
      const address = accounts[0];

      const network = await provider.getNetwork();
      if (network.chainId !== 1n) {
        setWallet((prev) => ({
          ...prev,
          isConnecting: false,
          error: "Please switch to Ethereum Mainnet in MetaMask.",
        }));
        return;
      }

      setWallet((prev) => ({
        ...prev,
        address,
        isConnecting: false,
        error: null,
      }));

      await fetchBalances(address, provider);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to connect wallet. Please try again.";
      setWallet((prev) => ({
        ...prev,
        isConnecting: false,
        error: errorMessage,
      }));
    }
  }, [isInstalled, getProvider, fetchBalances]);

  return {
    ...wallet,
    connect,
    disconnect,
    isInstalled,
  };
}
