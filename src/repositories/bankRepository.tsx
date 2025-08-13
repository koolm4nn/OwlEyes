import { Bank } from "@/types";
import { BaseRepository } from "./baseRepository";

/**
 * Repository layer responsible for accessing the 'banks' table in the database.
 * 
 * Provides basic CRUD operations for banks.
 */
export class BankRepository extends BaseRepository{
    /**
     * Retrieves all banks from the database.
     * 
     * @returns {Bank[]} An array of Bank
     */
    findAll(): Bank[]{
        const rows = this.db.prepare("select * from banks order by name asc").all();

        /**
         * TODO: Alternatively?
         * return rows.map(row => {
         *  id: Number(row.id),
         *  name: String(row.name)
         * }));
         */
        return rows as Bank[];
    }

    
    /**
     * Inserts a new bank into the database.
     * 
     * @param {string} name - the name of the bank.
     * @returns {number} The id of the row inserted
     */
    create(name: string): number{
        const result = this.db.prepare("insert into banks (name) VALUES(?)").run(name);
        return result.lastInsertRowid as number;
    }

    /**
     * Delete a row of the bank table by id
     * 
     * @param {number} bankId - The id of the bank to delete
     * @returns {boolean} if amount of rows effected > 0
     */
    delete(bankId: number): boolean{
        const result = this.db.prepare("delete from banks where id = ?").run(bankId);
        return result.changes > 0;
    }

    
    /**
     * Checks if a name exists in the the database as a bank name.
     * 
     * @param {string} name - the name to check.
     * @returns {booean} True if name exists, otherwise false
     */
    nameExists(name: string): boolean{
        const result = this.db.prepare("select 1 from banks where name = ?").get(name);
        return result !== undefined;
    }

    /**
     * Checks if a number exists in the the database as a bank id.
     * 
     * @param {number} id - the number to check.
     * @returns {booean} True if number exists as id, otherwise false
     */
    idExists(id: number): boolean{
        const result = this.db.prepare("select 1 from banks where id = ?").get(id);
        return result !== undefined;
    }
}