/**
 * Formats a balance string to a fixed number of decimal places
 * @param balance - The balance string to format (can be null)
 * @param decimals - Number of decimal places to display
 * @returns Formatted balance string with specified decimals
 */
export function formatBalance(balance: string | null, decimals: number): string {
  if (!balance) {
    return "0.".padEnd(decimals + 2, "0");
  }

  return parseFloat(balance).toFixed(decimals);
}
