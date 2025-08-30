import { Bank, BankWithAccounts } from "@/types";

/**
 * API layer exposing REST calls for banks.
 */

/**
 * Fetches all banks.
 * 
 * @returns {Promise<Bank[]>} Promise with an array of banks
 * @throws {Error} if the request fails
 */
export async function fetchBanks(): Promise<Bank[]>{
    const res = await fetch("/api/banks");
    if(!res.ok) throw new Error("Failed to fetch banks.");
    return res.json();
}

/**
 * Fetches all banks and their accounts.
 * 
 * @returns {Promise<BankWithAccounts[]>} Promise with an array of banks including accounts
 * @throws {Error} if the request fails
 */
export async function fetchBanksIncludingAccounts(): Promise<BankWithAccounts[]>{
  const res = await fetch("api/bank/with-accounts");
    if(!res.ok) throw new Error("Failed to fetch banks including accounts.");
    return res.json();
}

/**
 * Creates a new bank.
 * 
 * @param {string} name - name of the bank 
 * @returns {Promise<{insertedId: number}>} Response with the id of the inserted bank
 * @throws {Error} if request fails
 */
export async function createBank(name: string): Promise<{insertedId: number}>{
  const res = await fetch("/api/banks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("Failed to create bank.");
  return res.json();
}

export async function deleteBank(id : number): Promise<{success: boolean}>{
  const res = await fetch(`/api/banks/${id}`, {method: "DELETE"});

  if (!res.ok) throw new Error("Failed to delete bank.");
  return res.json();
}

/**
 * Checks if bank exists
 * 
 * @param {string} name - name to check 
 * @returns {Promise<{exists: boolean}>} Promise containing whether bank with name exists
 * @throws {Error} if request fails
 */
export async function existsBank(name: string): Promise<{exists: boolean}>{
  const res = await fetch(`/api/banks/exists?name=${encodeURIComponent(name)}`);
  if(!res.ok) throw new Error("Failed to lookup bank existence.");
  const result = res.json();
  return result;
}

// update, delete, ..