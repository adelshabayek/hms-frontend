"use client";

import { useState, useMemo } from "react";
import { Search, Plus, Calendar, Clock, User, Stethoscope, FileText, ChevronDown } from "lucide-react";
import { mockAppointments, Appointment } from "@/lib/mock-data";
import Badge, { statusBadge } from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";

const TYPE_COLORS: Record<string, string> = {
  "Consultation": "bg-blue-500/10 text-blue-500",
  "Follow-up": "bg-purple-500/10 text-purple-500",
  "Emergency": "bg-destructive/10 text-destructive",
  "Surgery": "bg-orange-500/10 text-orange-500",
  "Check-up": "bg-accent/10 text-accent",
};

export default function AppointmentsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selected, setSelected] = useState<Appointment | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const statuses = ["All", "Confirmed", "Pending", "Completed", "Cancelled"];
  const types = ["All", "Consultation", "Follow-up", "Emergency", "Surgery", "Check-up"];

  const filtered = useMemo(() => {
    return mockAppointments.filter((a) => {
      const matchSearch =
        a.patient.toLowerCase().includes(search.toLowerCase()) ||
        a.doctor.toLowerCase().includes(search.toLowerCase()) ||
        a.department.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "All" || a.status === statusFilter;
      const matchType = typeFilter === "All" || a.type === typeFilter;
      return matchSearch && matchStatus && matchType;
    });
  }, [search, statusFilter, typeFilter]);

  const stats = {
    total: mockAppointments.length,
    confirmed: mockAppointments.filter((a) => a.status === "Confirmed").length,
    pending: mockAppointments.filter((a) => a.status === "Pending").length,
    cancelled: mockAppointments.filter((a) => a.status === "Cancelled").length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Appointments</h2>
          <p className="text-muted-foreground text-sm mt-0.5">Schedule and manage patient appointments</p>
        </div>
        <button
          id="add-appointment-btn"
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          New Appointment
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total", value: stats.total, color: "text-primary", bg: "bg-primary/10" },
          { label: "Confirmed", value: stats.confirmed, color: "text-accent", bg: "bg-accent/10" },
          { label: "Pending", value: stats.pending, color: "text-yellow-500", bg: "bg-yellow-500/10" },
          { label: "Cancelled", value: stats.cancelled, color: "text-destructive", bg: "bg-destructive/10" },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className={`${bg} rounded-2xl p-4 border border-border`}>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              id="appt-search"
              type="text"
              placeholder="Search by patient, doctor, or department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground font-medium">Status:</span>
          {statuses.map((s) => (
            <button
              key={s}
              id={`appt-status-${s.toLowerCase()}`}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                statusFilter === s
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
          <span className="text-xs text-muted-foreground font-medium ml-2">Type:</span>
          {types.map((t) => (
            <button
              key={t}
              id={`appt-type-${t.toLowerCase().replace("-", "")}`}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                typeFilter === t
                  ? "bg-accent text-white shadow-md shadow-accent/20"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Appointments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-2 text-center py-16 text-muted-foreground text-sm">
            No appointments match your search.
          </div>
        ) : (
          filtered.map((appt, i) => (
            <div
              key={appt.id}
              className="bg-card border border-border rounded-2xl p-5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer animate-fade-in"
              style={{ animationDelay: `${i * 50}ms` }}
              onClick={() => setSelected(appt)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">
                    {appt.patientAvatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{appt.patient}</p>
                    <p className="text-xs text-muted-foreground">{appt.id}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge variant={statusBadge(appt.status)} dot>{appt.status}</Badge>
                  <span className={`text-xs px-2 py-0.5 rounded-lg font-medium ${TYPE_COLORS[appt.type] ?? "bg-secondary text-muted-foreground"}`}>
                    {appt.type}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Stethoscope className="w-3.5 h-3.5 text-primary" />
                  <span>{appt.doctor}</span>
                  <span className="text-border">·</span>
                  <span>{appt.department}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-accent" />
                    {appt.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-accent" />
                    {appt.time}
                  </span>
                </div>
                {appt.notes && (
                  <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
                    <FileText className="w-3.5 h-3.5 mt-0.5 text-muted-foreground/60 flex-shrink-0" />
                    <span className="truncate">{appt.notes}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detail Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title="Appointment Details">
        {selected && (
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center text-base font-bold text-primary">
                {selected.patientAvatar}
              </div>
              <div className="flex-1">
                <p className="font-bold text-foreground">{selected.patient}</p>
                <p className="text-xs text-muted-foreground">{selected.id}</p>
              </div>
              <Badge variant={statusBadge(selected.status)} dot>{selected.status}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Stethoscope, label: "Doctor", value: selected.doctor },
                { icon: User, label: "Department", value: selected.department },
                { icon: Calendar, label: "Date", value: selected.date },
                { icon: Clock, label: "Time", value: selected.time },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3 p-3 bg-secondary/30 rounded-xl">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-sm font-medium text-foreground">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-secondary/30 rounded-xl">
              <p className="text-xs text-muted-foreground mb-1">Type</p>
              <span className={`text-sm font-semibold px-2.5 py-1 rounded-lg ${TYPE_COLORS[selected.type] ?? ""}`}>
                {selected.type}
              </span>
            </div>

            {selected.notes && (
              <div className="p-4 bg-secondary/30 rounded-xl">
                <p className="text-xs text-muted-foreground mb-1">Notes</p>
                <p className="text-sm text-foreground">{selected.notes}</p>
              </div>
            )}

            <div className="flex gap-3 pt-1">
              <button className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-all">
                Reschedule
              </button>
              <button onClick={() => setSelected(null)} className="flex-1 py-2.5 bg-secondary text-foreground rounded-xl text-sm font-medium hover:bg-secondary/80 transition-all">
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Appointment Modal */}
      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="New Appointment">
        <div className="space-y-4">
          {["Patient Name", "Doctor", "Department", "Date", "Time"].map((field) => (
            <div key={field}>
              <label className="block text-xs font-medium text-muted-foreground mb-1">{field}</label>
              <input
                id={`new-appt-${field.toLowerCase().replace(" ", "-")}`}
                type={field === "Date" ? "date" : field === "Time" ? "time" : "text"}
                placeholder={field === "Date" || field === "Time" ? undefined : `Enter ${field.toLowerCase()}`}
                className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          ))}
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Type</label>
            <div className="relative">
              <select
                id="new-appt-type"
                className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none transition-all"
              >
                {["Consultation", "Follow-up", "Emergency", "Surgery", "Check-up"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Notes</label>
            <textarea
              id="new-appt-notes"
              rows={2}
              placeholder="Optional notes..."
              className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
            />
          </div>
          <div className="flex gap-3 pt-1">
            <button className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-all">
              Book Appointment
            </button>
            <button onClick={() => setShowAdd(false)} className="flex-1 py-2.5 bg-secondary text-foreground rounded-xl text-sm font-medium">
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
