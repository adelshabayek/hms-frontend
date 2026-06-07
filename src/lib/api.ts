// API client functions that fetch from our Next.js Route Handlers
// These replace direct mock-data imports across pages

export async function fetchDashboard() {
  const res = await fetch("/api/dashboard", { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch dashboard data");
  return res.json();
}

export async function fetchPatients(params?: { search?: string; status?: string }) {
  const url = new URL("/api/patients", window.location.origin);
  if (params?.search) url.searchParams.set("search", params.search);
  if (params?.status && params.status !== "All") url.searchParams.set("status", params.status);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch patients");
  return res.json();
}

export async function fetchDoctors(params?: { search?: string; status?: string }) {
  const url = new URL("/api/doctors", window.location.origin);
  if (params?.search) url.searchParams.set("search", params.search);
  if (params?.status && params.status !== "All") url.searchParams.set("status", params.status);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch doctors");
  return res.json();
}

export async function fetchAppointments(params?: { search?: string; status?: string; type?: string }) {
  const url = new URL("/api/appointments", window.location.origin);
  if (params?.search) url.searchParams.set("search", params.search);
  if (params?.status && params.status !== "All") url.searchParams.set("status", params.status);
  if (params?.type && params.type !== "All") url.searchParams.set("type", params.type);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch appointments");
  return res.json();
}

export async function fetchDepartments() {
  const res = await fetch("/api/departments");
  if (!res.ok) throw new Error("Failed to fetch departments");
  return res.json();
}
