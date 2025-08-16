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
        <div className="flex justify-center px-12 py-8">
            <div className="flex w-full max-w-6xl gap-8">
                <div className="basis-[60%] pr-6">
                    <BanksTable banks={banks} />
                </div>
                <div className="basis-[40%] pl-6">
                    <AddBankForm />
                </div>
            </div>
        </div>
    )
}

