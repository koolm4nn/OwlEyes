import {useQuery} from "@tanstack/react-query";
import { QUERY_KEYS } from "@/queryKeys";
import { BankWithAccounts } from "@/types";


async function fetchBanksDetails(): Promise<BankWithAccounts[]> {
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
    return useQuery<BankWithAccounts[]>({
        queryKey: QUERY_KEYS.banksWithAccounts(),
        queryFn: fetchBanksDetails,
        refetchOnWindowFocus: false
    })
}