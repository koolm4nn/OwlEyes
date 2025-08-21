import { NextResponse } from "next/server";
import { normalizeString } from "@/utils/validator";
import ServiceContainer from "@/services/serviceContainer";

/**
 * Api route handler for `/api/banks/exists`.
 * 
 * Handles HTTP requests related to the existance of bank. 
 * 
 * Uses BankService and BankRepository for business logic/data access.
 * 
 */

// Instantiate service layer with corresponding repository
const bankService = ServiceContainer.bankService;

/**
 * GET /api/banks/exists?name=...
 * 
 * Lookup bank name
 * 
 * @param req Request including a JSON body with a 'name' field
 * @returns {Promise<NextResponse>}
 *      200 OK with result if bank name exists
 *      400 on validation error
 *      500 on server error
 */
export async function GET(req: Request): Promise<NextResponse<{exists?: boolean, error?: string}>>{
    try{
        const { searchParams } = new URL(req.url);
        let name = searchParams.get("name");

        if(!name || typeof name !== "string"){
            console.log("GET exists: bad param");
            return NextResponse.json({ error: "Missing or invalid 'name'" }, {status: 400 });
        }

        name = normalizeString(name);
        console.log("GET exists: normalized: ", name);

        const existing = bankService.existsByName(name);
        console.log("GET exists: ");
        console.log(!!existing);
        return NextResponse.json({ exists: !!existing });
    } catch(err){
        console.error("GET exists bank error: " + err);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}