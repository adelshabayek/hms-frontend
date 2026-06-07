import { SkeletonBlock } from "@/components/ui/Skeleton";

export default function AppointmentsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <SkeletonBlock className="h-7 w-44" />
          <SkeletonBlock className="h-4 w-72" />
        </div>
        <SkeletonBlock className="h-10 w-40" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-20 rounded-2xl" />
        ))}
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <SkeletonBlock className="h-10 w-full" />
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonBlock key={i} className="h-8 w-20" />
          ))}
        </div>
      </div>

      {/* Appointment cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <SkeletonBlock className="w-10 h-10 rounded-full flex-shrink-0" />
                <div className="space-y-2">
                  <SkeletonBlock className="h-4 w-32" />
                  <SkeletonBlock className="h-3 w-16" />
                </div>
              </div>
              <div className="space-y-1">
                <SkeletonBlock className="h-6 w-20" />
                <SkeletonBlock className="h-5 w-16" />
              </div>
            </div>
            <SkeletonBlock className="h-4 w-full" />
            <div className="flex gap-4">
              <SkeletonBlock className="h-4 w-24" />
              <SkeletonBlock className="h-4 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
