import { NextRequest, NextResponse } from "next/server";
import { mockDepartments } from "@/lib/mock-data";

export async function GET(_req: NextRequest) {
  return NextResponse.json({ departments: mockDepartments, total: mockDepartments.length });
}
