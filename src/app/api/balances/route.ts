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

/**
 * POST /api/balances
 * 
 * Creates a new balance.
 * 
 * @param req Request including a JSON body with a 'amount' and 'accountId' field
 * @returns {Promise<NextResponse>}
 *      200 OK with the ID of the created balance
 *      400 on validation error
 *      500 on server error
 */
export async function POST(req: Request): Promise<NextResponse<{insertedId?: number, error?: string}>>{
    try{
        const body = await req.json();
        const { amount: amount } = body;
        const { accountId: accountId } = body;
        const { timestamp: timestamp} = body;

        if(!amount || typeof amount !== "number"){
            return NextResponse.json({
                error: "Invalid or missing 'amount' field: " + amount
            }, {status: 400});
        }

        if(!accountId || typeof accountId !== "number"){
            return NextResponse.json({
                error: "Invalid or missing id of account field: " + accountId
            }, {status: 400});
        }

        const result = balanceService.create(amount, accountId, timestamp);
        return NextResponse.json({ insertedId: result})
    } catch(err){
        console.error("POST balance error: " + err);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}