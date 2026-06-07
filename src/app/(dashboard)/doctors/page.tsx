"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Star, Phone, Mail, Clock, Users, Award } from "lucide-react";
import { fetchDoctors } from "@/lib/api";
import { Doctor } from "@/lib/mock-data";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import { SkeletonBlock } from "@/components/ui/Skeleton";

const doctorStatusBadge = (status: string) => {
  switch (status) {
    case "Available": return "success";
    case "Busy": return "warning";
    case "Off Duty": return "default";
    default: return "default";
  }
};

const SPECIALTY_COLORS: Record<string, { bg: string; text: string }> = {
  "Cardiology": { bg: "bg-red-500/10", text: "text-red-500" },
  "Internal Medicine": { bg: "bg-blue-500/10", text: "text-blue-500" },
  "Orthopedics": { bg: "bg-orange-500/10", text: "text-orange-500" },
  "Surgery": { bg: "bg-green-500/10", text: "text-green-500" },
  "Neurology": { bg: "bg-purple-500/10", text: "text-purple-500" },
  "Pediatrics": { bg: "bg-pink-500/10", text: "text-pink-500" },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3 h-3 ${s <= Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-border"}`}
        />
      ))}
      <span className="text-xs text-muted-foreground ml-1">{rating}</span>
    </div>
  );
}

const statuses = ["All", "Available", "Busy", "Off Duty"];

export default function DoctorsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState<Doctor | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["doctors", search, statusFilter],
    queryFn: () => fetchDoctors({ search, status: statusFilter }),
    placeholderData: (prev) => prev,
  });

  const allDoctorsQuery = useQuery({
    queryKey: ["doctors-all"],
    queryFn: () => fetchDoctors({}),
  });

  const doctors: Doctor[] = data?.doctors ?? [];
  const allDoctors: Doctor[] = allDoctorsQuery.data?.doctors ?? [];

  const stats = {
    total: allDoctors.length,
    available: allDoctors.filter((d) => d.status === "Available").length,
    busy: allDoctors.filter((d) => d.status === "Busy").length,
    offDuty: allDoctors.filter((d) => d.status === "Off Duty").length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Medical Staff</h2>
        <p className="text-muted-foreground text-sm mt-0.5">View and manage the hospital&apos;s medical team</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {allDoctorsQuery.isLoading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonBlock key={i} className="h-20 rounded-2xl" />)
          : [
              { label: "Total Doctors", value: stats.total, color: "text-primary", bg: "bg-primary/10" },
              { label: "Available", value: stats.available, color: "text-accent", bg: "bg-accent/10" },
              { label: "Busy", value: stats.busy, color: "text-yellow-500", bg: "bg-yellow-500/10" },
              { label: "Off Duty", value: stats.offDuty, color: "text-muted-foreground", bg: "bg-secondary" },
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
            id="doctor-search"
            type="text"
            placeholder="Search by name, specialty, or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="flex gap-2">
          {statuses.map((s) => (
            <button
              key={s}
              id={`doctor-status-${s.toLowerCase().replace(" ", "-")}`}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                statusFilter === s
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Error state */}
      {isError && (
        <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-2xl text-sm text-destructive">
          Failed to load doctors. Please try again.
        </div>
      )}

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <div className="flex items-start justify-between">
                <SkeletonBlock className="w-14 h-14 rounded-2xl" />
                <SkeletonBlock className="h-6 w-20" />
              </div>
              <SkeletonBlock className="h-5 w-36" />
              <SkeletonBlock className="h-5 w-24" />
              <div className="flex gap-4">
                <SkeletonBlock className="h-10 flex-1" />
                <SkeletonBlock className="h-10 flex-1" />
                <SkeletonBlock className="h-10 flex-1" />
              </div>
              <SkeletonBlock className="h-4 w-full" />
            </div>
          ))
        ) : doctors.length === 0 ? (
          <div className="col-span-3 text-center py-16 text-muted-foreground text-sm">
            No doctors match your search.
          </div>
        ) : (
          doctors.map((doc, i) => {
            const sc = SPECIALTY_COLORS[doc.specialty] ?? { bg: "bg-secondary", text: "text-muted-foreground" };
            return (
              <div
                key={doc.id}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer group animate-fade-in"
                style={{ animationDelay: `${i * 60}ms` }}
                onClick={() => setSelected(doc)}
              >
                {/* Avatar + Status */}
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-lg font-bold text-foreground">
                      {doc.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-card ${
                      doc.status === "Available" ? "bg-accent" :
                      doc.status === "Busy" ? "bg-yellow-400" : "bg-muted-foreground"
                    }`} />
                  </div>
                  <Badge variant={doctorStatusBadge(doc.status) as any} dot>{doc.status}</Badge>
                </div>

                {/* Name & Specialty */}
                <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">{doc.name}</h3>
                <span className={`inline-block mt-1 mb-3 text-xs px-2 py-0.5 rounded-lg font-medium ${sc.bg} ${sc.text}`}>
                  {doc.specialty}
                </span>

                {/* Stats row */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{doc.experience}</p>
                    <p className="text-[10px] text-muted-foreground">Years Exp.</p>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{doc.patients}</p>
                    <p className="text-[10px] text-muted-foreground">Patients</p>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div>
                    <StarRating rating={doc.rating} />
                    <p className="text-[10px] text-muted-foreground">Rating</p>
                  </div>
                </div>

                {/* Schedule */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-3 border-t border-border">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>{doc.schedule}</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Detail Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title="Doctor Profile" size="lg">
        {selected && (() => {
          const sc = SPECIALTY_COLORS[selected.specialty] ?? { bg: "bg-secondary", text: "text-muted-foreground" };
          return (
            <div className="space-y-5">
              {/* Profile hero */}
              <div className="flex items-center gap-5 p-5 bg-secondary/50 rounded-2xl">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-2xl font-bold text-foreground flex-shrink-0">
                  {selected.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground">{selected.name}</h3>
                  <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-lg font-medium ${sc.bg} ${sc.text}`}>
                    {selected.specialty}
                  </span>
                  <div className="mt-2">
                    <Badge variant={doctorStatusBadge(selected.status) as any} dot>{selected.status}</Badge>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Award, label: "Experience", value: `${selected.experience} yrs` },
                  { icon: Users, label: "Patients", value: selected.patients },
                  { icon: Star, label: "Rating", value: selected.rating },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="text-center p-4 bg-secondary/30 rounded-xl">
                    <Icon className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-xl font-bold text-foreground">{value}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>

              {/* Info */}
              <div className="space-y-2">
                {[
                  { icon: Users, label: "Department", value: selected.department },
                  { icon: Phone, label: "Phone", value: selected.phone },
                  { icon: Mail, label: "Email", value: selected.email },
                  { icon: Clock, label: "Schedule", value: selected.schedule },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl">
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

              <div className="flex gap-3 pt-1">
                <button className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-all">
                  View Schedule
                </button>
                <button onClick={() => setSelected(null)} className="flex-1 py-2.5 bg-secondary text-foreground rounded-xl text-sm font-medium">
                  Close
                </button>
              </div>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}
