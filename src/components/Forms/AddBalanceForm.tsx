import { useCreateBalance } from "@/hooks/useBalance";
import { useAccounts } from "@/hooks/useAccount";
import { useState } from "react";
import { number, string } from "zod";


function convertDateToUnix(date : Date) : number {
    return Math.floor(date.getTime() / 1000);
}

export function AddBalanceForm(){
    /* Today's date as string */
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const todayStr = `${yyyy}-${mm}-${dd}`;

    /* Form data */
    const [isBalanceNegative, setIsBalanceNegative] = useState<boolean>(false);
    const [formState, setFormState] = useState<{
        amount: string,
        decimals: number,
        accountId: number | ""
        date: string
    }>({
        amount: "0",
        decimals: 0,
        accountId: "",
        date: todayStr
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        field: keyof typeof formState
    ) => {
        setFormState({
            ...formState,
            [field]: e.target.value
        })
    }

    //const [amount, setAmount] = useState<string>("0");
    //const [decimals, setDecimals] = useState<number>(0);
    //const [accountId, setAccountId] = useState<number | "">("");

    //const [date, setDate] = useState<string>(todayStr);
    const [errorMessage, setErrorMessage] = useState("");

    const {data: accounts = [], isLoading: accountsLoading } = useAccounts();

    const {mutate: createBalance, isPending} = useCreateBalance({
        onSuccess: () => setFormState({
            amount: "0",
            decimals: 0,
            accountId: "",
            date: todayStr
        })
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(formState.accountId == "" || formState.accountId === -1){
            setErrorMessage("Please select an account.");
            return;
        }

        if(new Date(formState.date).toString() == "Invalid Date"){
            setErrorMessage("Please enter a valid date.");
            return;
        }
        
        setErrorMessage("");
        const timestamp = convertDateToUnix(new Date(formState.date));
        createBalance({
            amount: parseFloat(`${formState.amount}.${formState.decimals}`),
            accountId: Number(formState.accountId),
            timestamp
        });
    };

    return (
    <form 
        className="flex flex-col gap-5 bg-orange-200"
        onSubmit={handleSubmit}
        >
        <input
            className="bg-blue-200" 
            type="date"
            value={formState.date}
            min={"1900-01-01"}
            max={new Date().toUTCString()}
            onChange={(e) => {handleChange(e, "date"); setErrorMessage("");} }
        />
        <select
            className="bg-purple-400"
            value={formState.accountId}
            onChange={(e) => {
                handleChange(e, "accountId")
                //setAccountId(Number.parseInt(e.target.value));
                setErrorMessage("");
            }}
            disabled={accountsLoading}
        >
            <option value="">Select Account</option>
            {accounts.map((account) => (
                <option key={account.id} value={Number(account.id)}>
                    {account.name}
                </option>
            ))}
        </select>
        <div className="flex flex-item">
            {/* Integer input */}
            <input
                inputMode="numeric"
                pattern="-?[0-9]*"
                className={`text-right px-2 py-1 rounded w-40 ${parseInt(formState.amount) < 0? "bg-red-200" : "bg-green-200"}`}
                value={formState.amount} 
                onChange={(e) => {
                    const val = e.target.value;

                    if(val === ""){
                        setFormState({
                            ...formState,
                            amount: "0"
                        });
                    } else if (/^-?\d*$/.test(val)) { // Allow only digits and an optional leading minus
                        if(/^-\d*$/.test(val)){ // Negative
                            setIsBalanceNegative(true);
                            setFormState({
                                ...formState,
                                amount: `-${val.slice(1, val.length)}`
                            });
                        } else { // Positive
                            setIsBalanceNegative(false);
                        setFormState({
                            ...formState,
                            amount: val
                        });
                        }
                    }
                    setErrorMessage("");
                }} 
            />
            {/* comma-separator */}
            <div className="bg-green-400 text-lg font-bold"> , </div>
            {/* Decimal input */}
            <input
                inputMode="numeric"       
                pattern="[0-9]*"
                maxLength={2}
                className="bg-yellow-200 text-left px-2 py-1 rounded w-15"
                value={formState.decimals}
                onChange={(e) => { handleChange(e, "decimals") }
                    //setDecimals(e.target.value === "" ? 0 : Number.parseInt(e.target.value, 10)); 
                    //setErrorMessage("");
                }
            />
            <div className="bg-green-400 ml-1 text-lg font-bold">$</div>
        </div>
        <button
            className="bg-gray-400"
            type="submit" 
            disabled={isPending}>
            {isPending? "Saving..." : "Add Balance"}
        </button>
        {errorMessage && <p>Error: {errorMessage}</p>}
    </form>
    )
}
