import {useQuery, useMutation, useQueryClient, UseMutationOptions} from "@tanstack/react-query";
import { fetchBalances, createBalance } from "@/app/api/balanceApi";
import { QUERY_KEYS } from "@/queryKeys";
import { timeStamp } from "console";

/**
 * React query hook to fetch all balances.
 * 
 * Automatically caches result to "balances" query key.
 * 
 * Options:
 *  - 'staleTime': data remains fresh for 2 minutes
 *  - 'refetchonWindowFocus': disabled to avoid refetching
 * 
 * @returns the return of the query including status, data, error, etc.
 */
export function useBalances(){
    return useQuery({
        queryKey: QUERY_KEYS.balances(),
        queryFn: fetchBalances,
        staleTime: 1000 * 60 * 2,
        refetchOnWindowFocus: false
    });
}

/**
 * React Query hook to create a new balance.
 * 
 * Wraps the 'createBalance' API function inside a mutation.
 * Automatically invalidates the 'balances' cache to refresh the data after success.
 * 
 * @param options Optional React Query mutation options (e.g. onSuccess, onError handlers)
 * 
 * Mutation payload:
 * - 'number': amount of the balance (number)
 * - 'accountId': ID of the associated bank (number)
 * 
 * @returns The mutation object with 'mutate', 'status', 'data', 'error', etc.
 */
export function useCreateBalance(options?: UseMutationOptions<
  {insertedId: number},
  Error,
  { amount: number, accountId: number, timestamp?: number}
  >
) {
  const queryClient = useQueryClient();
  return useMutation({
    ...options, // Keep option when adding, e.g. onSuccess
    mutationFn: ({amount, accountId, timestamp}: {amount: number, accountId: number, timestamp: number}) => 
        createBalance(amount, accountId, timestamp),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.balances() });
      if(options?.onSuccess) options.onSuccess(data, variables, context);
    }
  });
}