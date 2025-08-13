import { BankRepository } from "@/repositories/bankRepository";
import { BaseService } from "./baseService";
import { Bank } from "@/types";

/**
 * Service layer for handling business logic related to balances.
 */
export class BankService extends BaseService<BankRepository>{

    /**
     * Retrieves all banks.
     * 
     * @returns {Bank[]} all banks
     */
    findAll(): Bank[]{
        return this.repo.findAll();
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

    // delete

    // update
}