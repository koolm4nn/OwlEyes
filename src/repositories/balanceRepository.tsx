import { BalanceWithAccount } from "@/types";
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
     * @returns {BalanceWithAccount[]} An array of Balance
     */
    findAll(): BalanceWithAccount[]{
        const rows = this.db.prepare("select b.id, b.amount, b.timestamp, a.id, a.name from balances b left join accounts a on a.id = b.account_id").all();
        return rows as BalanceWithAccount[];
    }

    /**
     * Inserts a new balance into the database.
     * 
     * @param {number} amount - the amount of the account.
     * @param {number} accountId - The ID of the account associated with this balance.
     * @param {number} timestamp - Timestamp of the creation as unix timestamp. If no timestamp is provided, .now() is used
     * @returns {number} The id of the row inserted
     */
    create(amount: number, accountId: number, timestamp?: number): number{
        let result;
        if(timestamp === undefined){
            result = this.db.prepare("insert into balances (amount, account_id) VALUES(?, ?)").run(amount, accountId);
        } else {
            result = this.db.prepare("insert into balances (amount, account_id, timestamp) VALUES(?, ?, ?)").run(amount, accountId, timestamp);
        }
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