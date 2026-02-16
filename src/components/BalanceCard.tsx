import { formatBalance } from "../utils/formatBalance";

interface BalanceCardProps {
  label: string;
  balance: string | null;
  unit: string;
  decimals: number;
  tokenIcon: string;
  iconClassName: string;
}

export function BalanceCard({
  label,
  balance,
  unit,
  decimals,
  tokenIcon,
  iconClassName,
}: BalanceCardProps) {
  const formattedBalance = formatBalance(balance, decimals);

  return (
    <div className="balance-card">
      <div className="balance-header">
        <span className="balance-label">{label}</span>
        <div className={`token-icon ${iconClassName}`}>{tokenIcon}</div>
      </div>
      <div className="balance-amount">
        {formattedBalance}
        <span className="balance-unit">{unit}</span>
      </div>
    </div>
  );
}
