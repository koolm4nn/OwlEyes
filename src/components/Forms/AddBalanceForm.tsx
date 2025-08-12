import { useCreateBalance } from "@/hooks/useBalance";
import { useAccounts } from "@/hooks/useAccount";
import { useState } from "react";

export function AddBalanceForm(){
    const [amount, setAmount] = useState(0);
    const [accountId, setAccountId] = useState<number | "">("");
    const [errorMessage, setErrorMessage] = useState("");

    const {data: accounts = [], isLoading: accountsLoading } = useAccounts();

    const {mutate: createBalance, isPending} = useCreateBalance({
        onSuccess: () => {
            setAmount(0);
            setAccountId("");
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(accountId == "" || accountId === -1){
            setErrorMessage("Please select an account.");
            return;
        }

        if(amount <= 0){
            setErrorMessage("Please enter a balance.");
            setAmount(0);
            return;
        }
        
        setErrorMessage("");
        createBalance( { amount, accountId } );
    };

    return (
    <form onSubmit={handleSubmit} >
        <input 
            placeholder="Amount" 
            value={amount} 
            onChange={(e) => {setAmount(Number.parseFloat(e.target.value)); setErrorMessage("");} }/>
        <select
            value={accountId}
            onChange={(e) => {
                setAccountId(Number.parseInt(e.target.value));
                setErrorMessage("");
            }}
            disabled={accountsLoading}
        >
            <option value="">Select Account</option>
            {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                    {account.name}
                </option>
            ))}
        </select>
        <button type="submit" disabled={isPending}>
            {isPending? "Saving..." : "Add Balance"}
        </button>
        {errorMessage && <p>Error: {errorMessage}</p>}
    </form>
    )
}