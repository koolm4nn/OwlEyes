"use client"

import { AddBalanceForm } from "@/components/Forms/AddBalanceForm";
import { BalancesTable } from "@/components/Tables/BalancesTable/BalancesTable";
import { useBalances } from "@/hooks/useBalance";

/*
 * Page for the accounts 
 */

export default function Balances(){
    const {data: balances = [], isLoading, error } = useBalances();

    if(isLoading) return <p>Is Loading...</p>;
    if(error) return <p>Error Loading Balances</p>

    return (
        <div className="flex justify-center px-12 py-8">
            <div className="flex w-full max-w-6xl gap-8">
                <div className="basis-[60%] border-r pr-6">
                    <BalancesTable balances={balances} />
                </div>
                <div className="basis-[40%] pl-6">
                    <AddBalanceForm />
                </div>
            </div>
        </div>
    )
}