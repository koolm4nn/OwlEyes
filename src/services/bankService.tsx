import { BankRepository } from "@/repositories/bankRepository";
import { BaseService } from "./baseService";
import { Bank, BankWithAccounts } from "@/types";
import { AccountRepository } from "@/repositories/accountRepository";
import { BalanceRepository } from "@/repositories/balanceRepository";

/**
 * Service layer for handling business logic related to balances.
 */
export class BankService extends BaseService<BankRepository>{
    private accountRepo: AccountRepository;
    private balanceRepo: BalanceRepository;

    constructor(bankRepo: BankRepository, accountRepo: AccountRepository, balanceRepo: BalanceRepository){
        super(bankRepo);
        this.accountRepo = accountRepo;
        this.balanceRepo = balanceRepo;
    }

    /**
     * Retrieves all banks.
     * 
     * @returns {Bank[]} all banks
     */
    findAll(): Bank[]{
        return this.repo.findAll();
    }

    /**
     * Retrieves all banks together with the accounts belonging to each bank.
     * 
     * @returns {BankWithAccounts[]} all banks with their accounts
     */
    findAllIncludingAccounts(): BankWithAccounts[]{
        const banks = this.findAll();
        const accounts = this.accountRepo.findAll();
        const balances = this.balanceRepo.findAll();

        return banks.map(bank => {
            const bankAccounts = accounts.filter(acc => acc.bankId === bank.id);
            const bankBalances = balances.filter(blc => bankAccounts.flatMap(acc => acc.id).includes(blc.accountId))
            //const balanceSum = bankBalances.reduce((acc, curr) => {return acc += curr.amount}, 0)

            return {
                id: bank.id,
                name: bank.name,
                accounts: bankAccounts,
                balance: bankBalances.pop()?.amount ?? 0
            }
        })
    }

    /**
     * Creates a new bank
     * 
     * @param {string} name name of the new bank 
     * @returns {number} id of the newly created bank
     */
    create (name: string): number{
        return this.repo.create(name);
    }

    /**
     * Checks if a bank with 'name' exists
     * 
     * @param {string} name - bank name to check 
     * @returns {boolean} True if bank with name exists, false otherwise
     */
    existsByName(name: string): boolean{
        return this.repo.nameExists(name);
    }

    /**
     * Checks if a bank with 'id' exists
     * 
     * @param {number} id - bank id to check 
     * @returns {boolean} True if bank with id exists, false otherwise
     */
    existsById(id: number): boolean{
        return this.repo.idExists(id);
    }

    /**
     * Deletes the bank by 'id'
     * 
     * @param {number} id - The id of the bank to delete 
     * @returns {boolean} True if bank was deleted, otherwise false
     */
    delete(id: number): boolean {
        return this.repo.delete(id);
    }

    // update
}