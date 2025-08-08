import { Balance } from "@/types";
import { BaseRepository } from "./baseRepository";

/**
 * Repository layer responsible for accessing the 'balance' table in the database.
 * 
 * Provides basic CRUD operations for balance.
 */
export class BalanceRepository extends BaseRepository{
    /**
     * Retrieves all balances from the database.
     * 
     * @returns {Balance[]} An array of Balance
     */
    findAll(): Balance[]{
        const rows = this.db.prepare("select * from balances").all();
        return rows as Balance[];
    }

    /**
     * Inserts a new balance into the database.
     * 
     * @param {number} amount - the amount of the account.
     * @param {number} accountId - The ID of the account associated with this balance.
     * @returns {number} The id of the row inserted
     */
    create(amount: number, accountId: number): number{
        const result = this.db.prepare("insert into balances (amount, account_id) VALUES(?, ?)").run(amount, accountId);
        return result.lastInsertRowid as number;
    }

    
    /**
     * Delete a row of the balances table by id
     * 
     * @param {number} balanceId - The id of the balance to delete
     * @returns {boolean} if amount of rows effected > 0
     */
    delete(balanceId: number): boolean{
        const result = this.db.prepare("delete from balances where id = ?").run(balanceId);
        return result.lastInsertRowid > 0;
    }
}