import { useState, useEffect, useCallback } from "react";
import { ethers, type Eip1193Provider } from "ethers";
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
  isConnecting: boolean;
  error: string | null;
}

function App() {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    ethBalance: null,
    usdtBalance: null,
    isConnecting: false,
    error: null,
  });

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window.ethereum !== "undefined";
  };

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

  // Connect wallet
  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      setWallet((prev) => ({
        ...prev,
        error:
          "MetaMask is not installed. Please install MetaMask to continue.",
      }));
      return;
    }

    setWallet((prev) => ({ ...prev, isConnecting: true, error: null }));

    try {
      const ethereum = getEthereumProvider();
      if (!ethereum) return;

      const provider = new ethers.BrowserProvider(ethereum);

      // Request account access
      const accounts = await provider.send("eth_requestAccounts", []);
      const address = accounts[0];

      // Check if we're on Ethereum Mainnet (chainId: 1)
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
      }));

      // Fetch balances
      await fetchBalances(address);
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
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setWallet({
      address: null,
      ethBalance: null,
      usdtBalance: null,
      isConnecting: false,
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
            <div className="connect-section">
              <div className="wallet-icon">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M60 30H20C17.2386 30 15 32.2386 15 35V60C15 62.7614 17.2386 65 20 65H60C62.7614 65 65 62.7614 65 60V35C65 32.2386 62.7614 30 60 30Z"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 40H65"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 30V25C20 22.3478 21.0536 19.8043 22.9289 17.9289C24.8043 16.0536 27.3478 15 30 15H50C52.6522 15 55.1957 16.0536 57.0711 17.9289C58.9464 19.8043 60 22.3478 60 25V30"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="52" cy="52" r="3" fill="currentColor" />
                </svg>
              </div>
              <button
                className="connect-button"
                onClick={connectWallet}
                disabled={wallet.isConnecting}
              >
                {wallet.isConnecting ? "Connecting..." : "Connect Wallet"}
              </button>
              {!isMetaMaskInstalled() && (
                <p className="info-text">
                  Don't have MetaMask?
                  <a
                    href="https://metamask.io/download/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    Install it here
                  </a>
                </p>
              )}
            </div>
          ) : (
            <div className="wallet-section">
              <div className="wallet-info">
                <div className="address-card">
                  <label className="label">Connected Address</label>
                  <div className="address">
                    {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                  </div>
                </div>

                <div className="balances">
                  <div className="balance-card">
                    <div className="balance-header">
                      <span className="balance-label">Ethereum Balance</span>
                      <div className="token-icon eth-icon">ETH</div>
                    </div>
                    <div className="balance-amount">
                      {wallet.ethBalance
                        ? parseFloat(wallet.ethBalance).toFixed(6)
                        : "0.000000"}
                      <span className="balance-unit">ETH</span>
                    </div>
                  </div>

                  <div className="balance-card">
                    <div className="balance-header">
                      <span className="balance-label">USDT Balance</span>
                      <div className="token-icon usdt-icon">USDT</div>
                    </div>
                    <div className="balance-amount">
                      {wallet.usdtBalance
                        ? parseFloat(wallet.usdtBalance).toFixed(2)
                        : "0.00"}
                      <span className="balance-unit">USDT</span>
                    </div>
                  </div>
                </div>

                <button
                  className="disconnect-button"
                  onClick={disconnectWallet}
                >
                  Disconnect Wallet
                </button>
              </div>
            </div>
          )}

          {wallet.error && (
            <div className="error-message">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 6V10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 14H10.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{wallet.error}</span>
            </div>
          )}
        </main>

        <footer className="footer">
          <p className="network-info">Network: Ethereum Mainnet</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
