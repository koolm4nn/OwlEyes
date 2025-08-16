import { BalanceWithMetaData } from "@/types";
/**
 * API layer exposing REST calls for balances.
 */

/**
 * Fetches all balances
 * 
 * @returns {BalanceWithMetaData[]} an array of balances
 * @throws {Error} if the request fails
 */
export async function fetchBalances(): Promise<BalanceWithMetaData[]>{
    const res = await fetch("/api/balances");
    if(!res.ok) throw new Error("Failed to fetch balances");
    return res.json();
}

/**
 * Adds a balance for an account.
 * 
 * @param {number} amount - Amount to be added
 * @param {number} accountId - Account linked to the amount
 * @returns {Promise<{insertedId: number}>} Reponse containing the id of the created balance
 * @throws {Error} if request fails
 */
export async function createBalance(amount: number, accountId: number, timestamp: number): Promise<{insertedId: number}>{
  const res = await fetch("/api/balances", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, accountId, timestamp}),
  });
  if (!res.ok) throw new Error("Failed to create balance");
  return res.json();
}

// update, delete, ..