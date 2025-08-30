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
                    <div 
                        className=""
                        >
                        <button 
                            className="w-full h-full px-4 py-1 text-sm text-white bg-red-500 hover:bg-red-600 transition-colors"       
                            onClick={() => console.log("Deletion clicked.")}>
                                Delete
                        </button>
                    </div>
                )}
            ]}
        />
    );
}