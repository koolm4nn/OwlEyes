import { AccountRepository } from "@/repositories/accountRepository";
import { BaseService } from "./baseService";
import { AccountWithBalances, AccountWithBank, Balance } from "@/types";
import ServiceContainer from "./serviceContainer";

/**
 * Service layer for handling business logic related to accounts.
 */
export class AccountService extends BaseService<AccountRepository>{

    /**
     * Retrieves all accounts
     * 
     * @returns {AccountWithBank[]} an array of accounts
     */
    findAll(): AccountWithBank[]{
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

    /**
     * Deletes the account by 'id'
     * 
     * @param {number} id - The id of the account to delete 
     * @returns {boolean} True if account was deleted, otherwise false
     */
    delete(id: number): boolean {
        return this.repo.delete(id);
    }

    /**
     * Retrieves all accounts with their balances
     * 
     * @returns {AccountWithBalances[]} - Accounts with their associated balances
     */
    findAllWithBalances(): AccountWithBalances[]{
        const balances = ServiceContainer.balanceService.findAll();
        const accounts = ServiceContainer.accountService.findAll();

        const result = [] as AccountWithBalances[];

        accounts.forEach(acc => {
            result.push({
                account: acc,
                balances: balances.filter(b => b.accountId === acc.id).map(b => b as Balance)
            } as AccountWithBalances)
        })

        return result;
    }

    // update
}