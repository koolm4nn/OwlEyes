"use client";

import { AddBankDesktop } from "@/components/Forms/Wrapper/AddBankDesktop";
import { AddBankModal } from "@/components/Forms/Wrapper/AddBankModal";
import { BanksGrid } from "@/components/Tables/BanksGrid/BanksGrid";
import { useBanksWithAccounts } from "@/hooks/useBankWithAccount";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

/**
 * Page for banks
 */

export default function Banks(){
    const {data: banks = [], isLoading, error } = useBanksWithAccounts();
    const [openModal, setOpenModal] = useState(false);

    if(isLoading) return <p>Is Loading...</p>;
    if(error) return <p>Error Loading Banks</p>

    return (
        <div className="p-4">
            {/* Desktop Collapsible Form */}
            <div className="hidden sm:block mb-6">
                    <AddBankDesktop />
            </div>

            {/* Banks Grid */}
            <BanksGrid banks={banks} />

            {/* Mobile Floating Action Button */}
            <button
                onClick={() => setOpenModal(true)}
                className="sm:hidden fixed bottom-4 right-4 p-4 bg-blue-900 active:bg-blue-950 rounded-full transition-transform duration-300"
            >
                <PlusIcon className={`h-6 w-6 text-white transform transition-transform duration-300 ${
                    openModal? "rotate-45" : "rotate-0"
                }`}
                />
            </button>

            {/* Mobile Modal */}
            <AddBankModal open={openModal} onClose={() => setOpenModal(false)}/>
        </div>
    )
}

