import { AccountRepository } from "@/repositories/accountRepository";
import { BankRepository } from "@/repositories/bankRepository";
import { BankService } from "./bankService";
import { BalanceRepository } from "@/repositories/balanceRepository";
import { AccountService } from "./accountService";
import { BalanceService } from "./balanceService";

class ServiceContainer {
    private static bankRepo = new BankRepository();
    private static accountRepo = new AccountRepository();
    private static balanceRepo = new BalanceRepository();

    static bankService = new BankService(this.bankRepo, this.accountRepo, this.balanceRepo);
    static accountService = new AccountService(this.accountRepo);
    static balanceService = new BalanceService(this.balanceRepo);
}

export default ServiceContainer;