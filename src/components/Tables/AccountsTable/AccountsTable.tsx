import { EntityTable } from "@/components/Base/EntityTable";
import { AccountWithBank } from "@/types";

// id, Name, bank id
export function AccountsTable({ accounts }: {accounts: AccountWithBank[]}){
    return (
        <EntityTable 
            data={accounts} 
            columns={[
                {label: "ID", render: (account) => account.id},
                {label: "Name", render: (account) => account.name},
                {label: "Bank", render: (account) => account.bankName},
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