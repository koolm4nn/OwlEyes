import { BankRepository } from "@/repositories/bankRepository";
import { BaseService } from "./baseService";
import { AccountSummary, Bank, BankSummary, BankWithAccounts } from "@/types";
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
     * {
     *  bankid: 0
     *  bank: name
     *  trend: -x / 0 / +x
     *  accounts: [{
     *      id: 1
     *      balance: 123
     *      trend: -x / 0 / +x
     * }]
     * } 
     * 
     */
    findAllSummaries(): BankSummary[]{
        const banks = this.findAll();
        const accounts = this.accountRepo.findAll();
        const balances = this.balanceRepo.findAll();

        const result = [];

        for(let idx = 0; idx < banks.length; idx++){
            const bank = banks[idx];
            const bankAccounts = accounts.filter(acc => acc.bankId == bank.id);

            const bankSummary: BankSummary = {
                id: idx,
                name: bank.name,
                balance: 0,
                accounts: []
            }

            const accs = [];
            for(let jdx = 0; jdx < bankAccounts.length; jdx++){
                const accountsBalances = balances.filter(blc => blc.accountId === bankAccounts[jdx].id).sort((b1, b2) => b1.timestamp - b2.timestamp);

                accs.push({
                    id: bankAccounts[jdx].id,
                    balance: accountsBalances.length > 0? (accountsBalances.at(-1)?.amount ?? 0) : 0,
                    trend: accountsBalances.length >= 2 ? 
                        (accountsBalances.at(-1)?.amount ?? 0) - (accountsBalances.at(-2)?.amount ?? 0) : 
                        accountsBalances.length > 0? (accountsBalances.at(-1)?.amount ?? 0) : 0
                } as AccountSummary)
            }

            bankSummary.accounts = accs;

            bankSummary.balance = accs.reduce((acc, curr) => {
                acc += curr.balance;
                return acc;
            }, 0)

            result.push(bankSummary);
        }

        return result;
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