import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get("search");
    const status = searchParams.get("status");
    const type = searchParams.get("type");

    let ref: any = collection(db, "appointments");

    // Firestore doesn't support multiple inequality filters on different fields,
    // so we only apply one server-side filter and do the rest client-side.
    if (status && status !== "All") {
      ref = query(ref, where("status", "==", status));
    } else if (type && type !== "All") {
      ref = query(ref, where("type", "==", type));
    }

    const snapshot = await getDocs(ref);
    let appointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Client-side filter for the second dimension (if both are set)
    if (status && status !== "All" && type && type !== "All") {
      appointments = appointments.filter((a: any) => a.type === type);
    }

    if (search) {
      const q = search.toLowerCase();
      appointments = appointments.filter((a: any) =>
        a.patient?.toLowerCase().includes(q) ||
        a.doctor?.toLowerCase().includes(q) ||
        a.department?.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({ appointments, total: appointments.length });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json({ appointments: [], total: 0 });
  }
}
