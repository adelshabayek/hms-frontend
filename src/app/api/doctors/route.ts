import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get("search");
    const status = searchParams.get("status");

    let ref: any = collection(db, "doctors");
    if (status && status !== "All") {
      ref = query(ref, where("status", "==", status));
    }

    const snapshot = await getDocs(ref);
    let doctors = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    if (search) {
      const q = search.toLowerCase();
      doctors = doctors.filter((d: any) =>
        d.name?.toLowerCase().includes(q) ||
        d.specialty?.toLowerCase().includes(q) ||
        d.department?.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({ doctors, total: doctors.length });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return NextResponse.json({ doctors: [], total: 0 });
  }
}
