type BadgeVariant = "success" | "warning" | "danger" | "info" | "neutral" | "purple";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  dot?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: "bg-accent/10 text-accent border-accent/20",
  warning: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 dark:text-yellow-400",
  danger: "bg-destructive/10 text-destructive border-destructive/20",
  info: "bg-primary/10 text-primary border-primary/20",
  neutral: "bg-muted text-muted-foreground border-border",
  purple: "bg-purple-500/10 text-purple-600 border-purple-500/20 dark:text-purple-400",
};

const dotStyles: Record<BadgeVariant, string> = {
  success: "bg-accent",
  warning: "bg-yellow-500",
  danger: "bg-destructive",
  info: "bg-primary",
  neutral: "bg-muted-foreground",
  purple: "bg-purple-500",
};

export default function Badge({
  children,
  variant = "neutral",
  dot = false,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded-full border ${variantStyles[variant]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[variant]}`} />}
      {children}
    </span>
  );
}

// Helper to auto-select variant by status string
export function statusBadge(status: string) {
  const map: Record<string, BadgeVariant> = {
    Active: "success",
    Available: "success",
    Confirmed: "success",
    Completed: "success",
    Discharged: "neutral",
    "Off Duty": "neutral",
    Cancelled: "danger",
    Critical: "danger",
    Pending: "warning",
    Busy: "warning",
    Scheduled: "info",
    Surgery: "purple",
    Emergency: "danger",
    "Follow-up": "info",
    Consultation: "neutral",
    "Check-up": "success",
  };
  return map[status] ?? "neutral";
}
