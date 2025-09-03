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
 * Represents a bank entity including Metadata like number of accounts
 * 
 * @property id - Unique identifier for the bank.
 * @property name - Display name of the bank.
 * @property accounts - Array of Accounts that are created under this bank.
 * @property balance - Overall balance of the accounts of the bank.
 * 
 */
export interface BankWithAccounts {
    id: number,
    name: string,
    accounts: Account[],
    balance: number
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
    balance: number,
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
    balance: number,
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
 * Represents a balance entry for an account and the associated bank.
 * 
 * @property id - Unique identifier for the balance record.
 * @property amount - The monetary amount of the balance.
 * @property timestamp - Timestamp of creation as unix timestamp.
 * @property accountId - Foreign key linking the balance to an account.
 * @property accountName - Name of the associated account.
 * @property bankId - Foreign key linking to the bank associated with the linked account.
 * @property bankName - Name of the associated bank.
 */
export interface BalanceWithMetaData {
    id: number,
    amount: number,
    timestamp: number,
    accountId: number,
    accountName: string,
    bankId: number,
    bankName: string
}

export interface AccountSummary {
    id: number,
    name: string,
    balance: number,
    trend: number
}

export interface BankSummary {
    id: number,
    name: string,
    balance: number,
    accounts: AccountSummary[]
}