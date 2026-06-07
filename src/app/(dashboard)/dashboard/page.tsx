import {
  Users,
  Stethoscope,
  Calendar,
  BedDouble,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Activity,
} from "lucide-react";
import StatCard from "@/components/ui/StatCard";
import Badge, { statusBadge } from "@/components/ui/Badge";
import {
  dashboardStats,
  mockAppointments,
  mockPatients,
  weeklyAdmissions,
} from "@/lib/mock-data";

export default function DashboardPage() {
  const todayAppointments = mockAppointments.slice(0, 5);
  const recentPatients = mockPatients.slice(0, 5);

  const maxAdmissions = Math.max(...weeklyAdmissions.map((d) => d.admissions));

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
        <StatCard
          title="Total Patients"
          value={dashboardStats.totalPatients}
          trend={dashboardStats.patientsTrend}
          icon={Users}
          iconColor="text-primary"
          iconBg="bg-primary/10"
          delay={0}
        />
        <StatCard
          title="Total Doctors"
          value={dashboardStats.totalDoctors}
          trend={dashboardStats.doctorsTrend}
          icon={Stethoscope}
          iconColor="text-accent"
          iconBg="bg-accent/10"
          delay={60}
        />
        <StatCard
          title="Appointments"
          value={dashboardStats.totalAppointments}
          trend={dashboardStats.appointmentsTrend}
          icon={Calendar}
          iconColor="text-purple-600"
          iconBg="bg-purple-500/10"
          delay={120}
        />
        <StatCard
          title="Available Beds"
          value={dashboardStats.availableBeds}
          trend={dashboardStats.bedsTrend}
          icon={BedDouble}
          iconColor="text-orange-600"
          iconBg="bg-orange-500/10"
          delay={180}
        />
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
          <div className="flex items-end gap-3 h-40">
            {weeklyAdmissions.map((day, i) => (
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
        </div>

        {/* Quick Stats Sidebar */}
        <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
          <h3 className="text-base font-semibold text-foreground">Today at a Glance</h3>
          {[
            { icon: Clock, label: "Pending Appointments", value: 8, color: "text-yellow-500", bg: "bg-yellow-500/10" },
            { icon: CheckCircle2, label: "Completed Today", value: 14, color: "text-accent", bg: "bg-accent/10" },
            { icon: AlertTriangle, label: "Critical Patients", value: 3, color: "text-destructive", bg: "bg-destructive/10" },
            { icon: Activity, label: "Surgeries Scheduled", value: 2, color: "text-purple-600", bg: "bg-purple-500/10" },
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
          ))}
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
            {todayAppointments.map((appt, i) => (
              <div
                key={appt.id}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/60 transition-colors animate-slide-in"
                style={{ animationDelay: `${480 + i * 50}ms` }}
              >
                <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                  {appt.patientAvatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{appt.patient}</p>
                  <p className="text-xs text-muted-foreground truncate">{appt.doctor} · {appt.time}</p>
                </div>
                <Badge variant={statusBadge(appt.status)} dot>
                  {appt.status}
                </Badge>
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
            {recentPatients.map((patient, i) => (
              <div
                key={patient.id}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/60 transition-colors animate-slide-in"
                style={{ animationDelay: `${540 + i * 50}ms` }}
              >
                <div className="w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center text-xs font-bold text-accent flex-shrink-0">
                  {patient.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{patient.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{patient.condition} · {patient.room}</p>
                </div>
                <Badge variant={statusBadge(patient.status)} dot>
                  {patient.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
