import { BalanceRepository } from "@/repositories/balanceRepository";
import { BaseService } from "./baseService";
import { BalanceWithMetaData } from "@/types";

/**
 * Service layer for handling business logic related to balances.
 */
export class BalanceService extends BaseService<BalanceRepository>{

    /**
     * Retrieves all balances from the repository.
     * 
     * @returns {BalanceWithMetaData[]} An array of balance objects.
     */
    findAll(): BalanceWithMetaData[]{
        return this.repo.findAll();
    }

    /**
     * Create a new balance with the given amount and associated account id
     * 
     * @param {number} amount 
     * @param {number} accountId 
     * @param {number} timestamp 
     * @returns the id of the created balance
     */
    create (amount: number, accountId: number, timestamp?: number): number{
        if(timestamp){
            return this.repo.create(amount, accountId, timestamp);
        } else {
            return this.repo.create(amount, accountId);
        }
    }

    // delete

    // update
}