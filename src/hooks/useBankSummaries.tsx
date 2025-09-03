import { useQuery } from "@tanstack/react-query";

export function useBankSummary() {
  return useQuery({
    queryKey: ["bankSummary"],
    queryFn: async () => {
      const res = await fetch("/api/banks/summary");
      if (!res.ok) throw new Error("Failed to fetch bank summary");
      return res.json();
    },
  });
}