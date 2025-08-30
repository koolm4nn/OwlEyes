import { useCreateBank, useExistsBank } from "@/hooks/useBank";
import { useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";

export function AddBankForm({ onSuccess }: { onSuccess?: () => void}){
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const {mutate: createBank, isPending} = useCreateBank({
        onSuccess: () => {
            setName("");
            onSuccess?.();
        }
    });

    const resetForm = () => {
        setErrorMessage("");
        setName("");
    }

    const { mutateAsync: checkExists } = useExistsBank();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try{
            const result = await checkExists({ name });

            if(result.exists){
                setErrorMessage("Name already exists.");
                return;
            }

            createBank( { name } );
        } catch(err) {
            console.error("Error checking bank name: ", err);
            setErrorMessage("An unexpected error occured.");
        }
    };

    return (
    <form onSubmit={handleSubmit} className="space-y-2">
        <input
            placeholder="Name (e.g. BNZ)"
            className="w-full border rounded p-2"
            value={name} 
            onChange={(e) => {
                setName(e.target.value); 
                setErrorMessage("");
            }}
        /> 
        <button 
            type="submit" 
            disabled={isPending} 
            className="rounded-lg w-[200px] border bg-emerald-300 border-grey-300 px-3 py-1">
            {isPending? "Saving..." : "Add Bank"}
        </button>
        
        {errorMessage && <p className="text-red-400">{errorMessage}</p>}
    </form>
    );
}