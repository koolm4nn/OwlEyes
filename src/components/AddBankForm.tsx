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

            console.log("Result:");
            console.log(result);
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
    <form onSubmit={handleSubmit} >
        <input 
            placeholder="Name (e.g. BNZ)" 
            value={name} 
            onChange={(e) => {setName(e.target.value); setErrorMessage("");} }/>
        <button type="submit" disabled={isPending}>
            {isPending? "Saving..." : "Add Bank"}
        </button>
        {errorMessage && <p>Error: {errorMessage}</p>}
    </form>
    )
}