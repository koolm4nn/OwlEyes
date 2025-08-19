import {useQuery, useMutation, useQueryClient, UseMutationOptions} from "@tanstack/react-query";
import { fetchBanks, createBank, existsBank, fetchBanksIncludingAccounts } from "@/app/api/bankApi";
import { QUERY_KEYS } from "@/queryKeys";


/**
 * React query hook to fetch all banks.
 * 
 * Automatically caches result to "banks" query key.
 * 
 * Options:
 *  - 'staleTime': data remains fresh for 2 minutes
 *  - 'refetchonWindowFocus': disabled to avoid refetching
 * 
 * @returns the return of the query including status, data, error, etc.
 */
export function useBanks(){
    return useQuery({
        queryKey: QUERY_KEYS.banks(),
        queryFn: fetchBanks,
        staleTime: 1000 * 60 * 2,
        refetchOnWindowFocus: false
    });
}

/**
 * React query hook to check if bank name exists
 * 
 * No chaches are made.
 * 
 * @returns the 
 */
export function useExistsBank(){
  return useMutation({
    mutationFn: ({name}: {name: string}) => existsBank(name)
  })
}

/**
 * React Query hook to create a new bank.
 * 
 * Wraps the 'createBank' API function inside a mutation.
 * Automatically invalidates the 'banks' cache to refresh the data after success.
 * 
 * @param options Optional React Query mutation options (e.g. onSuccess, onError handlers)
 * 
 * Mutation payload:
 * - 'name': name to check (string)
 * 
 * @returns The mutation object with 'mutate', 'status', 'data', 'error', etc.
 */
export function useCreateBank(options?: UseMutationOptions<
  {insertedId: number}, // Return type
  Error, // Error type: unkown | Error
  { name: string} // variable type
  >
) {
  const queryClient = useQueryClient();
  return useMutation({
    ...options, // Spread options: keep "old" onSuccess
    mutationFn: ({name}: {name: string}) => 
        createBank(name),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.banks() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.banksWithAccounts() });
      if(options?.onSuccess) options.onSuccess(data, variables, context);
    }
  });
}