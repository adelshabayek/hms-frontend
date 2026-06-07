"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Stethoscope,
  Building2,
  Settings,
  ChevronLeft,
  ChevronRight,
  Activity,
  LogOut,
} from "lucide-react";

import { signOut } from "next-auth/react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/patients", label: "Patients", icon: Users },
  { href: "/appointments", label: "Appointments", icon: Calendar },
  { href: "/doctors", label: "Doctors", icon: Stethoscope },
  { href: "/departments", label: "Departments", icon: Building2 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ user }: { user?: any }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`relative flex flex-col h-screen bg-card border-r border-border transition-all duration-300 ease-in-out z-20 ${
        collapsed ? "w-[72px]" : "w-[260px]"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-border min-h-[64px]">
        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-primary flex items-center justify-center animate-pulse-ring">
          <Activity className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <p className="text-sm font-bold text-foreground leading-tight">HMS Portal</p>
            <p className="text-[10px] text-muted-foreground">Smart Hospital System</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Icon className={`flex-shrink-0 w-5 h-5 transition-transform duration-200 ${!active && "group-hover:scale-110"}`} />
              {!collapsed && (
                <span className="animate-fade-in truncate">{label}</span>
              )}
              {active && !collapsed && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-foreground opacity-80" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-border space-y-1">
        <div
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
            {user?.given_name?.[0] || ""}{user?.family_name?.[0] || ""}
          </div>
          {!collapsed && (
            <div className="animate-fade-in min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">{user?.name || "User"}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-accent/10 text-accent font-medium capitalize">
                  {user?.roles?.[0] || "User"}
                </span>
                <p className="text-[10px] text-muted-foreground truncate">{user?.email}</p>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          title={collapsed ? "Log Out" : undefined}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut className="flex-shrink-0 w-4 h-4" />
          {!collapsed && <span className="animate-fade-in">Log Out</span>}
        </button>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-[76px] w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors shadow-sm z-30"
        aria-label="Toggle Sidebar"
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3 text-muted-foreground" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-muted-foreground" />
        )}
      </button>
    </aside>
  );
}
