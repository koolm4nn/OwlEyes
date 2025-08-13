import { AccountWithBank } from "@/types";
import { BaseRepository } from "./baseRepository";

/**
 * Repository layer responsible for accessing the 'accounts' table in the database.
 * 
 * Provides basic CRUD operations for accounts.
 */
export class AccountRepository extends BaseRepository{

    /**
     * Retrieves all accounts from the database.
     * 
     * @returns {AccountWithBank[]} An array of Accounts
     */
    findAll(): AccountWithBank[]{
        const rows = this.db.prepare("select a.id, a.name, b.id as bankId, b.name as bankName from accounts a left join banks b on a.bank_id = b.id").all();
        return rows as AccountWithBank[];
    }
    
    /**
     * Inserts a new account into the database.
     * 
     * @param {string} name - The name of the account.
     * @param {number} bankId - The ID of the bank associated with this account.
     * @returns {number} The id of the row inserted
     */
    create(name: string, bankId: number): number{
        const result = this.db.prepare("insert into accounts (name, bank_id) VALUES(?, ?)").run(name, bankId);
        return result.lastInsertRowid as number;
    }

    /**
     * Delete a row of the accounts table by id
     * 
     * @param {number} accountId - The id of the account to delete
     * @returns {boolean} if amount of rows effected > 0
     */
    delete(accountId: number): boolean{
        const result = this.db.prepare("delete from accounts where id = ?").run(accountId);
        return result.changes > 0;
    }
}