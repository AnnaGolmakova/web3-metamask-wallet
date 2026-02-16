import { useEffect } from "react";
import { type Eip1193Provider } from "ethers";

interface MetaMaskProvider extends Eip1193Provider {
  on(event: string, callback: (accounts: string[]) => void): void;
  on(event: "chainChanged", callback: () => void): void;
  removeListener(event: string, callback: (accounts: string[]) => void): void;
  removeListener(event: "chainChanged", callback: () => void): void;
}

export function useMetaMask(
  onAccountsChanged: (accounts: string[]) => void,
  onChainChanged: () => void
) {
  const getProvider = (): MetaMaskProvider | null => {
    return window.ethereum as MetaMaskProvider | null;
  };

  const isInstalled = () => {
    return typeof window.ethereum !== "undefined";
  };

  useEffect(() => {
    const provider = getProvider();
    if (!provider) return;

    provider.on("accountsChanged", onAccountsChanged);
    provider.on("chainChanged", onChainChanged);

    return () => {
      provider.removeListener("accountsChanged", onAccountsChanged);
      provider.removeListener("chainChanged", onChainChanged);
    };
  }, [onAccountsChanged, onChainChanged]);

  return { getProvider, isInstalled };
}
