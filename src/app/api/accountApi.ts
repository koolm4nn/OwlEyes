import { AccountWithBank } from "@/types";
/**
 * API layer exposing REST calls for accounts.
 */


/**
 * Fetches all accounts.
 * 
 * @returns {Promise<Account[]>} an array of all account objects
 * @throws {Error} if the request fails
 */
export async function fetchAccounts(): Promise<AccountWithBank[]>{
    const res = await fetch("/api/accounts");
    if(!res.ok) throw new Error("Failed to fetch accounts.");
    return res.json();
}

/**
 * Creates a new account linked to a bank.
 * 
 * @param {string} name  - The name of the account
 * @param {number} bankId - The id of the bank the account belongs to
 * @returns {Promise<{insertedId: number}>} The response from the API containing the inserted id
 * @throws {Error} If the request fails
 */
export async function createAccount(name: string, bankId: number): Promise<{ insertedId: number; }>{
  const res = await fetch("/api/accounts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, bankId }),
  });
  if (!res.ok) throw new Error("Failed to create account.");
  return res.json();
}

/**
 * Deletes an account by id
 * 
 * @param {number} id - the id of the account 
 * @returns {Promise<{success: boolean}>} The response from the API containing if the deletion was successful
 * @throws {Error} If the request fails
 */
export async function deleteAccount(id : number): Promise<{success: boolean}>{
  const res = await fetch(`/api/accounts/${id}`, {method: "DELETE"});

  if (!res.ok) throw new Error("Failed to delete account.");
  return res.json();
}

// update, delete, ..