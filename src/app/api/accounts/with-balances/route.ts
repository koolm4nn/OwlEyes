import { NextResponse } from "next/server";
import ServiceContainer from "@/services/serviceContainer"; // adjust path

export async function GET() {
  const summary = ServiceContainer.accountService.findAllWithBalances();
  return NextResponse.json(summary);
}