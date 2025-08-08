import { BalanceRepository } from "@/repositories/balanceRepository";
import { BaseService } from "./baseService";
import { Balance } from "@/types";

/**
 * Service layer for handling business logic related to balances.
 */
export class BalanceService extends BaseService<BalanceRepository>{

    /**
     * Retrieves all balances from the repository.
     * 
     * @returns {Balance[]} An array of balance objects.
     */
    findAll(): Balance[]{
        return this.repo.findAll();
    }

    /**
     * Create a new balance with the given amount and associated account id
     * 
     * @param {number} amount 
     * @param {number} accountId 
     * @returns the id of the created balance
     */
    create (amount: number, accountId: number): number{
        return this.repo.create(amount, accountId);
    }

    // delete

    // update
}