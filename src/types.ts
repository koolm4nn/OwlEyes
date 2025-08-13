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
 * Represents an account entity and the data of the associated bank
 * 
 * @property id - Unique identifier for the account.
 * @property name - Display name of the account.
 * @property bankId - Foreign key linking the account to a bank.
 * @property bankName - Display name of the associated bank.
 */
export interface AccountWithBank {
    id: number,
    name: string,
    bankId: number,
    bankName: string
}

/**
 * Represents a balance entry for an account.
 * 
 * @property id - Unique identifier for the balance record.
 * @property amount - The monetary amount of the balance.
 * @property timestamp - Timestamp of creation as unix timestamp.
 * @property accountId - Foreign key linking the balance to an account.
 */
export interface Balance {
    id: number,
    amount: number,
    timestamp: number,
    accountId: number
}

/**
 * Represents a balance entry for an account.
 * 
 * @property id - Unique identifier for the balance record.
 * @property amount - The monetary amount of the balance.
 * @property timestamp - Timestamp of creation as unix timestamp.
 * @property accountId - Foreign key linking the balance to an account.
 * @property accountName - Name of the associated account.
 */
export interface BalanceWithAccount {
    id: number,
    amount: number,
    timestamp: number,
    accountId: number,
    accountName: string
}