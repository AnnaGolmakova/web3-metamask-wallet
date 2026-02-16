import { BalanceCard } from "../BalanceCard";
import "./WalletInfo.css";

interface WalletInfoProps {
  address: string;
  ethBalance: string | null;
  usdtBalance: string | null;
  onDisconnect: () => void;
}

export function WalletInfo({
  address,
  ethBalance,
  usdtBalance,
  onDisconnect,
}: WalletInfoProps) {
  return (
    <div className="wallet-section">
      <div className="wallet-info">
        <div className="address-card">
          <label className="label">Connected Address</label>
          <div className="address">
            {address.slice(0, 6)}...{address.slice(-4)}
          </div>
        </div>

        <div className="balances">
          <BalanceCard
            label="Ethereum Balance"
            balance={ethBalance}
            unit="ETH"
            decimals={6}
            tokenIcon="ETH"
            iconClassName="eth-icon"
          />

          <BalanceCard
            label="USDT Balance"
            balance={usdtBalance}
            unit="USDT"
            decimals={2}
            tokenIcon="USDT"
            iconClassName="usdt-icon"
          />
        </div>

        <button className="disconnect-button" onClick={onDisconnect}>
          Disconnect Wallet
        </button>
      </div>
    </div>
  );
}
