import { EntityTable } from "@/components/Base/EntityTable";
import { Balance } from "@/types";

// id, Name, bank id
export function BalancesTable({ balances }: {balances: Balance[]}){
    return (
        <EntityTable 
            data={balances} 
            columns={[
                {label: "ID", render: (balance) => balance.id},
                {label: "amount", render: (balance) => balance.amount},
                {label: "Account id", render: (balance) => balance.accountId},
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