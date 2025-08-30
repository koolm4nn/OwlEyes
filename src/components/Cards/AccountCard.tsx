import { AccountWithBank } from "@/types";
import { TrashIcon } from "@heroicons/react/24/outline";

export interface AccountCardProps{
    account: AccountWithBank,
    selected: boolean,
    selectedForDeletion: boolean,
    onSelect: () => void,
    onToggleDelete: () => void,
    onDelete: () => void
}

function formatted(value: number): string {
    return new Intl.NumberFormat('de-DE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
        }).format(value);
}


export default function AccountCard({account, selected, selectedForDeletion, onSelect, onToggleDelete, onDelete} : AccountCardProps){
    return (
        <div 
            key={account.id} 
            className={`relative overflow-hidden ${selectedForDeletion? 'grid grid-cols-[50%_50%]' : ''} ${selected? 'bg-amber-300 hover:brightness-105' : ' bg-gray-300 hover:brightness-105'} rounded-md shadow`} 
            onClick={(e) => {
                e.stopPropagation();
                onSelect()}
            }>
            <div className="p-4">
                <div className="flex items-center">
                    <h2 className="text-lg font-bold cursor-default">{account.name}</h2>
                    <p className="text-sm ml-2 text-gray-500 cursor-default">$</p>
                    {!selectedForDeletion && 
                    <TrashIcon 
                        className={`${selected? 'text-red-600 hover:text-red-700' : 'text-red-400 hover:text-red-500'} ml-auto size-5 cursor-pointer`} 
                            onClick={(e) => {
                                e.stopPropagation(); // avoid triggering on select
                                onToggleDelete();
                            }
                        }
                    />}
                </div>
                <p className="mt-7 text-sm cursor-default">Balance:</p>
                <p className={`mt-2 text-sm text-center rounded-lg pl-4 pr-2 py-1 cursor-default
                    ${account.balance === 0? 'text-gray-500 bg-white' : account.balance < 0? 'text-white bg-red-800' : 'text-white bg-green-800'}
                    w-[128px]`
                }>{`${account.balance < 0 ? '' : '+'}${formatted(account.balance)}`}</p>
            </div>
                        
            {(
                <div className={`
                    absolute inset top-0 right-0 h-full w-[55%] bg-red-400 flex flex-col rounded
                    transform transition-transform transition-opacity duration-200
                    ${selectedForDeletion
                        ? ' translate-x-0 opacity-100 pointer-events-auto' 
                        : ' translate-x-[100%] opacity-0 pointer-events-none'}
                    `}
                >
                    <p className="text-sm mx-2 mt-2">
                        This will also delete all balances that were created for this account.
                    </p>
                    <div className="mt-auto flex flex-col m-2 justify-center gap-2">
                        <button 
                            className="px-3 py-1 rounded bg-gray-300 hover:bg-white text-sm" 
                            onClick={(e) => {
                                e.stopPropagation(); 
                                onToggleDelete();
                            }}>
                            Cancel
                        </button>
                        <button 
                            className="px-3 py-1 rounded bg-gray-300 hover:bg-white text-red-600 text-sm font-bold"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete();
                            }}>
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}