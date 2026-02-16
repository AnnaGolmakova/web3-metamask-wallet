import { useState, useEffect, useCallback } from "react";
import { ethers, type Eip1193Provider } from "ethers";
import { WalletInfo } from "./components/WalletInfo";
import { ErrorMessage } from "./components/ErrorMessage";
import { ConnectWallet } from "./components/ConnectWallet";
import "./App.css";

// Extend the Eip1193Provider interface to include event methods
interface MetaMaskProvider extends Eip1193Provider {
  on(event: string, callback: (accounts: string[]) => void): void;
  on(event: "chainChanged", callback: () => void): void;
  removeListener(event: string, callback: (accounts: string[]) => void): void;
  removeListener(event: "chainChanged", callback: () => void): void;
}

// USDT contract address on Ethereum Mainnet
const USDT_CONTRACT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

// USDT ABI (only the balanceOf function we need)
const USDT_ABI = [
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

interface WalletState {
  address: string | null;
  ethBalance: string | null;
  usdtBalance: string | null;
  error: string | null;
}

function App() {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    ethBalance: null,
    usdtBalance: null,
    error: null,
  });

  // Get ethereum provider with type safety
  const getEthereumProvider = (): MetaMaskProvider | null => {
    return window.ethereum as MetaMaskProvider | null;
  };

  // Fetch balances
  const fetchBalances = useCallback(async (address: string) => {
    try {
      const ethereum = getEthereumProvider();
      if (!ethereum) return;

      const provider = new ethers.BrowserProvider(ethereum);

      // Get ETH balance
      const ethBalanceWei = await provider.getBalance(address);
      const ethBalance = ethers.formatEther(ethBalanceWei);

      // Get USDT balance
      const usdtContract = new ethers.Contract(
        USDT_CONTRACT_ADDRESS,
        USDT_ABI,
        provider,
      );

      const usdtBalanceRaw = await usdtContract.balanceOf(address);
      // USDT has 6 decimals
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
  }, []);

  // Handle wallet connection
  const handleConnect = async (address: string) => {
    setWallet((prev) => ({
      ...prev,
      address,
      error: null,
    }));

    // Fetch balances
    await fetchBalances(address);
  };

  // Handle connection errors
  const handleError = (error: string) => {
    setWallet((prev) => ({
      ...prev,
      error,
    }));
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setWallet({
      address: null,
      ethBalance: null,
      usdtBalance: null,
      error: null,
    });
  };

  // Listen for account changes
  useEffect(() => {
    const ethereum = getEthereumProvider();
    if (!ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else if (accounts[0] !== wallet.address) {
        setWallet((prev) => ({ ...prev, address: accounts[0] }));
        fetchBalances(accounts[0]);
      }
    };

    const handleChainChanged = () => {
      window.location.reload();
    };

    ethereum.on("accountsChanged", handleAccountsChanged);
    ethereum.on("chainChanged", handleChainChanged);

    return () => {
      ethereum.removeListener("accountsChanged", handleAccountsChanged);
      ethereum.removeListener("chainChanged", handleChainChanged);
    };
  }, [wallet.address, fetchBalances]);

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1 className="title">Web3 Wallet</h1>
          <p className="subtitle">
            Connect your MetaMask wallet to view your balances
          </p>
        </header>

        <main className="main">
          {!wallet.address ? (
            <ConnectWallet onConnect={handleConnect} onError={handleError} />
          ) : (
            <WalletInfo
              address={wallet.address}
              ethBalance={wallet.ethBalance}
              usdtBalance={wallet.usdtBalance}
              onDisconnect={disconnectWallet}
            />
          )}

          {wallet.error && <ErrorMessage message={wallet.error} />}
        </main>

        <footer className="footer">
          <p className="network-info">Network: Ethereum Mainnet</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
