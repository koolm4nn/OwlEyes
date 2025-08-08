import { NextResponse } from "next/server";
import { BalanceService } from"@/services/balanceService";
import { BalanceRepository } from "@/repositories/balanceRepository";

/**
 * Api route handler for `/api/balances`.
 * 
 * Handles HTTP requests related to balances. 
 * 
 * Uses BalanceService and BalanceRepository for business logic/data access.
 * 
 */

// Instantiate service layer with corresponding repository
const balanceService = new BalanceService(new BalanceRepository());

/**
 * GET /api/balances
 * 
 * @returns {Promise<NextResponse>} 
 *      200 OK with array of balances
 *      500 on server error
 */
export async function GET(): Promise<NextResponse>{
    try{
        const all = balanceService.findAll();
        return NextResponse.json(all);
    } catch(err){
        return NextResponse.json({error: "Internal Server Error: Failed to retrieve balances"}, {status: 500});
    }
}