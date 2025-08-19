import { NextResponse } from "next/server";
import ServiceContainer from "@/services/serviceContainer";

/**
 * Api route handler for `/api/banks/with-accounts`.
 * 
 * Handles HTTP requests related to banks and their related accounts.
 * 
 */

// Service layer instance
const bankService = ServiceContainer.bankService;

/**
 * GET /api/banks/with-accounts
 * 
 * Returns a list of all banks in the system, including the accounts that are related to them.
 * 
 * @returns {Promise<NextResponse>} 
 *      200 OK with array of bank objects
 *      500 on server error
 */
export async function GET(): Promise<NextResponse>{
    try{
        const all = bankService.findAllIncludingAccounts();
        return NextResponse.json(all);
    } catch(err){
        return NextResponse.json({error: "Internal server error: failed to retrieve banks including accounts."}, {status: 500});
    }
}
