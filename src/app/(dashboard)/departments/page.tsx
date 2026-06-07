"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchDepartments } from "@/lib/api";
import { Users, BedDouble, UserCheck } from "lucide-react";
import { SkeletonBlock } from "@/components/ui/Skeleton";

interface Department {
  id: string;
  name: string;
  head: string;
  totalStaff: number;
  totalPatients: number;
  beds: number;
  bedsAvailable: number;
  icon: string;
  color: string;
}

export default function DepartmentsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
  });

  const departments: Department[] = data?.departments ?? [];

  const totalStaff = departments.reduce((s, d) => s + (d.totalStaff ?? 0), 0);
  const totalBeds = departments.reduce((s, d) => s + (d.beds ?? 0), 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Departments</h2>
        <p className="text-muted-foreground text-sm mt-0.5">Overview of all hospital departments</p>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonBlock key={i} className="h-20 rounded-2xl" />)
          : [
              { label: "Total Departments", value: departments.length, color: "text-primary", bg: "bg-primary/10" },
              { label: "Total Staff", value: totalStaff, color: "text-accent", bg: "bg-accent/10" },
              { label: "Total Beds", value: totalBeds, color: "text-purple-500", bg: "bg-purple-500/10" },
            ].map(({ label, value, color, bg }) => (
              <div key={label} className={`${bg} rounded-2xl p-4 border border-border`}>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
              </div>
            ))}
      </div>

      {/* Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <SkeletonBlock className="w-14 h-14 rounded-2xl" />
                  <div className="space-y-2">
                    <SkeletonBlock className="h-5 w-32" />
                    <SkeletonBlock className="h-3 w-24" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {Array.from({ length: 3 }).map((_, j) => <SkeletonBlock key={j} className="h-16 rounded-xl" />)}
                </div>
                <SkeletonBlock className="h-8 rounded-full" />
              </div>
            ))
          : departments.length === 0
          ? (
            <div className="col-span-3 text-center py-16 text-muted-foreground text-sm">
              No departments found. Seed the database to populate this page.
            </div>
          )
          : departments.map((dept, i) => {
              const bedUsage = dept.beds > 0 ? ((dept.beds - dept.bedsAvailable) / dept.beds) * 100 : 0;
              return (
                <div
                  key={dept.id}
                  className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all animate-fade-in"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  {/* Icon & Name */}
                  <div className="flex items-center gap-4 mb-5">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                      style={{ background: `${dept.color}20` }}
                    >
                      {dept.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground">{dept.name}</h3>
                      <p className="text-xs text-muted-foreground">{dept.head}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      { icon: Users, label: "Staff", value: dept.totalStaff },
                      { icon: UserCheck, label: "Patients", value: dept.totalPatients },
                      { icon: BedDouble, label: "Available", value: dept.bedsAvailable },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="text-center p-2 bg-secondary/40 rounded-xl">
                        <Icon className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                        <p className="text-lg font-bold text-foreground">{value}</p>
                        <p className="text-[10px] text-muted-foreground">{label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Bed Usage Bar */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-muted-foreground">Bed Occupancy</span>
                      <span className="font-semibold text-foreground">{Math.round(bedUsage)}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${bedUsage}%`, background: dept.color }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                      <span>{dept.beds - dept.bedsAvailable} occupied</span>
                      <span>{dept.bedsAvailable} free of {dept.beds}</span>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}
