import { NextRequest, NextResponse } from "next/server";
import { dashboardStats, mockAppointments, mockPatients, weeklyAdmissions } from "@/lib/mock-data";

export async function GET(_req: NextRequest) {
  const critical = mockPatients.filter((p) => p.status === "Critical").length;
  const pendingAppointments = mockAppointments.filter((a) => a.status === "Pending").length;
  const completedToday = mockAppointments.filter((a) => a.status === "Completed").length;
  const surgeries = mockAppointments.filter((a) => a.type === "Surgery" && a.status === "Confirmed").length;

  return NextResponse.json({
    stats: dashboardStats,
    todayAtAGlance: {
      pendingAppointments,
      completedToday,
      criticalPatients: critical,
      surgeriesScheduled: surgeries,
    },
    recentAppointments: mockAppointments.slice(0, 5),
    recentPatients: mockPatients.slice(0, 5),
    weeklyAdmissions,
  });
}
