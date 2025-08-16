import { EntityTable } from "@/components/Base/EntityTable";
import { Balance, BalanceWithMetaData } from "@/types";

function convertUnixToDate(unixDate : number) : string {
    return new Date(unixDate * 1000).toLocaleDateString();
}

// id, Name, bank id
export function BalancesTable({ balances }: {balances: BalanceWithMetaData[]}){
    return (
        <EntityTable 
            data={balances} 
            columns={[
                {label: "ID", render: (balance) => balance.id},
                {label: "amount", render: (balance) => balance.amount},
                {label: "Timestamp", render: (balance) => convertUnixToDate(balance.timestamp)},
                {label: "Account id", render: (balance) => balance.accountId ?? " - "},
                {label: "Account Name", render: (balance) => balance.accountName ?? " - "},
                {label: "Bank id", render: (balance) => balance.bankId ?? " - "},
                {label: "Bank Name", render: (balance) => balance.bankName ?? " - "},
                {label: "", render: () => (
                    <div className="flex justify-end pr-2 py-1">
                        <button 
                            className="px-4 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 transition-colors">
                                Delete
                        </button>
                    </div>
                )}
            ]}
        />
    );
}