import { render, screen, within } from "@testing-library/react";
import { BanksTable } from "./BanksTable";
import { Bank } from "@/types";

describe("BanksTable", () => {
    const sampleBanks: Bank[] = [
        { id: 1, name: "First Bank" },
        { id: 2, name: "Second Bank" }
    ];

    /**
     * Test if column headers are displayed
     */
    it("renders table with correct headers", () => {
        render(<BanksTable banks={sampleBanks} />);

        const table = screen.getByRole("table"); // Get table
        expect(table).toBeInTheDocument();

        const headers = screen.getAllByRole("columnheader"); // Get headers and compare
        expect(headers).toHaveLength(3);
        expect(headers[0]).toHaveTextContent("ID");
        expect(headers[1]).toHaveTextContent("Name");
        expect(headers[2]).toHaveTextContent("");
    });

    /**
     * Test if data is contained in table
     */
    it("renders all bank rows", () => {
        render(<BanksTable banks={sampleBanks} />);

        const rows = screen.getAllByRole("row");
        expect(rows).toHaveLength(3);

        const firstRow = within(rows[1]).getAllByRole("cell");
        expect(firstRow[0]).toHaveTextContent("1");
        expect(firstRow[1]).toHaveTextContent("First Bank");

        
        const secondRow = within(rows[2]).getAllByRole("cell");
        expect(secondRow[0]).toHaveTextContent("2");
        expect(secondRow[1]).toHaveTextContent("Second Bank");
    });

    /**
     * Check if only header is displayed when data is empty
     */
    it("renders no rows when given empty data", () => {
        render(<BanksTable banks={[]} />);

        expect(screen.queryAllByRole("row")).toHaveLength(1); // Header only
    })
});
