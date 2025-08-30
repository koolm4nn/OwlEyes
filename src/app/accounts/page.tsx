"use client";

import { AddAccountDesktop } from "@/components/Forms/Wrapper/AddAccountDesktop";
import { AddAccountModal } from "@/components/Forms/Wrapper/AddAccountModal";
import { AccountsGrid } from "@/components/Tables/AccountsTable/AccountsGrid";
import { useAccounts } from "@/hooks/useAccount";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

/**
 * Page for accounts
 */
export default function Accounts(){
    const {data: accounts = [], isLoading, error } = useAccounts();
    const [openModal, setOpenModal] = useState(false);

    if(isLoading) return <p>Is Loading...</p>;
    if(error) return <p>Error Loading Accounts</p>

    return (
        <div className="p-4">
            {/* Desktop Collapsible Form */}
            <div className="hidden sm:block mb-6">
                    <AddAccountDesktop />
            </div>

            {/* Accounts Grid */}
            <AccountsGrid accounts={accounts} />

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
            <AddAccountModal open={openModal} onClose={() => setOpenModal(false)}/>
        </div>
    )
}

