"use client";

import { AddBankForm } from "@/components/AddBankForm";
import { BanksTable } from "@/components/Tables/BanksTable/BanksTable";
import { useBanksWithAccounts } from "@/hooks/useBankWithAccount";

/**
 * Page for banks
 */

export default function Banks(){
    const {data: banks = [], isLoading, error } = useBanksWithAccounts();

    if(isLoading) return <p>Is Loading...</p>;
    if(error) return <p>Error Loading Banks</p>

    return (
        <div className="flex justify-center">
            <div className="flex w-full">
                <div className="basis-[60%]">
                    <AddBankForm />
                    <BanksTable banks={banks} />
                </div>
                <div className="basis-[40%]">
                </div>
            </div>
        </div>
    )
}

