import { useCreateBank, useExistsBank } from "@/hooks/useBank";
import { useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";

export function AddBankForm(){
    const [showForm, setShowForm] = useState<boolean>(false);
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const {mutate: createBank, isPending} = useCreateBank({
        onSuccess: () => {
            setName("");
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
    <form onSubmit={handleSubmit} className="w-[50%]">
        <div className={`m-2 p-2 rounded-lg ${showForm? 'bg-neutral-200' : ''}`}>
            {
                !showForm && 
                <div>
                    <button 
                        className="px-3 py-1 border bg-[#1e3a8a] rounded text-zinc-200"
                        onClick={() => setShowForm(!showForm)}>
                        New Bank
                    </button>
                </div>
            }
            {
                showForm && 
                <>
                    <div className="flex justify-between mb-2 mx-3">
                        <p>
                            Creating new bank
                        </p>

                        <XCircleIcon 
                            className="size-6 text-neutral-500 hover:text-neutral-950"
                            onClick={() => {
                                setShowForm(false);
                                resetForm();}}
                        />
                    </div>

                    <div className="grid grid-cols-1 mx-5">
                        <input
                            placeholder="Name (e.g. BNZ)"
                            className="mr-2 border border-grey-300"
                            value={name} 
                            onChange={(e) => {setName(e.target.value); setErrorMessage("");} }
                    />
                        
                    <button 
                        type="submit" 
                        disabled={isPending} 
                        className="rounded-lg w-[200px] border bg-sky-300 border-grey-300 px-3 py-1">
                        {isPending? "Saving..." : "Add Bank"}
                    </button>
                    {errorMessage && <p className="text-red-400">{errorMessage}</p>}
                </div>
                </>
            }

            
        </div>
    </form>
    )
}