"use client";

import { AddBankForm } from "@/components/AddBankForm";
import { BanksTable } from "@/components/Tables/BanksTable/BanksTable";
import { useBanksWithAccounts } from "@/hooks/useBankWithAccount";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

/**
 * Page for banks
 */

type fabProps = {
    open: boolean,
    setOpen: (v:boolean) => void
}
function OpenFormFab({open, setOpen}: fabProps){
    return (
        <div>
            <button
                onClick={() => setOpen(true)}
                className={`${open? "hidden" : ""} sm:hidden fixed bottom-4 right-4 p-4 rounded-full bg-blue-800 text-white shadow-lg`}
            >
                <PlusIcon className="h-6 w-6"/>
            </button>
        </div>
    )
}

type ModalProps = {
    setOpen: (v: boolean) => void
}
function FormModal({ setOpen }: ModalProps){
    return (
        <div className="sm:hidden fixed inset-0 bg-stone-900/80 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-11/12 max-w-sm">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Add Bank</h2>
                    <button 
                        onClick={() => setOpen(false)}
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                </div>
                <input
                    type="text"
                    placeholder="Bank Name"
                    className="w-full p-2 border rounded mb-2"
                />
                <button className="px-4 py-2 bg-green-600 text-white rounded w-full">
                    Save
                </button>
            </div>
        </div>
    )
}

export default function Banks(){
    const {data: banks = [], isLoading, error } = useBanksWithAccounts();
    const [open, setOpen] = useState(false);

    if(isLoading) return <p>Is Loading...</p>;
    if(error) return <p>Error Loading Banks</p>

    return (
        <div className="flex justify-center mt-5 sm:mt-0">
            <div className="w-full">
                <div className="hidden sm:block">
                    <AddBankForm />
                </div>
                <BanksTable banks={banks} />
                <OpenFormFab open={open} setOpen={setOpen} />
                {open && <FormModal setOpen={setOpen}/>}
            </div>
        </div>
    )
}

