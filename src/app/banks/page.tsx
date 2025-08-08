"use client";

import { AddBankForm } from "@/components/AddBankForm";
import { BankList } from "@/components/BankList";

/**
 * Page for banks
 */

export default function Banks(){
    return (
        <div className="flex gap-8 p-6">
            <div className="w=1/2 border-r pr-4">
                <BankList />
            </div>
            <div className="w=1/2 pl-4">
                <AddBankForm />
            </div>
        </div>
    )
}

