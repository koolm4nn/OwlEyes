"use client";

import { AddBankForm } from "@/components/AddBankForm";
import { BanksTable } from "@/components/Tables/BanksTable/BanksTable";
import { useBanks } from "@/hooks/useBank";

/**
 * Page for banks
 */

export default function Banks(){
    const {data: banks = [], isLoading, error } = useBanks();

    if(isLoading) return <p>Is Loading...</p>;
    if(error) return <p>Error Loading Banks</p>

    return (
        <div className="flex gap-8 p-6">
            <div className="w=1/2 border-r pr-4">
                <BanksTable banks={banks} />
            </div>
            <div className="w=1/2 pl-4">
                <AddBankForm />
            </div>
        </div>
    )
}

