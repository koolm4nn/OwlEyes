import { EntityTable } from "@/components/Base/EntityTable";
import { Bank } from "@/types";

export function BanksTable({ banks }: {banks: Bank[]}){
    return (
        <EntityTable 
            data={banks} 
            columns={[
                {label: "ID", render: (bank) => bank.id},
                {label: "Name", render: (bank) => bank.name},
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