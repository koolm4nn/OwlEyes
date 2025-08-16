import { BalanceWithMetaData } from "@/types";
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
     * @returns {BalanceWithMetaData[]} An array of Balance
     */
    findAll(): BalanceWithMetaData[]{
        const rows = this.db.prepare("select blc.id, blc.amount, blc.timestamp, acc.id as accountId, acc.name as accountName, bk.id as bankId, bk.name as bankName from balances blc left join accounts acc on acc.id = blc.account_id left join banks bk on bk.id = acc.bank_id").all();
        return rows as BalanceWithMetaData[];
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