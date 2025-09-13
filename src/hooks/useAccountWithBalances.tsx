import { useQuery } from "@tanstack/react-query";

export function useAccountWithBalances() {
  return useQuery({
    queryKey: ["accountWithBalances"],
    queryFn: async () => {
      const res = await fetch("/api/accounts/with-balances");
      if (!res.ok) throw new Error("Failed to fetch accounts with balances");
      return res.json();
    },
  });
}