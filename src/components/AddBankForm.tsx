import { useCreateBank, useExistsBank } from "@/hooks/useBank";
import { useState } from "react";

export function AddBankForm(){
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const {mutate: createBank, isPending} = useCreateBank({
        onSuccess: () => {
            setName("");
        }
    });

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
    <form onSubmit={handleSubmit} className="mx-12 p-5 rounded-lg bg-gray-200">
        <input 
            placeholder="Name (e.g. BNZ)"
            className="mr-2 border border-grey-300"
            value={name} 
            onChange={(e) => {setName(e.target.value); setErrorMessage("");} }/>
        <button 
            type="submit" 
            disabled={isPending} 
            className="rounded-lg border border-grey-300 pl-3 pr-3 pt-1 pb-1">
            {isPending? "Saving..." : "Add Bank"}
        </button>
        {errorMessage && <p>Error: {errorMessage}</p>}
    </form>
    )
}