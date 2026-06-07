"use client";

import { useQuery } from "@tanstack/react-query";
import { Users, Stethoscope, Calendar, BedDouble, Clock, CheckCircle2, AlertTriangle, Activity } from "lucide-react";
import StatCard from "@/components/ui/StatCard";
import Badge, { statusBadge } from "@/components/ui/Badge";
import { fetchDashboard } from "@/lib/api";
import { SkeletonBlock } from "@/components/ui/Skeleton";

export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,
    refetchInterval: 60_000, // auto-refresh every 60s
  });

  const stats = data?.stats;
  const glance = data?.todayAtAGlance;
  const todayAppointments = data?.recentAppointments ?? [];
  const recentPatients = data?.recentPatients ?? [];
  const weeklyAdmissions = data?.weeklyAdmissions ?? [];
  const maxAdmissions = weeklyAdmissions.length
    ? Math.max(...weeklyAdmissions.map((d: any) => d.admissions))
    : 1;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Good morning, Admin 👋</h2>
        <p className="text-muted-foreground text-sm mt-0.5">
          Here&apos;s what&apos;s happening at your hospital today.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {isLoading || !stats ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonBlock key={i} className="h-28 rounded-2xl" />)
        ) : (
          <>
            <StatCard title="Total Patients" value={stats.totalPatients} trend={stats.patientsTrend} icon={Users} iconColor="text-primary" iconBg="bg-primary/10" delay={0} />
            <StatCard title="Total Doctors" value={stats.totalDoctors} trend={stats.doctorsTrend} icon={Stethoscope} iconColor="text-accent" iconBg="bg-accent/10" delay={60} />
            <StatCard title="Appointments" value={stats.totalAppointments} trend={stats.appointmentsTrend} icon={Calendar} iconColor="text-purple-600" iconBg="bg-purple-500/10" delay={120} />
            <StatCard title="Available Beds" value={stats.availableBeds} trend={stats.bedsTrend} icon={BedDouble} iconColor="text-orange-600" iconBg="bg-orange-500/10" delay={180} />
          </>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Weekly Admissions Chart */}
        <div className="xl:col-span-2 bg-card border border-border rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "240ms" }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-foreground">Weekly Admissions</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Admissions vs Discharges</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />
                Admissions
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-accent inline-block" />
                Discharges
              </span>
            </div>
          </div>
          {isLoading ? (
            <SkeletonBlock className="h-40 rounded-xl" />
          ) : (
            <div className="flex items-end gap-3 h-40">
              {weeklyAdmissions.map((day: any, i: number) => (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-1.5 animate-fade-in" style={{ animationDelay: `${300 + i * 50}ms` }}>
                  <div className="w-full flex items-end gap-0.5 h-32">
                    <div
                      className="flex-1 bg-primary/80 hover:bg-primary rounded-t-md transition-all duration-300 hover:scale-105 origin-bottom"
                      style={{ height: `${(day.admissions / maxAdmissions) * 100}%` }}
                      title={`Admissions: ${day.admissions}`}
                    />
                    <div
                      className="flex-1 bg-accent/70 hover:bg-accent rounded-t-md transition-all duration-300 hover:scale-105 origin-bottom"
                      style={{ height: `${(day.discharges / maxAdmissions) * 100}%` }}
                      title={`Discharges: ${day.discharges}`}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground">{day.day}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats Sidebar */}
        <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
          <h3 className="text-base font-semibold text-foreground">Today at a Glance</h3>
          {isLoading || !glance ? (
            Array.from({ length: 4 }).map((_, i) => <SkeletonBlock key={i} className="h-14 rounded-xl" />)
          ) : (
            [
              { icon: Clock, label: "Pending Appointments", value: glance.pendingAppointments, color: "text-yellow-500", bg: "bg-yellow-500/10" },
              { icon: CheckCircle2, label: "Completed Today", value: glance.completedToday, color: "text-accent", bg: "bg-accent/10" },
              { icon: AlertTriangle, label: "Critical Patients", value: glance.criticalPatients, color: "text-destructive", bg: "bg-destructive/10" },
              { icon: Activity, label: "Surgeries Scheduled", value: glance.surgeriesScheduled, color: "text-purple-600", bg: "bg-purple-500/10" },
            ].map(({ icon: Icon, label, value, color, bg }, i) => (
              <div
                key={label}
                className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors animate-fade-in"
                style={{ animationDelay: `${360 + i * 60}ms` }}
              >
                <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground truncate">{label}</p>
                  <p className="text-xl font-bold text-foreground">{value}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Today's Appointments */}
        <div className="bg-card border border-border rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "420ms" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-foreground">Today&apos;s Appointments</h3>
            <a href="/appointments" className="text-xs text-primary hover:underline">View all</a>
          </div>
          <div className="space-y-3">
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-3">
                    <SkeletonBlock className="w-9 h-9 rounded-full flex-shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <SkeletonBlock className="h-4 w-32" />
                      <SkeletonBlock className="h-3 w-24" />
                    </div>
                    <SkeletonBlock className="h-6 w-20" />
                  </div>
                ))
              : todayAppointments.map((appt: any, i: number) => (
                  <div key={appt.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/60 transition-colors animate-slide-in" style={{ animationDelay: `${480 + i * 50}ms` }}>
                    <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                      {appt.patientAvatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{appt.patient}</p>
                      <p className="text-xs text-muted-foreground truncate">{appt.doctor} · {appt.time}</p>
                    </div>
                    <Badge variant={statusBadge(appt.status)} dot>{appt.status}</Badge>
                  </div>
                ))}
          </div>
        </div>

        {/* Recent Patients */}
        <div className="bg-card border border-border rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "480ms" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-foreground">Recent Patients</h3>
            <a href="/patients" className="text-xs text-primary hover:underline">View all</a>
          </div>
          <div className="space-y-3">
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-3">
                    <SkeletonBlock className="w-9 h-9 rounded-full flex-shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <SkeletonBlock className="h-4 w-32" />
                      <SkeletonBlock className="h-3 w-24" />
                    </div>
                    <SkeletonBlock className="h-6 w-16" />
                  </div>
                ))
              : recentPatients.map((patient: any, i: number) => (
                  <div key={patient.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/60 transition-colors animate-slide-in" style={{ animationDelay: `${540 + i * 50}ms` }}>
                    <div className="w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center text-xs font-bold text-accent flex-shrink-0">
                      {patient.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{patient.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{patient.condition} · {patient.room}</p>
                    </div>
                    <Badge variant={statusBadge(patient.status)} dot>{patient.status}</Badge>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
