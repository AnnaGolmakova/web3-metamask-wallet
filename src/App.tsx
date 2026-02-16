import { useWallet } from "./hooks/useWallet";
import { WalletInfo } from "./components/WalletInfo";
import { ErrorMessage } from "./components/ErrorMessage";
import { ConnectWallet } from "./components/ConnectWallet";
import "./App.css";

function App() {
  const {
    address,
    ethBalance,
    usdtBalance,
    error,
    isConnecting,
    connect,
    disconnect,
    isInstalled,
  } = useWallet();

  const handleConnect = () => {
    connect();
  };

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
          {!address ? (
            <ConnectWallet
              onConnect={handleConnect}
              isConnecting={isConnecting}
              isInstalled={isInstalled()}
            />
          ) : (
            <WalletInfo
              address={address}
              ethBalance={ethBalance}
              usdtBalance={usdtBalance}
              onDisconnect={disconnect}
            />
          )}

          {error && <ErrorMessage message={error} />}
        </main>

        <footer className="footer">
          <p className="network-info">Network: Ethereum Mainnet</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
