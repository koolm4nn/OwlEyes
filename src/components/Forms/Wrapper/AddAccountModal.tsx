import { XMarkIcon } from "@heroicons/react/24/outline";
import { AddAccountForm } from "../AddAccountForm";

export function AddAccountModal({open, onClose}: {open: boolean, onClose: () => void }){
    if(!open) return null;

    return (
        <div 
            className="sm:hidden fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={onClose}
            >
            <div 
                className="bg-white rounded-lg p-6 w-11/12 max-w-sm"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Add Account</h2>
                    <button 
                        onClick={onClose}
                    >
                        <XMarkIcon className="h-5 w-5 text-gray-700 active:text-gray-900"/>
                    </button>
                </div>
                <AddAccountForm onSuccess={onClose} />
            </div>
        </div>
    )

}