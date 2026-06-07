import Sidebar from "@/components/ui/Sidebar";
import Topbar from "@/components/ui/Topbar";
import { auth } from "@/auth";
import { ProfileProvider } from "@/components/providers/ProfileProvider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user;

  return (
    <ProfileProvider initialUser={user}>
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-y-auto scrollbar-thin p-6">
            {children}
          </main>
        </div>
      </div>
    </ProfileProvider>
  );
}
