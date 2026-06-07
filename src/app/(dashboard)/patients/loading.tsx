import { SkeletonBlock } from "@/components/ui/Skeleton";

export default function PatientsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <SkeletonBlock className="h-7 w-52" />
          <SkeletonBlock className="h-4 w-72" />
        </div>
        <SkeletonBlock className="h-10 w-32" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-20 rounded-2xl" />
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <SkeletonBlock className="h-10 flex-1" />
        <SkeletonBlock className="h-10 w-20" />
        <SkeletonBlock className="h-10 w-20" />
        <SkeletonBlock className="h-10 w-20" />
      </div>

      {/* Table rows */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <SkeletonBlock className="h-12 rounded-none rounded-t-2xl" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-6 py-4 border-t border-border/50">
            <SkeletonBlock className="w-9 h-9 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <SkeletonBlock className="h-4 w-40" />
              <SkeletonBlock className="h-3 w-24" />
            </div>
            <SkeletonBlock className="h-6 w-16" />
            <SkeletonBlock className="h-6 w-24" />
            <SkeletonBlock className="h-6 w-28" />
            <SkeletonBlock className="h-6 w-12" />
            <SkeletonBlock className="h-6 w-16" />
            <SkeletonBlock className="h-8 w-8 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
