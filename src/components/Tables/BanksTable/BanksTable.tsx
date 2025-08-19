import { BankIncludingAccounts } from "@/types";
import { TrashIcon } from "@heroicons/react/24/solid";

function formatted(value: number): string {
    return new Intl.NumberFormat('de-DE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
        }).format(value);
}

export function BanksTable({ banks }: {banks: BankIncludingAccounts[]}){
    return (
        <div className="grid grid-cols-2 rounded-sm gap-4 p-2">
            {banks.map(bank => (
                <div key={bank.id} className="p-4 rounded-md shadow hover:border hover:bg-white bg-gray-200">
                    <div className="flex itmes-center">
                        <h2 className="text-lg font-bold">{bank.name}</h2>
                        <TrashIcon 
                            className="ml-auto size-5 text-red-300 hover:text-red-600 cursor-pointer" 
                            onClick={() => console.log("Icon pressed.")}/>
                    </div>
                    <p className="text-sm text-gray-500">$</p>
                    <p className="mt-2 text-sm">Accounts: {bank.accounts.length}</p>
                    <p className={`mt-2 text-sm ${bank.balance < 0? 'text-red-600' : 'text-green-600'}`}>{`${bank.balance < 0 ? '' : '+'}${formatted(bank.balance)}`}</p>
                </div>
            ))}
        </div>
    );
}