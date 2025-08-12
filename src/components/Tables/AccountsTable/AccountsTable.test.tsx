import { render, screen, within } from "@testing-library/react";
import { AccountsTable } from "./AccountsTable";
import { Account } from "@/types";

describe("AccountsTable", () => {
    const sampleAccounts: Account[] = [
        { id: 1, name: "First Account", bankId: 0},
        { id: 2, name: "Second Account", bankId: 1}
    ];

    /**
     * Test if column headers are displayed
     */
    it("renders table with correct headers", () => {
        render(<AccountsTable accounts={sampleAccounts} />);

        const table = screen.getByRole("table"); // Get table
        expect(table).toBeInTheDocument();

        const headers = screen.getAllByRole("columnheader"); // Get headers and compare
        expect(headers).toHaveLength(4);
        expect(headers[0]).toHaveTextContent("ID");
        expect(headers[1]).toHaveTextContent("Name");
        expect(headers[2]).toHaveTextContent("Bank id");
        expect(headers[3]).toHaveTextContent("");
    });

    /**
     * Test if data is contained in table
     */
    it("renders all bank rows", () => {
        render(<AccountsTable accounts={sampleAccounts} />);

        const rows = screen.getAllByRole("row");
        expect(rows).toHaveLength(3);

        const firstRow = within(rows[1]).getAllByRole("cell");
        expect(firstRow[0]).toHaveTextContent("1");
        expect(firstRow[1]).toHaveTextContent("First Account");
        expect(firstRow[2]).toHaveTextContent("0");
        
        const secondRow = within(rows[2]).getAllByRole("cell");
        expect(secondRow[0]).toHaveTextContent("2");
        expect(secondRow[1]).toHaveTextContent("Second Account");
        expect(secondRow[2]).toHaveTextContent("1");
    });

    /**
     * Check if only header is displayed when data is empty
     */
    it("renders no rows when given empty data", () => {
        render(<AccountsTable accounts={[]} />);

        expect(screen.queryAllByRole("row")).toHaveLength(1); // Header only
    })
});
