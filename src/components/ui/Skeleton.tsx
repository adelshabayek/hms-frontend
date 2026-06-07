// Shared skeleton pulse animation component
export function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-skeleton rounded-xl bg-secondary ${className}`} />
  );
}
