import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function GET(_req: NextRequest) {
  try {
    const [patientsSnap, appointmentsSnap, doctorsSnap] = await Promise.all([
      getDocs(collection(db, "patients")),
      getDocs(collection(db, "appointments")),
      getDocs(collection(db, "doctors"))
    ]);

    const patients = patientsSnap.docs.map(d => ({ id: d.id, ...d.data() })) as any[];
    const appointments = appointmentsSnap.docs.map(d => ({ id: d.id, ...d.data() })) as any[];

    const critical = patients.filter((p) => p.status === "Critical").length;
    const pendingAppointments = appointments.filter((a) => a.status === "Pending").length;
    const completedToday = appointments.filter((a) => a.status === "Completed").length;
    const surgeries = appointments.filter((a) => a.type === "Surgery" && a.status === "Confirmed").length;

    const dashboardStats = {
      totalPatients: patients.length,
      totalDoctors: doctorsSnap.size,
      totalAppointments: appointments.length,
      availableBeds: 45,
      patientsTrend: +12.5,
      doctorsTrend: +3.2,
      appointmentsTrend: +8.1,
      bedsTrend: -5.4,
    };

    const weeklyAdmissions = [
      { day: "Mon", admissions: 18, discharges: 14 },
      { day: "Tue", admissions: 22, discharges: 19 },
      { day: "Wed", admissions: 15, discharges: 17 },
      { day: "Thu", admissions: 28, discharges: 22 },
      { day: "Fri", admissions: 24, discharges: 20 },
      { day: "Sat", admissions: 12, discharges: 15 },
      { day: "Sun", admissions: 9, discharges: 11 },
    ];

    return NextResponse.json({
      stats: dashboardStats,
      todayAtAGlance: {
        pendingAppointments,
        completedToday,
        criticalPatients: critical,
        surgeriesScheduled: surgeries,
      },
      recentAppointments: appointments.slice(0, 5),
      recentPatients: patients.slice(0, 5),
      weeklyAdmissions,
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json({
      stats: {}, todayAtAGlance: {}, recentAppointments: [], recentPatients: [], weeklyAdmissions: []
    });
  }
}
