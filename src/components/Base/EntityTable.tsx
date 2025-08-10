import React from "react";
/**
 * Generic base component for rendering data tables (for e.g. accounts, balances, banks, ..)
 * 
 * @template T The type of the data entity to display.
 */


/**
 * Props for EntityTable component.
 * 
 * @template T
 * @property {T[]} data - Array of data entities to render as table rows.
 * @property {{ label: string, render: (item: T) => React.ReactNode }[]} columns - 
 *    Configuration of table columns, including header label and a render function
 *    that defines how to display each column’s data for a given entity.
 */
interface EntityTableProps<T> {
    data: T[],
    columns: { label: string, render: (item: T) => React.ReactNode} [];
}

/**
 * Renders a simple HTML table with dynamic columns and rows based on the data provided.
 * 
 * The columns prop defines the headers and how each cell’s content is rendered for each row.
 * 
 * @template T
 * @param {EntityTableProps<T>} props - Props containing the data and column configuration.
 * @returns JSX.Element The rendered table.
 */
export function EntityTable<T>({data, columns}: EntityTableProps<T>){
    return (
        <table className="min-w-full border border-gray-300 border-collapse rounded-lg overflow-hidden">
            <thead className="bg-gray-400">
                <tr>
                    {columns.map((c, i) => (
                        <th 
                        key={i}
                        className="px-4 py-2 text-left font-semibold text-gray-700 border-b border-gray-300"
                        >{c.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, rowIndex) => (
                    <tr key={rowIndex}
                        className={" hover:bg-gray-900 text-gray-800 " + (rowIndex % 2 == 0? "bg-white" : "bg-gray-300")}
                    >
                        {columns.map((c, colIndex) => (
                            <td key={colIndex}>{c.render(item)}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}