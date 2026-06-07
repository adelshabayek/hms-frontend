import Sidebar from "@/components/ui/Sidebar";
import Topbar from "@/components/ui/Topbar";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": { title: "Dashboard", subtitle: "Welcome back, Admin" },
  "/patients": { title: "Patients", subtitle: "Manage patient records" },
  "/appointments": { title: "Appointments", subtitle: "Schedule & track appointments" },
  "/doctors": { title: "Doctors", subtitle: "Medical staff directory" },
  "/departments": { title: "Departments", subtitle: "Hospital departments overview" },
  "/settings": { title: "Settings", subtitle: "Account & system preferences" },
};

import { auth } from "@/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar user={user} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar title="HMS Portal" subtitle="Smart Hospital Management" user={user} />
        <main className="flex-1 overflow-y-auto scrollbar-thin p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
