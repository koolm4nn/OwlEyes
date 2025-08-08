import { Balance } from "@/types";
/**
 * API layer exposing REST calls for balances.
 */

/**
 * Fetches all balances
 * 
 * @returns {Balance[]} an array of balances
 * @throws {Error} if the request fails
 */
export async function fetchBalances(): Promise<Balance[]>{
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
export async function createBalance(amount: number, accountId: number): Promise<{insertedId: number}>{
  const res = await fetch("/api/balances", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, accountId }),
  });
  if (!res.ok) throw new Error("Failed to create balance");
  return res.json();
}

// update, delete, ..