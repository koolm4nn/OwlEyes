import { BankSummary } from "@/types";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

export default function BankSummaryCircle({bank}:{ bank: BankSummary}){
    return (
        <button className="">
            <div className={`${bank.balance < 0? "bg-red-100" : "bg-green-100"} hover:shadow-sm ${bank.balance < 0? "shadow-red-600/80" : "shadow-green-600/80"} w-24 h-24 flex text-center items-center justify-center p-12 rounded-full`}>
                <div>
                    {bank.balance < 0? <MinusIcon className="pr-1 w-5 h-5 text-red-600" /> : <PlusIcon className="pr-1 w-5 h-5 text-green-600" /> }
                </div>
                <div className="text-black">
                    {bank.name}
                </div>
            </div>
        </button>
    )
}