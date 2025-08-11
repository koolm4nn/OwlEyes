"use client"

import { AddAccountForm } from "@/components/Forms/AddAccountForm";
import { AccountsTable } from "@/components/Tables/AccountsTable/AccountsTable";
import { useAccounts } from "@/hooks/useAccount";

/*
 * Page for the accounts 
 */

export default function Accounts(){
    const {data: accounts = [], isLoading, error } = useAccounts();

    if(isLoading) return <p>Is Loading...</p>;
    if(error) return <p>Error Loading Accounts</p>

    return (
        <div className="flex justify-center px-12 py-8">
            <div className="flex w-full max-w-6xl gap-8">
                <div className="basis-[60%] border-r pr-6">
                    <AccountsTable accounts={accounts} />
                </div>
                <div className="basis-[40%] pl-6">
                    <AddAccountForm />
                </div>
            </div>
        </div>
    )
}