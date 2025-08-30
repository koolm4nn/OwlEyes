import AccountCard from "@/components/Cards/AccountCard";
import { useDeleteAccount } from "@/hooks/useAccount";
import { AccountWithBank } from "@/types";
import { useState } from "react";


export function AccountsGrid({ accounts }: {accounts: AccountWithBank[]}){
    const [accountToDelete, setAccountToDelete] = useState<AccountWithBank | null>(null);
    const [selectedAccount, setSelectedAccount] = useState<AccountWithBank | null>(null);

    const { mutate: deleteAccount, isPending, isError, error } = useDeleteAccount({
        onSuccess: () => {
            console.log("Account deleted successfully!");
        },
        onError: (err) => {
            console.error("Failed to delete Account:", err);
        }
    });

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 rounded-sm gap-2 sm:gap-4 sm:p-2">
            {accounts.map((account) => (
                <AccountCard 
                    key={account.id}
                    account={account}
                    selected={selectedAccount === account}
                    selectedForDeletion={accountToDelete === account}
                    onSelect={() => {
                        if(account !== selectedAccount){
                            setAccountToDelete(null);
                            setSelectedAccount(account);
                        }
                    }}
                    onToggleDelete={() => {
                        setSelectedAccount(account);
                        setAccountToDelete(accountToDelete === account? null : account);
                    }}
                    onDelete={() => {
                        deleteAccount({ id: account.id })
                    }}
                />
            ))}
        </div>
    );
}