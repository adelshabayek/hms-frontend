import { NextRequest, NextResponse } from "next/server";
import { mockDoctors } from "@/lib/mock-data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search")?.toLowerCase() ?? "";
  const status = searchParams.get("status") ?? "All";

  let doctors = mockDoctors;

  if (search) {
    doctors = doctors.filter(
      (d) =>
        d.name.toLowerCase().includes(search) ||
        d.specialty.toLowerCase().includes(search) ||
        d.department.toLowerCase().includes(search)
    );
  }

  if (status !== "All") {
    doctors = doctors.filter((d) => d.status === status);
  }

  return NextResponse.json({ doctors, total: doctors.length });
}
