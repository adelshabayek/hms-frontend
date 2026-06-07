"use client";

import { useState, useMemo } from "react";
import { Search, Filter, Plus, Eye, Phone, Mail, MapPin, Calendar, User, Heart, Bed } from "lucide-react";
import { mockPatients, Patient } from "@/lib/mock-data";
import Badge, { statusBadge } from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";

const BLOOD_COLORS: Record<string, string> = {
  "O+": "bg-red-500/15 text-red-500",
  "O-": "bg-red-700/15 text-red-700",
  "A+": "bg-blue-500/15 text-blue-500",
  "A-": "bg-blue-700/15 text-blue-700",
  "B+": "bg-purple-500/15 text-purple-500",
  "B-": "bg-purple-700/15 text-purple-700",
  "AB+": "bg-accent/15 text-accent",
  "AB-": "bg-green-700/15 text-green-700",
};

export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selected, setSelected] = useState<Patient | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const statuses = ["All", "Active", "Critical", "Scheduled", "Discharged"];

  const filtered = useMemo(() => {
    return mockPatients.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.condition.toLowerCase().includes(search.toLowerCase()) ||
        p.id.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "All" || p.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  const stats = {
    total: mockPatients.length,
    active: mockPatients.filter((p) => p.status === "Active").length,
    critical: mockPatients.filter((p) => p.status === "Critical").length,
    discharged: mockPatients.filter((p) => p.status === "Discharged").length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Patient Management</h2>
          <p className="text-muted-foreground text-sm mt-0.5">Track and manage all patient records</p>
        </div>
        <button
          id="add-patient-btn"
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Add Patient
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Patients", value: stats.total, color: "text-primary", bg: "bg-primary/10" },
          { label: "Active", value: stats.active, color: "text-accent", bg: "bg-accent/10" },
          { label: "Critical", value: stats.critical, color: "text-destructive", bg: "bg-destructive/10" },
          { label: "Discharged", value: stats.discharged, color: "text-muted-foreground", bg: "bg-secondary" },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className={`${bg} rounded-2xl p-4 border border-border`}>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            id="patient-search"
            type="text"
            placeholder="Search patients by name, condition, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {statuses.map((s) => (
            <button
              key={s}
              id={`filter-${s.toLowerCase()}`}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                statusFilter === s
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/40">
                <th className="text-left text-xs font-semibold text-muted-foreground px-6 py-3">Patient</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">ID</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Blood</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Condition</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Doctor</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Room</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-16 text-muted-foreground text-sm">
                    No patients match your search.
                  </td>
                </tr>
              ) : (
                filtered.map((patient, i) => (
                  <tr
                    key={patient.id}
                    className="border-b border-border/50 hover:bg-secondary/40 transition-colors animate-fade-in"
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                          {patient.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{patient.name}</p>
                          <p className="text-xs text-muted-foreground">{patient.age} yr · {patient.gender}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs font-mono text-muted-foreground">{patient.id}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-0.5 rounded-lg text-xs font-bold ${BLOOD_COLORS[patient.bloodType] ?? "bg-secondary text-muted-foreground"}`}>
                        {patient.bloodType}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-foreground">{patient.condition}</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">{patient.doctor}</td>
                    <td className="px-4 py-4 text-sm font-mono text-muted-foreground">{patient.room}</td>
                    <td className="px-4 py-4">
                      <Badge variant={statusBadge(patient.status)} dot>{patient.status}</Badge>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        id={`view-patient-${patient.id}`}
                        onClick={() => setSelected(patient)}
                        className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-border bg-secondary/20 text-xs text-muted-foreground">
          Showing {filtered.length} of {mockPatients.length} patients
        </div>
      </div>

      {/* Patient Detail Modal */}
      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title="Patient Details"
        size="lg"
      >
        {selected && (
          <div className="space-y-5">
            {/* Profile */}
            <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl">
              <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center text-xl font-bold text-primary">
                {selected.avatar}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground">{selected.name}</h3>
                <p className="text-sm text-muted-foreground">{selected.id} · {selected.age} years · {selected.gender}</p>
                <div className="mt-1">
                  <Badge variant={statusBadge(selected.status)} dot>{selected.status}</Badge>
                </div>
              </div>
              <span className={`px-3 py-1.5 rounded-xl text-sm font-bold ${BLOOD_COLORS[selected.bloodType] ?? ""}`}>
                {selected.bloodType}
              </span>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Heart, label: "Condition", value: selected.condition },
                { icon: User, label: "Doctor", value: selected.doctor },
                { icon: Bed, label: "Room", value: selected.room },
                { icon: Calendar, label: "Admitted", value: selected.admittedDate },
                { icon: Phone, label: "Phone", value: selected.phone },
                { icon: Mail, label: "Email", value: selected.email },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3 p-3 bg-secondary/30 rounded-xl">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-sm font-medium text-foreground truncate">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Address */}
            <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-xl">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Address</p>
                <p className="text-sm font-medium text-foreground">{selected.address}</p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-all">
                Edit Record
              </button>
              <button
                onClick={() => setSelected(null)}
                className="flex-1 py-2.5 bg-secondary text-foreground rounded-xl text-sm font-medium hover:bg-secondary/80 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Patient Modal */}
      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add New Patient" size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {["Full Name", "Age", "Phone", "Email", "Blood Type", "Room"].map((field) => (
              <div key={field} className={field === "Full Name" || field === "Email" ? "col-span-2" : ""}>
                <label className="block text-xs font-medium text-muted-foreground mb-1">{field}</label>
                <input
                  id={`new-patient-${field.toLowerCase().replace(" ", "-")}`}
                  type="text"
                  placeholder={`Enter ${field.toLowerCase()}`}
                  className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Condition</label>
            <textarea
              id="new-patient-condition"
              rows={2}
              placeholder="Describe the patient's condition..."
              className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
            />
          </div>
          <div className="flex gap-3 pt-1">
            <button className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-all">
              Save Patient
            </button>
            <button onClick={() => setShowAdd(false)} className="flex-1 py-2.5 bg-secondary text-foreground rounded-xl text-sm font-medium hover:bg-secondary/80 transition-all">
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
