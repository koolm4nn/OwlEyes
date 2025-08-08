import { useBanks } from "@/hooks/useBank";
import { Bank } from "@/types";

export function BankList(){
    const {data: banks, isLoading, error } = useBanks();

    if(isLoading) return <p>Loading banks..</p>;
    if(error) return <p>Error loading banks: {error.message}</p>;

    return (
        <div>
            <h2>Banks</h2>
            {banks && banks.length > 0? 
                <ul>
                    {banks.map((bank: Bank) => (
                        <li key={bank.id}>
                            {bank.name}
                        </li>
                    ))}
                </ul> 
                : <p>No banks.</p>}
        </div>
    )
}