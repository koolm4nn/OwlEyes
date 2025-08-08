/**
 * Represents a bank entity.
 * 
 * @property id - Unique identifier for the bank.
 * @property name - Display name of the bank.
 */
export interface Bank {
    id: number,
    name: string
}

/**
 * Represents an account entity associated with a bank.
 * 
 * @property id - Unique identifier for the account.
 * @property name - Display name of the account.
 * @property bankId - Foreign key linking the account to a bank.
 */
export interface Account {
    id: number,
    name: string,
    bankId: number
}

/**
 * Represents a balance entry for an account.
 * 
 * @property id - Unique identifier for the balance record.
 * @property amount - The monetary amount of the balance.
 * @property accountId - Foreign key linking the balance to an account.
 */
export interface Balance {
    id: number,
    amount: number,
    accountId: number
}