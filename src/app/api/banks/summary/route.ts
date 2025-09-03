import { NextResponse } from "next/server";
import ServiceContainer from "@/services/serviceContainer"; // adjust path

export async function GET() {
  const summary = ServiceContainer.bankService.findAllSummaries();
  return NextResponse.json(summary);
}