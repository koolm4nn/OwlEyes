import { EntityTable } from "@/components/Base/EntityTable";
import { Bank } from "@/types";

export function BanksTable({ banks }: {banks: Bank[]}){
    return (
        <EntityTable 
            data={banks} 
            columns={[
                {label: "ID", render: (bank) => bank.id},
                {label: "Name", render: (bank) => bank.name},
            ]}
        />
    );
}