import WalletIcon from "../../assets/wallet-icon.svg";
import "./ConnectWallet.css";

interface ConnectWalletProps {
  onConnect: () => void;
  isConnecting: boolean;
  isInstalled: boolean;
}

export function ConnectWallet({
  onConnect,
  isConnecting,
  isInstalled,
}: ConnectWalletProps) {
  return (
    <div className="connect-section">
      <div className="wallet-icon">
        <img src={WalletIcon} alt="Wallet" />
      </div>
      <button
        className="connect-button"
        onClick={onConnect}
        disabled={isConnecting}
      >
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </button>
      {!isInstalled && (
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
