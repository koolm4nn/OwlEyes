import { useCreateAccount } from "@/hooks/useAccount";
import { useBanks } from "@/hooks/useBank";
import { useState } from "react";

export function AddAccountForm({ onSuccess }: { onSuccess: () => void}){
    const [name, setName] = useState("");
    const [bankId, setBankId] = useState<number | "">("");
    const [errorMessage, setErrorMessage] = useState("");

    // Dropdown data
    const {data: banks = [], isLoading: banksLoading } = useBanks();

    const {mutate: createAccount, isPending} = useCreateAccount({
        onSuccess: () => {
            resetForm();
            onSuccess?.();
        }
    });

    const resetForm = () => {
            setName("");
            setBankId("");
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(bankId == "" || bankId === -1){
            setErrorMessage("Please select a bank.");
            return;
        }

        if(!name.trim()){
            setErrorMessage("Please enter an account name.");
            return;
        }

        try{
            setErrorMessage("");
            createAccount( { name, bankId } );
        } catch(err) {
            console.error("Error checking account name: ", err);
            setErrorMessage("An unexpected error occured.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            <input 
                placeholder="Name (e.g. Daily Money Account)" 
                className="w-full border rounded p-2"
                value={name} 
                onChange={(e) => {
                    setName(e.target.value); 
                    setErrorMessage("");} 
                }/>
            <select
                className="w-full border rounded p-2"
                value={bankId}
                onChange={(e) => {
                    setBankId(Number.parseInt(e.target.value));
                    setErrorMessage("");
                }}
                disabled={banksLoading}
            >
                <option value="">Select Bank</option>
                {banks.map((bank) => (
                    <option key={bank.id} value={bank.id}>
                        {bank.name}
                    </option>
                ))}
            </select>
            <button 
                type="submit" 
                disabled={isPending}
                className="rounded-lg w-[200px] border bg-emerald-300 border-gray-300 px-3 py-1">
                {isPending? "Saving..." : "Add Account"}
            </button>
            {errorMessage && <p>Error: {errorMessage}</p>}
        </form>
    )
}