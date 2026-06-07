import { NextRequest, NextResponse } from "next/server";
import { mockPatients } from "@/lib/mock-data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search")?.toLowerCase() ?? "";
  const status = searchParams.get("status") ?? "All";

  let patients = mockPatients;

  if (search) {
    patients = patients.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.condition.toLowerCase().includes(search) ||
        p.id.toLowerCase().includes(search)
    );
  }

  if (status !== "All") {
    patients = patients.filter((p) => p.status === status);
  }

  return NextResponse.json({ patients, total: patients.length });
}
