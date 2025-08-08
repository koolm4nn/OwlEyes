import { Bank } from "@/types";

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

/**
 * Checks if bank exists
 * 
 * @param {string} name - name to check 
 * @returns {Promise<{exists: boolean}>} Promise containing whether bank with name exists
 * @throws {Error} if request fails
 */
export async function existsBank(name: string): Promise<{exists: boolean}>{
  console.log("Checking if bank exists:", name);
  const res = await fetch(`/api/banks/exists?name=${encodeURIComponent(name)}`);
  if(!res.ok) throw new Error("Failed to lookup bank existence.");
  const result = res.json();
  console.log("Bank exists?");
  console.log(result);
  return result;
}

// update, delete, ..