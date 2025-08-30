import { XCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { AddBankForm } from "../AddBankForm";

export function AddBankDesktop() {
    const [open, setOpen] = useState(false);
    return (
        <div className='hidden sm:block m-2 p-2 rounded-lg bg-neutral-200'>
            {
                !open ? (
                    <button 
                        className="px-3 py-1 border bg-blue-900 rounded text-white"
                        onClick={() => setOpen(true)}
                    >
                        New Bank
                    </button>
                ) : (
                    <>
                        <div className="flex justify-between mb-2 mx-3">
                            <p>Creating New Bank</p>
                            <XCircleIcon 
                                className="size-6 text-neutral-500 hover:text-neutral-950 cursor-pointer"
                                onClick={() => setOpen(false)}
                            />
                        </div>
                        <AddBankForm onSuccess={() => setOpen(false)} />
                    </>
                )}
        </div>
    );
}