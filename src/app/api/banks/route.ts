import { NextResponse } from "next/server";
import { BankRepository } from "@/repositories/bankRepository";
import { BankService } from "@/services/bankService";
import { Bank } from "@/types";

/**
 * Api route handler for `/api/banks`.
 * 
 * Handles HTTP requests related to banks. 
 * 
 * Uses BankService and BankRepository for business logic/data access.
 * 
 */

// Instantiate service layer with corresponding repository
const bankService = new BankService(new BankRepository());


/**
 * GET /api/banks
 * 
 * Returns a list of all banks in the system.
 * 
 * @returns {Promise<NextResponse>} 
 *      200 OK with array of bank objects
 *      500 on server error
 */
export async function GET(): Promise<NextResponse>{
    try{
        const all = bankService.findAll();
        return NextResponse.json(all);
    } catch(err){
        return NextResponse.json({error: "Internal server error: failed to retrieve banks."}, {status: 500});
    }
}

/**
 * POST /api/banks
 * 
 * Creates a new bank.
 * 
 * @param req Request including a JSON body with a 'name' field
 * @returns {Promise<NextResponse>}
 *      200 OK with the ID of the created bank
 *      400 on validation error
 *      500 on server error
 */
export async function POST(req: Request): Promise<NextResponse<{insertedId?: number, error?: string}>>{
    try{
        const body = await req.json();
        const { name } = body;

        if(!name || typeof name !== "string"){
            return NextResponse.json({
                error: "Invalid or missing 'name' field: " + name
            }, {status: 400});
        }

        const result = bankService.create(name);

        return NextResponse.json({ insertedId: result})
    } catch(err){
        console.error("POST bank error: " + err);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}