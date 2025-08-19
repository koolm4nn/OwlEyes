import {useQuery} from "@tanstack/react-query";
import { QUERY_KEYS } from "@/queryKeys";
import { BankIncludingAccounts } from "@/types";


async function fetchBanksDetails(): Promise<BankIncludingAccounts[]> {
    console.log("Fetching.");
    const res = await fetch("api/banks/with-accounts");
    if(!res.ok) throw new Error("Failed to fetch banks with details.");
    return res.json();
}

/**
 * Hook to fetch banks including their associated accounts.
 * 
 * Options:
 *  - 'refetchonWindowFocus': disabled to avoid refetching
 * 
 * @returns the return of the query including status, data, error, etc.
 */
export function useBanksWithAccounts() {
    return useQuery<BankIncludingAccounts[]>({
        queryKey: [QUERY_KEYS.banks, QUERY_KEYS.accounts, QUERY_KEYS.balances],
        queryFn: fetchBanksDetails,
        refetchOnWindowFocus: false
    })
}