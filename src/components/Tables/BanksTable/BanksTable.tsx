import BankCard from "@/components/BankCard";
import { useDeleteBank } from "@/hooks/useBank";
import { BankIncludingAccounts } from "@/types";
import { useState } from "react";


export function BanksTable({ banks }: {banks: BankIncludingAccounts[]}){
    const [bankToDelete, setBankToDelete] = useState<BankIncludingAccounts | null>(null);
    const [selectedBank, setSelectedBank] = useState<BankIncludingAccounts | null>(null);

    const { mutate: deleteBank, isPending, isError, error } = useDeleteBank({
        onSuccess: () => {
            console.log("Bank deleted successfully!");
        },
        onError: (err) => {
            console.error("Failed to delete bank:", err);
        }
    });

    return (
        <div className="grid grid-cols-2 rounded-sm gap-4 p-2">
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