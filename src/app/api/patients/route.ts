import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get("search");
    const status = searchParams.get("status");

    let ref: any = collection(db, "patients");
    if (status && status !== "All") {
      ref = query(ref, where("status", "==", status));
    }

    const snapshot = await getDocs(ref);
    let patients = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    if (search) {
      const q = search.toLowerCase();
      patients = patients.filter((p: any) =>
        p.name?.toLowerCase().includes(q) ||
        p.condition?.toLowerCase().includes(q) ||
        p.id?.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({ patients, total: patients.length });
  } catch (error) {
    console.error("Error fetching patients:", error);
    return NextResponse.json({ patients: [], total: 0 });
  }
}
