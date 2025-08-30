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
 * GET /api/banks/[id]
 * 
 * Deletes a bank.
 * 
 * @returns {NextResponse} 
 *      200 OK with boolean about success of deletion
 *      500 on server error
 */
export async function DELETE(req: Request, context: { params : Promise<{ id: string }> }) {
    const { id } = await context.params; 

    try{
        const bankId = parseInt(id, 10);

        if (isNaN(bankId)) {
            return NextResponse.json({ error: "Invalid bank ID to delete" }, { status: 400 });
        }

        const result = bankService.delete(bankId);
        return NextResponse.json({ success: result });
    } catch(err){
        return NextResponse.json({error: "Internal server error: failed to delete bank. ", err}, {status: 500});
    }
}