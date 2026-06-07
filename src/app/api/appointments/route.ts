import { NextRequest, NextResponse } from "next/server";
import { mockAppointments } from "@/lib/mock-data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search")?.toLowerCase() ?? "";
  const status = searchParams.get("status") ?? "All";
  const type = searchParams.get("type") ?? "All";

  let appointments = mockAppointments;

  if (search) {
    appointments = appointments.filter(
      (a) =>
        a.patient.toLowerCase().includes(search) ||
        a.doctor.toLowerCase().includes(search) ||
        a.department.toLowerCase().includes(search)
    );
  }

  if (status !== "All") {
    appointments = appointments.filter((a) => a.status === status);
  }

  if (type !== "All") {
    appointments = appointments.filter((a) => a.type === type);
  }

  return NextResponse.json({ appointments, total: appointments.length });
}
