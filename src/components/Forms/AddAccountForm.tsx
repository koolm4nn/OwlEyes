import { useCreateAccount } from "@/hooks/useAccount";
import { useBanks } from "@/hooks/useBank";
import { useState } from "react";

export function AddAccountForm(){
    const [name, setName] = useState("");
    const [bankId, setBankId] = useState<number | "">("");
    const [errorMessage, setErrorMessage] = useState("");

    const {data: banks = [], isLoading: banksLoading } = useBanks();

    const {mutate: createAccount, isPending} = useCreateAccount({
        onSuccess: () => {
            setName("");
            setBankId("");
        }
    });

    //const { mutateAsync: checkExists } = useExistsAccount();

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
            //const result = await checkExists({ name });

            //console.log("Result:");
            //console.log(result);
            //if(result.exists){
            //    setErrorMessage("Name already exists.");
            //    return;
            //}

            setErrorMessage("");
            createAccount( { name, bankId } );
        } catch(err) {
            console.error("Error checking account name: ", err);
            setErrorMessage("An unexpected error occured.");
        }
    };

    return (
    <form onSubmit={handleSubmit} >
        <input 
            placeholder="Name (e.g. Daily Money Account)" 
            value={name} 
            onChange={(e) => {setName(e.target.value); setErrorMessage("");} }/>
        <select
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
        <button type="submit" disabled={isPending}>
            {isPending? "Saving..." : "Add Account"}
        </button>
        {errorMessage && <p>Error: {errorMessage}</p>}
    </form>
    )
}