import { NextRequest, NextResponse } from "next/server";
import ServiceContainer from "@/services/serviceContainer";

/**
 * Api route handler for `/api/accounts/[id]`.
 * 
 * Handles HTTP requests related to a specific account.
 * 
 */

// Service layer instance
const accountService = ServiceContainer.accountService;

/**
 * GET /api/banks/[id]
 * 
 * Deletes an account.
 * 
 * @returns {NextResponse} 
 *      200 OK with boolean about success of deletion
 *      500 on server error
 */
export async function DELETE(req: Request, context: { params : Promise<{ id: string }> }) {
    const { id } = await context.params; 

    try{
        const accountId = parseInt(id, 10);

        if (isNaN(accountId)) {
            return NextResponse.json({ error: "Invalid account id to delete" }, { status: 400 });
        }

        const result = accountService.delete(accountId);
        return NextResponse.json({ success: result });
    } catch(err){
        return NextResponse.json({error: "Internal server error: failed to delete account."}, {status: 500});
    }
}