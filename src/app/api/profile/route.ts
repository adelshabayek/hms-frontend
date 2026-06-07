import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { adminDb, adminAuth } from "@/lib/firebase-admin";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const uid = session.user.id;
    const userDoc = await adminDb.collection("users").doc(uid).get();

    if (userDoc.exists) {
      return NextResponse.json({ profile: userDoc.data() });
    }

    return NextResponse.json({ profile: null });
  } catch (error) {
    console.error("GET /api/profile error:", error);
    return NextResponse.json({ error: "Failed to get profile" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const uid = session.user.id;
    const data = await req.json();

    // 1. Update Firestore Profile via Admin SDK (bypasses rules)
    await adminDb.collection("users").doc(uid).set(data, { merge: true });

    // 2. Update Firebase Authentication user (for Firebase Console)
    if (data.firstName || data.lastName) {
      const displayName = `${data.firstName || ""} ${data.lastName || ""}`.trim();
      await adminAuth.updateUser(uid, { displayName });
    }

    return NextResponse.json({ success: true, profile: data });
  } catch (error) {
    console.error("PUT /api/profile error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
