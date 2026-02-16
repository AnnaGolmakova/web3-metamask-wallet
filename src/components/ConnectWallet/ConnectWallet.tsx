import { useState } from "react";
import { ethers, type Eip1193Provider } from "ethers";
import WalletIcon from "../../assets/wallet-icon.svg";
import "./ConnectWallet.css";

// Extend the Eip1193Provider interface to include event methods
interface MetaMaskProvider extends Eip1193Provider {
  on(event: string, callback: (accounts: string[]) => void): void;
  on(event: "chainChanged", callback: () => void): void;
  removeListener(event: string, callback: (accounts: string[]) => void): void;
  removeListener(event: "chainChanged", callback: () => void): void;
}

interface ConnectWalletProps {
  onConnect: (address: string) => void;
  onError: (error: string) => void;
}

export function ConnectWallet({ onConnect, onError }: ConnectWalletProps) {
  const [isConnecting, setIsConnecting] = useState(false);

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window.ethereum !== "undefined";
  };

  // Get ethereum provider with type safety
  const getEthereumProvider = (): MetaMaskProvider | null => {
    return window.ethereum as MetaMaskProvider | null;
  };

  // Connect wallet
  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      onError(
        "MetaMask is not installed. Please install MetaMask to continue."
      );
      return;
    }

    setIsConnecting(true);
    onError(""); // Clear any previous errors

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
        setIsConnecting(false);
        onError("Please switch to Ethereum Mainnet in MetaMask.");
        return;
      }

      setIsConnecting(false);
      onConnect(address);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to connect wallet. Please try again.";
      setIsConnecting(false);
      onError(errorMessage);
    }
  };

  return (
    <div className="connect-section">
      <div className="wallet-icon">
        <img src={WalletIcon} alt="Wallet" />
      </div>
      <button
        className="connect-button"
        onClick={connectWallet}
        disabled={isConnecting}
      >
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </button>
      {!isMetaMaskInstalled() && (
        <p className="info-text">
          Don't have MetaMask?{" "}
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
  );
}
