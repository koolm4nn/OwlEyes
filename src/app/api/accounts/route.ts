import { NextResponse } from "next/server";
import ServiceContainer from "@/services/serviceContainer";

/**
 * Api route handler for `/api/accounts`.
 * 
 * Handles HTTP requests related to accounts. 
 * 
 * Uses AccountService and AccountsRepository for business logic/data access.
 * 
 */

// Instantiate service layer with corresponding repository
const accountService = ServiceContainer.accountService;
const bankService = ServiceContainer.bankService;

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


/**
 * POST /api/accounts
 * 
 * Creates a new accounts.
 * 
 * @param req Request including a JSON body with a 'name' and 'bankId' field
 * @returns {Promise<NextResponse>}
 *      200 OK with the ID of the created account
 *      400 on validation error
 *      500 on server error
 */
export async function POST(req: Request): Promise<NextResponse<{insertedId?: number, error?: string}>>{
    try{
        const body = await req.json();
        const { name } = body;
        const { bankId } = body;

        if(!name || typeof name !== "string"){
            return NextResponse.json({
                error: "Invalid or missing 'name' field: " + name
            }, {status: 400});
        }

        if(!bankId || typeof bankId !== "number"){
            return NextResponse.json({
                error: "Invalid or missing id of bank field: " + bankId
            }, {status: 400});
        }

        const bankExists = !!bankService.existsById(bankId);
        if (!bankExists) {
            throw new Error(`Bank with id ${bankId} does not exist`);
        }

        const result = accountService.create(name, bankId);

        return NextResponse.json({ insertedId: result})
    } catch(err){
        console.error("POST account error: " + err);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}