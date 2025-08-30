import React from "react";
/**
 * Generic base component for rendering data tables (for e.g. accounts, balances, banks, ..)
 * 
 * @template T The type of the data entity to display.
 */

interface EntityTableColumn<T> {
    label: string, 
    render: (item: T) => React.ReactNode,
    width?: string
}

/**
 * Props for EntityTable component.
 * 
 * @template T
 * @property {T[]} data - Array of data entities to render as table rows.
 * @property {EntityTableColumn} columns - 
 *    Configuration of table columns, including header label, a render function
 *    that defines how to display each column’s data for a given entity and a optional width in %.
 */
interface EntityTableProps<T> {
    data: T[],
    columns: EntityTableColumn<T>[];
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
        <div className="">
            <table className="border-collapse rounded-t-xl min-w-full overflow-hidden">
                <thead className="bg-blue-300 rounded-xs">
                    <tr>
                        {columns.map((c, i) => (
                            <th 
                            key={i}
                            className="px-4 py-2 text-left font-semibold text-gray-700"
                            >{c.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, rowIndex) => (
                        <tr key={rowIndex}
                            className={"hover:bg-gray-200 " + (rowIndex % 2 == 0? "bg-white" : "bg-gray-100")}
                        >
                            {columns.map((c, colIndex) => (
                                <td key={colIndex} className="border border-gray-500 hover:bg-gray-300">{c.render(item)}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}