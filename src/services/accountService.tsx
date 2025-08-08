import { AccountRepository } from "@/repositories/accountRepository";
import { BaseService } from "./baseService";
import { Account } from "@/types";

/**
 * Service layer for handling business logic related to accounts.
 */
export class AccountService extends BaseService<AccountRepository>{

    /**
     * Retrieves all accounts
     * 
     * @returns {Account[]} an array of accounts
     */
    findAll(): Account[]{
        return this.repo.findAll();
    }

    /**
     * Creates a new account for a bank
     * 
     * @param {string} name - name of the account 
     * @param {number} bankId - id of the bank for the account 
     * @returns {number} the id of the newly created account
     */
    create(name: string, bankId: number): number{
        return this.repo.create(name, bankId);
    }

    // delete

    // update
}