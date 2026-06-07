import { SkeletonBlock } from "@/components/ui/Skeleton";

export default function DoctorsLoading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <SkeletonBlock className="h-7 w-40" />
        <SkeletonBlock className="h-4 w-72" />
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
        <SkeletonBlock className="h-10 w-24" />
      </div>

      {/* Doctor cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
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
        ))}
      </div>
    </div>
  );
}
