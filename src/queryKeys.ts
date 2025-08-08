/**
 * Centralized definition of query keys used with React Query to avoid typos and mismatches across app/consistency.
 * 
 * e.g., '() => ["accounts"]'
 * 
 * The 'as const' ensures that the key is typed as a readonly tuple
 */
export const QUERY_KEYS = {
  accounts: () => ["accounts"] as const,
  accountById: (id: number) => ["accounts", id] as const,
  banks: () => ["banks"] as const,
  balances: () => ["balances"] as const,
};