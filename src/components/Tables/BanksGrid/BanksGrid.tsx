import BankCard from "@/components/Cards/BankCard";
import { useDeleteBank } from "@/hooks/useBank";
import { BankWithAccounts } from "@/types";
import { useState } from "react";


export function BanksGrid({ banks }: {banks: BankWithAccounts[]}){
    const [bankToDelete, setBankToDelete] = useState<BankWithAccounts | null>(null);
    const [selectedBank, setSelectedBank] = useState<BankWithAccounts | null>(null);

    const { mutate: deleteBank, isPending, isError, error } = useDeleteBank({
        onSuccess: () => {
            console.log("Bank deleted successfully!");
        },
        onError: (err) => {
            console.error("Failed to delete bank:", err);
        }
    });

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 rounded-sm gap-2 sm:gap-4 sm:p-2">
            {banks.map((bank) => (
                <BankCard 
                    key={bank.id}
                    bank={bank}
                    selected={selectedBank === bank}
                    selectedForDeletion={bankToDelete === bank}
                    onSelect={() => {
                        if(bank !== selectedBank){
                            setBankToDelete(null);
                            setSelectedBank(bank);
                        }
                    }}
                    onToggleDelete={() => {
                        setSelectedBank(bank);
                        setBankToDelete(bankToDelete === bank? null : bank);
                    }}
                    onDelete={() => {
                        deleteBank({ id: bank.id })
                    }}
                />
            ))}
        </div>
    );
}