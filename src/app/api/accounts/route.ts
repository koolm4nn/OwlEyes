import { NextResponse } from "next/server";
import { AccountService } from "@/services/accountService";
import { AccountRepository } from "@/repositories/accountRepository";

/**
 * Api route handler for `/api/accounts`.
 * 
 * Handles HTTP requests related to accounts. 
 * 
 * Uses AccountService and AccountsRepository for business logic/data access.
 * 
 */

// Instantiate service layer with corresponding repository
const accountService = new AccountService(new AccountRepository());

/**
 * GET /api/accounts
 * 
 * @returns {Promise<NextResponse>} 
 *      200 OK with array of accounts
 *      500 on server error
 */
export async function GET(): Promise<NextResponse>{
    try{
        const all = accountService.findAll();
        return NextResponse.json(all);
    } catch(err){
        return NextResponse.json({error: "Internal Server Error: Failed to retrieve accounts"}, {status: 500});
    }
}