import {useQuery, useMutation, useQueryClient, UseMutationOptions} from "@tanstack/react-query";
import { fetchAccounts, createAccount } from "@/app/api/accountApi";
import {QUERY_KEYS} from "@/queryKeys";
import { deleteBank } from "@/app/api/bankApi";

/**
 * React query hook to fetch all accounts.
 * 
 * Automatically caches result to "accounts" query key.
 * 
 * Options:
 *  - 'staleTime': data remains fresh for 2 minutes
 *  - 'refetchonWindowFocus': disabled to avoid refetching
 * 
 * @returns the return of the query including status, data, error, etc.
 */
export function useAccounts(){
    return useQuery({
        queryKey: QUERY_KEYS.accounts(),
        queryFn: fetchAccounts,
        staleTime: 1000 * 60 * 2,
        refetchOnWindowFocus: false
    });
}

/**
 * React Query hook to create a new account.
 * 
 * Wraps the 'createAccount' API function inside a mutation.
 * Automatically invalidates the 'accounts' cache to refresh the data after success.
 * 
 * @param options Optional React Query mutation options (e.g. onSuccess, onError handlers)
 * 
 * Mutation payload:
 * - 'name': name of the account (string)
 * - 'bankId': ID of the associated bank (number)
 * 
 * @returns The mutation object with 'mutate', 'status', 'data', 'error', etc.
 */
export function useCreateAccount(options?: UseMutationOptions<
  {insertedId: number},
  Error,
  { name: string, bankId: number }
  >
) {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: ({name, bankId}: {name: string, bankId: number}) => 
        createAccount(name, bankId),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.accounts() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.banksWithAccounts() });
      if(options?.onSuccess) options.onSuccess(data, variables, context)
    },
  });
}


/**
 * 
 * @param options 
 * @returns 
 */
export function useDeleteAccount(options?: UseMutationOptions<
  {success: boolean}, // Return type
  Error, // Error type: unkown | Error
  { id: number} // variable type
  >
) {
  const queryClient = useQueryClient();
  return useMutation({
    ...options, // Spread options: keep "old" onSuccess
    mutationFn: ({id}: {id: number}) => 
        deleteBank(id),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.accounts() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.banksWithAccounts() });
      if(options?.onSuccess) options.onSuccess(data, variables, context);
    }
  });
}